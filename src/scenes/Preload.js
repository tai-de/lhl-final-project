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
    // Idle run and jump
    this.load.spritesheet('player', 'assets/Player/Idle-run-jump/player_sheet.png', {
      frameWidth: 48,
      frameHeight: 48
    });

    // Throwing
    this.load.image('player-throw1', 'assets/Player/Throw-attack/throw_attack01.png');
    this.load.image('player-throw2', 'assets/Player/Throw-attack/throw_attack02.png');
    this.load.image('player-throw3', 'assets/Player/Throw-attack/throw_attack03.png');
    this.load.image('player-throw4', 'assets/Player/Throw-attack/throw_attack04.png');
    this.load.image('player-throw5', 'assets/Player/Throw-attack/throw_attack05.png');
    this.load.image('player-throw6', 'assets/Player/Throw-attack/throw_attack06.png');
    this.load.image('player-throw7', 'assets/Player/Throw-attack/throw_attack07.png');

    // Enemy sprites
    // Bat / enemy01
    this.load.spritesheet('bat', 'assets/Enemies/Enemy01/enemy01_sheet.png', {
      frameWidth: 32,
      frameHeight: 32
    });

    //Load fireball attack
    this.load.image('fireball1', 'assets/Weapons/fireball_001.png');
    this.load.image('fireball2', 'assets/Weapons/fireball_002.png');
    this.load.image('fireball3', 'assets/Weapons/fireball_003.png');

  }

  create() {
    this.scene.start('PlayScene');

  }

}