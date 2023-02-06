import Phaser from 'phaser';

export default class Preload extends Phaser.Scene {

  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.tilemapTiledJSON('level-1', 'assets/map-level-1.json');
    this.load.image('tileset-1-main', 'assets/Environment/mainlevbuild.png');
    this.load.image('tileset-1-objs', 'assets/Environment/decorative_obj.png');

    // Player idle sprites
    this.load.image('player1', 'assets/Player/Idle-run-jump/idle01.png');
    this.load.image('player2', 'assets/Player/Idle-run-jump/idle02.png');
    this.load.image('player3', 'assets/Player/Idle-run-jump/idle03.png');
    this.load.image('player4', 'assets/Player/Idle-run-jump/idle04.png');
    this.load.image('player5', 'assets/Player/Idle-run-jump/idle05.png');
    this.load.image('player6', 'assets/Player/Idle-run-jump/idle06.png');
    this.load.image('player7', 'assets/Player/Idle-run-jump/idle07.png');
    this.load.image('player8', 'assets/Player/Idle-run-jump/idle08.png');
    this.load.image('player9', 'assets/Player/Idle-run-jump/idle09.png');

    // Player run sprites
    this.load.image('player-run1', 'assets/Player/Idle-run-jump/run01.png');
    this.load.image('player-run2', 'assets/Player/Idle-run-jump/run02.png');
    this.load.image('player-run3', 'assets/Player/Idle-run-jump/run03.png');
    this.load.image('player-run4', 'assets/Player/Idle-run-jump/run04.png');
    this.load.image('player-run5', 'assets/Player/Idle-run-jump/run05.png');
    this.load.image('player-run6', 'assets/Player/Idle-run-jump/run06.png');
    this.load.image('player-run7', 'assets/Player/Idle-run-jump/run07.png');
    this.load.image('player-run8', 'assets/Player/Idle-run-jump/run08.png');

    // Player jump sprites
    this.load.image('player-jump-start1', 'assets/Player/Idle-run-jump/jump_start01.png');
    this.load.image('player-jump-start2', 'assets/Player/Idle-run-jump/jump_start02.png');
    this.load.image('player-jump-mid1', 'assets/Player/Idle-run-jump/jump_mid01.png');
    this.load.image('player-jump-mid2', 'assets/Player/Idle-run-jump/jump_mid02.png');
    this.load.image('player-jump-mid3', 'assets/Player/Idle-run-jump/jump_mid03.png');
    this.load.image('player-jump-mid4', 'assets/Player/Idle-run-jump/jump_mid04.png');
    this.load.image('player-jump-land', 'assets/Player/Idle-run-jump/jump_landing.png');

  }

  create() {
    this.scene.start('PlayScene');

  }

}