import Phaser from 'phaser';

export default class Preload extends Phaser.Scene {

  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.tilemapTiledJSON('level-1', 'assets/map-level-1.json');
    this.load.image('tileset-1-main', 'assets/Environment/mainlevbuild.png');
    this.load.image('tileset-1-objs', 'assets/Environment/decorative_obj.png');
  }

  create() {
    this.scene.start('PlayScene');
  }

}