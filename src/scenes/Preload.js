import Phaser from 'phaser';

export default class Preload extends Phaser.Scene {

  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.image('menu-bg', 'assets/menu-bg.png');
    this.load.image('back', 'assets/back.png');
    this.load.image('play', 'assets/Menu/play.png')
    this.load.image('levels', 'assets/Menu/levels.png')
    this.load.image('credits', 'assets/Menu/credits.png')

    this.load.tilemapTiledJSON('level-1', 'assets/map-level-1.json');
    this.load.tilemapTiledJSON('level-2', 'assets/map-level-2.json');
    this.load.image('tileset-1-main', 'assets/Environment/mainlevbuild.png');
    this.load.image('tileset-1-objs', 'assets/Environment/decorative_obj.png');

    this.load.image('background-day1', 'assets/Environment/background_day1.png');
    this.load.image('background-day3', 'assets/Environment/background_day3.png');
    this.load.image('background-night1', 'assets/Environment/2.png');
    this.load.image('background-night2', 'assets/Environment/3.png');
    this.load.image('background1', 'assets/Environment/4.png');
    this.load.image('background2', 'assets/Environment/5.png');
    this.load.image('background3', 'assets/Environment/6.png');
    this.load.image('background4', 'assets/Environment/7.png');
    this.load.image('background5', 'assets/Environment/8.png');
 
    // UI elements
    this.load.image('hp-bar-frame', 'assets/UI/bar-frame.png');

    // Music
    this.load.audio('music-level-1', 'assets/Music/stranger-things.mp3');
    this.load.audio('music-level-2', 'assets/Music/neon-gaming.mp3');
    this.load.audio('fireball', 'assets/Music/fireball-woosh.mp3');
    this.load.audio('slash', 'assets/Music/slash.mp3');
    this.load.audio('jump', 'assets/Music/jump.mp3');
    this.load.audio('collect-item', 'assets/Music/collectitem.mp3');
    this.load.audio('enemy-hit', 'assets/Music/enemy-hit.mp3');
    this.load.audio('player-hit', 'assets/Music/player-hit.mp3');
    this.load.audio('enemy-death', 'assets/Music/enemy-death.mp3');
    this.load.audio('player-death', 'assets/Music/player-death.mp3');

    // New Player sprites
    this.load.spritesheet('player-normal-idle', 'assets/Player/player-normal-idle.png', {
      frameWidth: 64,
      frameHeight: 48
    });

    this.load.spritesheet('player-normal-run', 'assets/Player/player-normal-run.png', {
      frameWidth: 64,
      frameHeight: 48
    });

    this.load.spritesheet('player-normal-jump', 'assets/Player/player-normal-jump.png', {
      frameWidth: 64,
      frameHeight: 58
    });

    this.load.spritesheet('player-normal-swing', 'assets/Player/player-normal-swing.png', {
      frameWidth: 64,
      frameHeight: 48
    });

    this.load.spritesheet('player-normal-spell', 'assets/Player/player-normal-spell.png', {
      frameWidth: 64,
      frameHeight: 48
    });

    // Enemy sprites
    // Bat / enemy01
    this.load.spritesheet('bat', 'assets/Enemies/Enemy01/enemy01_sheet.png', {
      frameWidth: 32,
      frameHeight: 48
    });

    // Snake
    this.load.spritesheet('snake', 'assets/Enemies/Enemy05/enemy05_sheet.png', {
      frameWidth: 32,
      frameHeight: 64,
      spacing: 32
    });
    
    // Goblin
    this.load.spritesheet('goblin', 'assets/Enemies/Goblin/goblin-sheet.png', {
      frameWidth: 48,
      frameHeight: 48
    });

    // Flying eye
    this.load.spritesheet('flying-eye', 'assets/Enemies/Flying_eye/flying-eye-sheet.png', {
      frameWidth: 48,
      frameHeight: 64
    });

    // Mushroom
    this.load.spritesheet('mushroom', 'assets/Enemies/Mushroom/mushroom-sheet.png', {
      frameWidth: 48,
      frameHeight: 48
    });

    this.load.image('bat-hit1', 'assets/Enemies/Enemy01/hit01.png');
    this.load.image('bat-hit2', 'assets/Enemies/Enemy01/hit02.png');
    this.load.image('bat-hit3', 'assets/Enemies/Enemy01/hit03.png');

    //Load fireball attack
    this.load.spritesheet('fireball', 'assets/Weapons/FireBall-Sheet.png', {
      frameWidth: 32,
      frameHeight: 32
    });

    //Load iceball attack
    this.load.image('iceball1', 'assets/Weapons/iceball_001.png');
    this.load.image('iceball2', 'assets/Weapons/iceball_002.png');

    //Load bomb
    this.load.spritesheet('bomb', 'assets/Enemies/Goblin/Bomb_sprite.png', {
      frameWidth: 100,
      frameHeight: 100
    });

    //Load bomb2 (eye for flying-eye enemy)
    this.load.spritesheet('eye', 'assets/Enemies/Flying_eye/projectile_sprite.png', {
      frameWidth: 48,
      frameHeight: 48
    });

    //Load hit effect
    this.load.spritesheet('hitsheet1', 'assets/Weapons/hit_effect_sheet.png', {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet('swordsheet1', 'assets/Player/player-normal-swing-effect.png', {
      frameWidth: 52, // This is actually an empty file. It's just a placeholder so the sprite effect has a collider box
      frameHeight: 32
    });


    //Load diamond
    this.load.image('diamond', 'assets/Objects/diamond_01.png');
    this.load.image('diamond1', 'assets/Objects/diamond_01.png');
    this.load.image('diamond2', 'assets/Objects/diamond_02.png');
    this.load.image('diamond3', 'assets/Objects/diamond_03.png');
    this.load.image('diamond4', 'assets/Objects/diamond_04.png');
    this.load.image('diamond5', 'assets/Objects/diamond_05.png');
    this.load.image('diamond6', 'assets/Objects/diamond_06.png');

    this.load.once('complete', () => {
      this.startGame();
    });
  }

  startGame() {
    this.registry.set('level', 1);
    this.registry.set('levels-completed', 0);
    this.scene.start('MenuScene');
  }

}