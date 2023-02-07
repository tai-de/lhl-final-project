import Phaser from "phaser";
import collidable from "../mixins/collidable";

export default class Enemies extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    
    // Binds 'this' context to the scene
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Include mixins
    Object.assign(this, collidable);

    this.init();
  }

  init() {
    this.gravity = 500;
    this.speed = 100;
    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setOrigin(0.5, 1);
    this.setSize(30, 24);
    this.setImmovable(true);
  }
} 