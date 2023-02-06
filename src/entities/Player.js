import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y) {
    super(scene, x, y, 'player');

    // Binds 'this' context to the scene
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
    this.initEvents();
  }

  init() { // Initialize all of the player variables/logic
    this.gravity = 500;
    this.playerSpeed = 200;

    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
  }

  update() {
    const { left, right } = this.cursors;
    
    if (left.isDown) {
      this.setVelocityX(-this.playerSpeed);
    } else if (right.isDown) {
      this.setVelocityX(this.playerSpeed);
    } else {
      this.setVelocityX(0);
    }
  }

}