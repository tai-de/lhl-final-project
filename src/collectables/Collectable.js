import Phaser from 'phaser';

export default class Collectable extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    scene.add.existing(this);

    this.score = 1;

    this.setOrigin(0, 1);

    scene.tweens.add({
      targets: this,
      y: this.y - 5,
      duration: Phaser.Math.Between(1000, 1500),
      repeat: -1,
      yoyo: true,
      ease: 'linear',
    });
  }
}