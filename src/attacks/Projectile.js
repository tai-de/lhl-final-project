import Phaser from 'phaser';

import EffectManager from '../effects/EffectManager';

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
    this.body.setSize(this.width - 13, this.height - 20);
    this.effectManager = new EffectManager(scene);
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

  shoot(x, y, anim) {
    this.activateProjectile(true);
    this.body.reset(x, y);
    this.setVelocityX(this.speed);
    anim && this.play(anim, true);
    this.scene.tweens.add({
      targets: this,
      scaleY: 0.75,
      duration: 100,
      repeat: -1,
      yoyo: true,
      ease: 'linear',
    });
    this.scene.tweens.add({
      targets: this,
      alpha: 0.5,
      duration: 100,
      repeat: -1,
      yoyo: true,
      ease: 'linear',
    });
  }

  deliversHit(target) {
    const impactPosition = { x: this.x, y: this.y };
    this.activateProjectile(false);
    this.traveledDistance = 0;
    this.body.reset(0, 0);
    this.effectManager.playEffectOn('hit-effect', target, impactPosition);
  }

  activateProjectile(isActive) {
    this.setActive(isActive);
    this.setVisible(isActive);
  }

}