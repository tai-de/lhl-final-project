import Phaser from 'phaser';

export default class MeleeWeapon extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    // Binds 'this' context to the scene
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.attackSpeed = 1000;
    this.damage = 10;

  }

  swing(wielder) {
    this.wielder = wielder;
    this.activateWeapon(true);
    this.body.reset(wielder.x, wielder.y);
  }

  activateWeapon(isActive) {
    this.setActive(isActive);
    this.setVisible(isActive);
  }

}