import Phaser from 'phaser';
import HealthBar from '../hud/healthbar';
import initAnimations from './anims/playerAnims';
import Projectiles from '../attacks/Projectiles';
import MeleeWeapon from '../attacks/MeleeWeapon';

import getTimestamp from '../utils/functions';

import EventEmitter from '../events/Emitter';

import collidable from '../mixins/collidable';
import anims from '../mixins/anims';

export default class Player extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    this.scene = scene;

    // Binds 'this' context to the scene
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Include mixins
    Object.assign(this, collidable);
    Object.assign(this, anims);

    this.init();
    this.initEvents();
  }

  init() { // Initialize all of the player variables/logic
    this.gravity = 500;
    this.playerSpeed = 200;
    this.jumpCount = 0;
    this.hasBeenHit = false;
    this.bounceVelocity = 250;
    this.fireballDamage = localStorage.getItem('levels-completed') >= 3 ? 30 : 20;
    this.swordType = localStorage.getItem('levels-completed') >= this.scene.config.finalLevel ? 'fire' : 'normal';

    this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;

    this.setSize(16, 40);
    this.setOffset(24, 8);
    this.setOrigin(0.5, 1);
    this.setScale(1.1);

    this.cursors = this.scene.input.keyboard.addKeys({
      'a': Phaser.Input.Keyboard.KeyCodes.A,
      'd': Phaser.Input.Keyboard.KeyCodes.D,
      'space': Phaser.Input.Keyboard.KeyCodes.SPACE,
      'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
      'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
      'up': Phaser.Input.Keyboard.KeyCodes.UP,
    });
    // this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);

    this.health = 50 + (50 * localStorage.getItem('levels-completed'));
    this.playerHealth = new HealthBar(
      this.scene,
      this.scene.config.topLeftCorner.x + 8,
      this.scene.config.topLeftCorner.y + 8,
      2,
      this.health
    );

    initAnimations(this.scene.anims);

    this.projectiles = new Projectiles(this.scene, 'fireball1', this.fireballDamage);
    this.meleeWeapon = new MeleeWeapon(this.scene, 0, 0, 'sword-attack');
    this.timeFromLastSwing = null;

    this.completedLevels = localStorage.getItem('levels-completed') || 0;

    this.fireball = this.scene.sound.add('fireball');
    this.slash = this.scene.sound.add('slash');
    this.jump = this.scene.sound.add('jump', { volume: 0.4 });
    this.playerHit = this.scene.sound.add('player-hit');
    this.playerDeath = this.scene.sound.add('player-death');

    this.scene.input.keyboard.on('keydown-X', () => {
      if (this.timeFromLastSwing && this.timeFromLastSwing + this.meleeWeapon.attackSpeed > getTimestamp()) {
        return;
      }

      this.play(`${this.swordType}-sword`, true);
      this.slash.play();
      this.meleeWeapon.swing(this);
      this.timeFromLastSwing = getTimestamp();

      if (this.completedLevels < this.scene.config.finalLevel) { return; } // Restricts sword + fireball to having completed all levels

      this.fireball.play();
        this.projectiles.shootProjectile(this, 'fireball');

    });

    this.scene.input.keyboard.on('keydown-Z', () => {
      if (this.completedLevels < 1) { return; } // Restricts fireball to having completed level 1

      this.play(`${this.swordType}-throw`, true);

      setTimeout(() => {
        this.fireball.play();
        this.projectiles.shootProjectile(this, 'fireball');
      }, 400);
    });

  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update() {
    if (this.hasBeenHit || !this.body) { return; }

    if (this.getBounds().top > this.scene.config.height) {
      EventEmitter.emit('PLAYER_LOSE');
      return;
    }
    const { left, right, up, space, a, d } = this.cursors;

    const onFloor = this.body.onFloor();

    // Checking if jump was just pressed to prevent duplicate
    const isJumpActive = Phaser.Input.Keyboard.JustDown(space) || Phaser.Input.Keyboard.JustDown(up);

    // Regular L/R movement
    if (left.isDown || a.isDown) {
      this.setVelocityX(-this.playerSpeed);
      this.setFlipX(true);
      this.setOrigin(0, 1);
      this.lastDirection = Phaser.Physics.Arcade.FACING_LEFT;
    } else if (right.isDown || d.isDown) {
      this.setVelocityX(this.playerSpeed);
      this.setFlipX(false);
      this.setOrigin(0, 1);
      this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
    } else {
      this.setVelocityX(0);
    }

    // Jumping only when on the floor
    if (isJumpActive && onFloor) {
      this.setVelocityY(-this.playerSpeed * 2);
      this.jump.play();
    }

    if (this.isPlayingAnims('normal-throw') || this.isPlayingAnims('normal-sword') || this.isPlayingAnims('fire-throw') || this.isPlayingAnims('fire-sword')) {
      return;
    }

    // Player animations
    onFloor ?
      this.body.velocity.x !== 0 ?
        this.play(`${this.swordType}-run`, true) : this.play(`${this.swordType}-idle`, true) :
      this.play(`${this.swordType}-jump`, true);
  }

  /**
   * Plays an effect when the player takes damage
   * @returns Phaser tweens animation
   */
  playDamageAnim() {
    return this.scene.tweens.add({
      targets: this,
      duration: 200,
      repeat: -1,
      tint: 0xffffff
    });
  }

  /**
   * Method to handle any interactions caused when a Player collides with an object
   */
  bounceOff() {
    this.body.touching.right ?
      this.setVelocityX(-this.bounceVelocity) :
      this.body.touching.left ?
        this.setVelocityX(this.bounceVelocity) :
        this.setVelocityX(0);

    setTimeout(() => {
      this.setVelocityY(-this.bounceVelocity);
    }, 0);
  }

  /**
   * Method to handle the #takesHit invocation from a source object
   * @param {object} source GameObject instance of the initiator of damage
   */
  takesHit(initiator) {
    if (this.hasBeenHit) { return; }

    this.health -= initiator.damage || initiator.properties.damage || 0;
    if (this.health <= 0) {
      this.playerDeath.play();

        EventEmitter.emit('PLAYER_LOSE');

      return;


    }

    this.hasBeenHit = true;
    this.bounceOff();

    const hitAnim = this.playDamageAnim();
    this.playerHit.play();
    this.playerHealth.setHealth(this.health);

    initiator.deliversHit && initiator.deliversHit(this);

    this.scene.time.delayedCall(500, () => {
      this.hasBeenHit = false;
      hitAnim.stop();
      this.clearTint();
    });
  }

}