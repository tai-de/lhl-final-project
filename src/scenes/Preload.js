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
    this.load.spritesheet('player-throw', 'assets/Player/Throw-attack/throw_attack.png', {
      frameWidth: 48,
      frameHeight: 48
    });
    
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