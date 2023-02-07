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

    if (this.isOutOfRange()) {
      this.body.reset(0,0);
      this.setActive(false);
      this.setVisible(false);
      this.traveledDistance = 0;
    }
  }

  isOutOfRange() {
    return this.traveledDistance &&
      this.traveledDistance >= this.maxDistance;
  }

  shoot(x, y) {
    
    this.setActive(true);
    this.setVisible(true);
    this.body.reset(x, y);
    this.setVelocityX(this.speed);

  }

}