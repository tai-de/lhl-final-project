import Phaser from 'phaser';

import EffectManager from '../effects/EffectManager';

export default class MeleeWeapon extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, weaponName) {
    super(scene, x, y, weaponName);

    // Binds 'this' context to the scene
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // this.setOrigin(0.5, 1);
    this.attackSpeed = 500;
    this.damage = 10;
    this.weaponAnim = weaponName + '-anim';

    this.activateWeapon(false);
    this.wielder = null;

    this.on('animationcomplete', (animation) => {
      if (animation.key === this.weaponAnim) {
        this.activateWeapon(false);
        this.body.checkCollision.none = false;
        this.body.reset(0, 0);
      }
    });

    this.effectManager = new EffectManager(scene);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (!this.active) { return; }

    if (this.wielder.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
      this.setFlipX(false);
      this.body.reset(this.wielder.x + 64, this.wielder.y - 10);
    } else {
      this.setFlipX(true); 
      this.body.reset(this.wielder.x + 24, this.wielder.y - 10);
    }
  }

  deliversHit(target) {
    const impactPosition = { x: this.x, y: this.getRightCenter().y}
    this.effectManager.playEffectOn('hit-effect', target, impactPosition);
    this.body.checkCollision.none = true;
  }

  swing(wielder) {
    this.wielder = wielder;
    this.activateWeapon(true);
    this.anims.play(this.weaponAnim).setOrigin(0.5, 1);
  }

  activateWeapon(isActive) {
    this.setActive(isActive);
    this.setVisible(isActive);
  }

}