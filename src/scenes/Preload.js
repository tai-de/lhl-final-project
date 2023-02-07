import Phaser from 'phaser';

export default class Preload extends Phaser.Scene {

  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.tilemapTiledJSON('level-1', 'assets/map-level-1.json');
    this.load.image('tileset-1-main', 'assets/Environment/mainlevbuild.png');
    this.load.image('tileset-1-objs', 'assets/Environment/decorative_obj.png');

    // Player sprites
    this.load.spritesheet('player', 'assets/Player/Idle-run-jump/player_sheet.png', {
      frameWidth: 48,
      frameHeight: 48
    });

  }

  create() {
    this.scene.start('PlayScene');

  }

}