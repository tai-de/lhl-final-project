import Phaser from 'phaser';
import Collectable from '../collectables/Collectable';

export default class Collectables extends Phaser.Physics.Arcade.StaticGroup {
  constructor(scene) {
    super(scene.physics.world, scene)

    this.createFromConfig({
      classType: Collectable
    })
  }
}