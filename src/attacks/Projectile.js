import Phaser from 'phaser';

export default class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    // Binds 'this' context to the scene
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.speed = 100;
    this.maxDistance = 200;
    this.traveledDistance = 0;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    this.traveledDistance += this.body.deltaAbsX();

    if (this.traveledDistance >= this.maxDistance) {
      this.destroy();
    }
  }

  shoot(x, y) {
    console.log('shoot');
    this.setActive(true);
    this.setVisible(true);
    this.body.reset(x, y);
    this.setVelocityX(this.speed);

  }

}