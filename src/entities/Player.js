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

    this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;

    this.setSize(20, 30);
    this.setOffset(13, 13);
    this.setOrigin(0.5, 1);

    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);

    this.health = 100;
    this.playerHealth = new HealthBar(
      this.scene,
      this.scene.config.topLeftCorner.x + 8,
      this.scene.config.topLeftCorner.y + 8,
      2,
      this.health
    );

    initAnimations(this.scene.anims);

    this.projectiles = new Projectiles(this.scene, 'fireball1');
    this.meleeWeapon = new MeleeWeapon(this.scene, 0, 0, 'sword-attack');
    this.timeFromLastSwing = null;

    this.maxLevel = localStorage.getItem('levels-unlocked') || 1;

    this.fireball = this.scene.sound.add('fireball');

    this.scene.input.keyboard.on('keydown-SPACE', () => {
      if (this.timeFromLastSwing && this.timeFromLastSwing + this.meleeWeapon.attackSpeed > getTimestamp()) {
        return;
      }

      this.play('sword-attack-anim', true);
      this.meleeWeapon.swing(this);
      this.timeFromLastSwing = getTimestamp();
    });

    this.scene.input.keyboard.on('keydown-X', () => {
      if (this.maxLevel < 2) { return; } // Restricts fireball to having completed level 1

      this.play('throw', true);
      this.fireball.play();
      this.projectiles.shootProjectile(this, 'fireball');
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
    const { left, right, up } = this.cursors;

    const onFloor = this.body.onFloor();

    // Checking if up was just pressed to prevent duplicate
    const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);

    // Regular L/R movement
    if (left.isDown) {
      this.setVelocityX(-this.playerSpeed);
      this.setFlipX(true);
      this.lastDirection = Phaser.Physics.Arcade.FACING_LEFT;
    } else if (right.isDown) {
      this.setVelocityX(this.playerSpeed);
      this.setFlipX(false);
      this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
    } else {
      this.setVelocityX(0);
    }

    // Jumping only when on the floor
    if (isUpJustDown && onFloor) {
      this.setVelocityY(-this.playerSpeed * 2);
    }

    if (this.isPlayingAnims('throw')) {
      return;
    }

    // Player animations
    onFloor ?
      this.body.velocity.x !== 0 ?
        this.play('run', true) : this.play('idle', true) :
      this.play('jump', true);
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
      EventEmitter.emit('PLAYER_LOSE');
      return;
    }

    this.hasBeenHit = true;
    this.bounceOff();

    const hitAnim = this.playDamageAnim();
    this.playerHealth.setHealth(this.health);

    initiator.deliversHit && initiator.deliversHit(this);

    this.scene.time.delayedCall(500, () => {
      this.hasBeenHit = false;
      hitAnim.stop();
      this.clearTint();
    });
  }

}