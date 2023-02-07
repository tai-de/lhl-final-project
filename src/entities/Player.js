import Phaser from 'phaser';
import HealthBar from '../hud/healthbar';
import initAnimations from './anims/playerAnims';
import Projectile from '../attacks/Projectile';

import collidable from '../mixins/collidable';

export default class Player extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y) {
    super(scene, x, y, 'player');

    // Binds 'this' context to the scene
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Include mixins
    Object.assign(this, collidable);

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

   this.scene.input.keyboard.on('keydown-SPACE', () => {
    const projectile = new Projectile(this.scene, this.x, this.y, 'fireball1');
    projectile.shoot();
   });
   

    
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update() {
    if (this.hasBeenHit) { return; }

    const { left, right, up } = this.cursors;

    const onFloor = this.body.onFloor();

    // Checking if space was just pressed to prevent duplicate
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

    // Player animations
    onFloor ?
      this.body.velocity.x !== 0 ?
        this.play('run', true) : this.play('idle', true) :
      this.play('jump', true);
  }

  playDamageAnim() {
    return this.scene.tweens.add({
      targets: this,
      duration: 200,
      repeat: -1,
      tint: 0xffffff
    });
  }

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

  takesHit(initiator) {
    if (this.hasBeenHit) { return; }

    this.hasBeenHit = true;
    this.bounceOff();
    const hitAnim = this.playDamageAnim();
    this.health -= initiator.damage;
    this.playerHealth.decrease(initiator.damage);
    this.scene.time.delayedCall(500, () => {
      this.hasBeenHit = false;
      hitAnim.stop();
      this.clearTint();
    });
  }

}