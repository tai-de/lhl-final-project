import Phaser from 'phaser';
import Projectile from './Projectile';
import getTimestamp from '../utils/functions';

export default class Projectiles extends Phaser.Physics.Arcade.Group {
  constructor(scene, key, damage = 10) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 5,
      active: false,
      visible: false,
      key,
      classType: Projectile
    });

    this.timeFromLastShoot = null;

    this.setDamageAmount(damage)
  }

  shootProjectile(initiator, anim) {
    const projectile = this.getFirstDead(false);

    if (!projectile) { return; }

    if (this.timeFromLastShoot &&
      this.timeFromLastShoot + projectile.cooldown > getTimestamp()) {
      return;
    }

    const center = initiator.getCenter();
    let centerX = null;

    if (initiator.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
      projectile.speed = Math.abs(projectile.speed);
      projectile.setFlipX(false);
      centerX = center.x + 10;
    } else {
      projectile.speed = -Math.abs(projectile.speed);
      projectile.setFlipX(true);
      centerX = center.x - 10;
    }

    projectile.shoot(centerX, center.y, anim);
    this.timeFromLastShoot = getTimestamp();
  }

  setDamageAmount(damage) {
    const projectiles = this.getChildren();
    projectiles.forEach(projectile => {
      projectile.damage = damage;
    });
  }
}