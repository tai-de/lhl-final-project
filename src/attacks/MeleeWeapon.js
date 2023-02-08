import Phaser from 'phaser';

export default class MeleeWeapon extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, weaponName) {
    super(scene, x, y, weaponName);

    // Binds 'this' context to the scene
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // this.setOrigin(0.5, 1);
    this.attackSpeed = 1000;
    this.damage = 10;
    this.weaponAnim = weaponName + '-anim';

    this.activateWeapon(false);
    this.wielder = null;

    this.on('animationcomplete', (animation) => {
      if (animation.key === this.weaponAnim) {
        this.activateWeapon(false);
        this.body.reset(0, 0);
      }
    });

  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (!this.active) { return; }

    if (this.wielder.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
      this.setFlipX(false);
      this.setOffset(18, 0); // Offset of the hit box / debug
      this.body.reset((this.wielder.x + this.wielder.width / 2) - 11, this.wielder.y);
    } else {
      this.setFlipX(true); 
      this.setOffset(0, 0);
      this.body.reset((this.wielder.x - this.wielder.width / 2) + 10, this.wielder.y);
    }
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