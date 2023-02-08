import Phaser from 'phaser';

import SpriteEffect from '../effects/SpriteEffect';

export default class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    // Binds 'this' context to the scene
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.speed = 100;
    this.maxDistance = 200;
    this.traveledDistance = 0;
    this.cooldown = 1000;
    this.damage = 10;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    this.traveledDistance += this.body.deltaAbsX();

    if (this.isOutOfRange()) {
      this.body.reset(0, 0);
      this.activateProjectile(false);
      this.traveledDistance = 0;
    }
  }

  isOutOfRange() {
    return this.traveledDistance &&
      this.traveledDistance >= this.maxDistance;
  }

  shoot(x, y) {
    this.activateProjectile(true);
    this.body.reset(x, y);
    this.setVelocityX(this.speed);
  }

  deliversHit(target) {
    this.activateProjectile(false);
    this.traveledDistance = 0;
    this.body.reset(0, 0);
    new SpriteEffect(this.scene, 0, 0, 'hit-effect').playOn(target);
  }

  activateProjectile(isActive) {
    this.setActive(isActive);
    this.setVisible(isActive);
  }

}