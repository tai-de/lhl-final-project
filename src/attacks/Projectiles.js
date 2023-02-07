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

  shootProjectile(initiator){
    const projectile = this.getFirstDead(false);

    if (!projectile) { return; }

    projectile.shoot(initiator.x, initiator.y);
  }
}