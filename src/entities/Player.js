import Phaser from 'phaser';

import initAnimations from './anims/playerAnims';

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

    this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;

    this.setSize(20, 30);
    this.setOffset(13, 13)
    this.setOrigin(0.5, 1);

    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);

    initAnimations(this.scene.anims);
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update() {
    const { left, right, space } = this.cursors;
    const onFloor = this.body.onFloor();

    // Checking if space was just pressed to prevent duplicate
    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);

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
    if (isSpaceJustDown && onFloor) {
      this.setVelocityY(-this.playerSpeed * 2);
    }

    // Player animations
    onFloor ?
      this.body.velocity.x !== 0 ?
        this.play('run', true) : this.play('idle', true) :
      this.play('jump', true);
  }

  takesHit(initiator) {
    console.log('ive been hit');
  }

}