import Phaser from 'phaser';

export default class Preload extends Phaser.Scene {

  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.tilemapTiledJSON('level-1', 'assets/map-level-1.json');
    this.load.tilemapTiledJSON('level-2', 'assets/map-level-2.json');
    this.load.image('tileset-1-main', 'assets/Environment/mainlevbuild.png');
    this.load.image('tileset-1-objs', 'assets/Environment/decorative_obj.png');

    this.load.image('background-day3', 'assets/Environment/background_day3.png');

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

    this.load.spritesheet('snake', 'assets/Enemies/Enemy05/enemy05_sheet.png', {
      frameWidth: 32,
      frameHeight: 64,
      spacing: 32
    });
    
    this.load.image('bat-hit1', 'assets/Enemies/Enemy01/hit01.png');
    this.load.image('bat-hit2', 'assets/Enemies/Enemy01/hit02.png');
    this.load.image('bat-hit3', 'assets/Enemies/Enemy01/hit03.png');

    //Load fireball attack
    this.load.image('fireball1', 'assets/Weapons/fireball_001.png');
    this.load.image('fireball2', 'assets/Weapons/fireball_002.png');
    this.load.image('fireball3', 'assets/Weapons/fireball_003.png');

    //Load iceball attack
    this.load.image('iceball1', 'assets/Weapons/iceball_001.png');
    this.load.image('iceball2', 'assets/Weapons/iceball_002.png');

    //Load hit effect
    this.load.spritesheet('hitsheet1', 'assets/Weapons/hit_effect_sheet.png', {
      frameWidth: 32,
      frameHeight: 32
    });

    //Load sword attack
    this.load.spritesheet('swordsheet1', 'assets/Weapons/sword_sheet_1.png', {
      frameWidth: 52,
      frameHeight: 32,
      spacing: 16
    });

    //Load diamond
    this.load.image('diamond', 'assets/Objects/diamond_01.png');
    this.load.image('diamond1', 'assets/Objects/diamond_01.png');
    this.load.image('diamond2', 'assets/Objects/diamond_02.png');
    this.load.image('diamond3', 'assets/Objects/diamond_03.png');
    this.load.image('diamond4', 'assets/Objects/diamond_04.png');
    this.load.image('diamond5', 'assets/Objects/diamond_05.png');
    this.load.image('diamond6', 'assets/Objects/diamond_06.png');

  }

  create() {
    this.scene.start('PlayScene');

  }

}