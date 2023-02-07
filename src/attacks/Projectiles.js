import Phaser from 'phaser';
import Projectile from './Projectile';

export default class Projectiles extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 5,
      active: false,
      visible: false,
      key: 'fireball1',
      classType: Projectile
    });
  }

  shootProjectile(initiator) {
    const projectile = this.getFirstDead(false);

    if (!projectile) { return; }
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

    projectile.shoot(centerX, center.y + 5);
  }
}