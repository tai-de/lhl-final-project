import Phaser from 'phaser';

export default class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    // Binds 'this' context to the scene
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    this.speed = 100;
  }

  shoot(){
    console.log('shoot');
    this.setVelocityX(this.speed);
  }

}