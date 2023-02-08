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
    
    this.on('animationcomplete', (animation) => {
      if(animation.key === this.weaponAnim){
        this.activateWeapon(false);
        this.body.reset(0, 0);
      }
    })

  }

  swing(wielder) {
    this.wielder = wielder;
    this.activateWeapon(true);
    this.body.reset(wielder.x, wielder.y);
    this.anims.play(this.weaponAnim, true).setOrigin(0.5, 1);
  }

  activateWeapon(isActive) {
    this.setActive(isActive);
    this.setVisible(isActive);
  }

}