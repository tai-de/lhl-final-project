import Phaser from 'phaser';

export default class Preload extends Phaser.Scene {

  constructor() {
    super('PreloadScene');
  }

  preload() {
    //Add progress bar to prevent black screen while loading assets on website
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function(value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', function(file) {
      assetText.setText('Loading asset: ' + file.key);
    });
    this.load.on('complete', function() {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    this.load.image('menu-bg', 'assets/menu-bg.png');
    this.load.image('game-over-bg', 'assets/game-over.jpg');
    this.load.image('back', 'assets/UI/back-to-menu.png');
    this.load.image('play', 'assets/Menu/play.png');
    this.load.image('levels', 'assets/Menu/levels.png');
    this.load.image('credits', 'assets/Menu/credits.png');
    this.load.image('retry', 'assets/Menu/retry.png');

    // Loading maps
    this.load.tilemapTiledJSON('level-1', 'assets/map-level-1.json');
    this.load.tilemapTiledJSON('level-2', 'assets/map-level-2.json');
    this.load.tilemapTiledJSON('level-3', 'assets/map-level-3.json');
    this.load.tilemapTiledJSON('level-4', 'assets/map-level-4.json');
    this.load.tilemapTiledJSON('level-5', 'assets/map-level-5.json');
    this.load.tilemapTiledJSON('level-6', 'assets/map-level-6.json');
    this.load.tilemapTiledJSON('level-7', 'assets/map-level-7.json');
    this.load.tilemapTiledJSON('level-8', 'assets/map-level-8.json');
    this.load.tilemapTiledJSON('level-9', 'assets/map-level-9.json');
    this.load.tilemapTiledJSON('level-10', 'assets/map-level-10.json');
    this.load.tilemapTiledJSON('level-11', 'assets/map-level-11.json');
    this.load.tilemapTiledJSON('level-12', 'assets/map-level-12.json');
    // Loading tilesets
    this.load.image('tileset-1-main', 'assets/Environment/mainlevbuild.png');
    this.load.image('tileset-1-objs', 'assets/Environment/decorative_obj.png');
    this.load.image('crystal-world-tiles', 'assets/Environment/crystal_world_tiles.png');
    this.load.image('grave_world_tileset1', 'assets/Environment/Tiles.png');
    this.load.image('grave_background1', 'assets/Environment/gravebg.png');
    this.load.image('grave_world_tileset1', 'assets/Environment/Tiles.png');
    this.load.image('mine_tileset', 'assets/Environment/Mine_Tile.png');
    this.load.image('mine_bg', 'assets/Environment/minebg.png');
    this.load.image('village_tileset', 'assets/Environment/village_tileset.png');
    this.load.image('village_bg', 'assets/Environment/village_bg.png');
    this.load.image('fantasy-swamp', 'assets/Environment/fantasy-swamp.png');

    this.load.image('background-day1', 'assets/Environment/background_day1.png');
    this.load.image('background-day3', 'assets/Environment/background_day3.png');
    this.load.image('background-night1', 'assets/Environment/2.png');
    this.load.image('background-night2', 'assets/Environment/3.png');
    this.load.image('background1', 'assets/Environment/4.png');
    this.load.image('background2', 'assets/Environment/5.png');
    this.load.image('background3', 'assets/Environment/6.png');
    this.load.image('background4', 'assets/Environment/7.png');
    this.load.image('background5', 'assets/Environment/8.png');
    this.load.image('fantasy-swamp-bg1', 'assets/Environment/fantasy-swamp-bg1.png');
    this.load.image('fantasy-swamp-bg2', 'assets/Environment/fantasy-swamp-bg2.png');
    this.load.image('fantasy-swamp-bg3', 'assets/Environment/fantasy-swamp-bg3.png');

    // UI elements
    this.load.image('hp-bar-frame', 'assets/UI/bar-frame.png');

    // Music
    this.load.audio('music-level-1', 'assets/Music/stranger-things.mp3');
    this.load.audio('music-level-2', 'assets/Music/stranger-things.mp3');
    this.load.audio('music-level-3', 'assets/Music/epic.mp3');
    this.load.audio('music-level-4', 'assets/Music/epic.mp3');
    this.load.audio('music-level-5', 'assets/Music/neon-gaming.mp3');
    this.load.audio('music-level-6', 'assets/Music/neon-gaming.mp3');
    this.load.audio('music-level-7', 'assets/Music/stardust-vision-ii.mp3');
    this.load.audio('music-level-8', 'assets/Music/stardust-vision-ii.mp3');
    this.load.audio('music-level-9', 'assets/Music/kim-lightyear-legends.mp3');
    this.load.audio('music-level-10', 'assets/Music/kim-lightyear-legends.mp3');
    this.load.audio('music-level-11', 'assets/Music/hero-80s.ogg');
    this.load.audio('music-level-12', 'assets/Music/hero-80s.ogg');
    
    // SFX
    this.load.audio('fireball', 'assets/Music/fireball-woosh.mp3');
    this.load.audio('slash', 'assets/Music/slash.mp3');
    this.load.audio('jump', 'assets/Music/jump.mp3');
    this.load.audio('collect-item', 'assets/Music/collectitem.mp3');
    this.load.audio('enemy-hit', 'assets/Music/enemy-hit.mp3');
    this.load.audio('player-hit', 'assets/Music/player-hit.mp3');
    this.load.audio('enemy-death', 'assets/Music/enemy-death.mp3');
    this.load.audio('player-death', 'assets/Music/player-death.mp3');
    this.load.audio('music-credits', 'assets/Music/dontyou.mp3')

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

    // Fire Sword Player sprites
    this.load.spritesheet('player-fire-idle', 'assets/Player/player-fire-idle.png', {
      frameWidth: 64,
      frameHeight: 48
    });

    this.load.spritesheet('player-fire-run', 'assets/Player/player-fire-run.png', {
      frameWidth: 64,
      frameHeight: 48
    });

    this.load.spritesheet('player-fire-jump', 'assets/Player/player-fire-jump.png', {
      frameWidth: 64,
      frameHeight: 58
    });

    this.load.spritesheet('player-fire-swing', 'assets/Player/player-fire-swing.png', {
      frameWidth: 64,
      frameHeight: 48
    });

    this.load.spritesheet('player-fire-spell', 'assets/Player/player-fire-spell.png', {
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

    // Plant
    this.load.spritesheet('plant', 'assets/Enemies/Enemy03/plant-sheet.png', {
      frameWidth: 32,
      frameHeight: 48
    });

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
      frameWidth: 80,
      frameHeight: 65
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


    //Load diamond (for scoreboard)
    this.load.image('diamond', 'assets/Objects/diamond_01.png');

    // Load new gems
    this.load.spritesheet('gem-orange', 'assets/Objects/gem01orange.png', {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet('gem-blue', 'assets/Objects/gem02blue.png', {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet('gem-yellow', 'assets/Objects/gem03yellow.png', {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet('gem-purple', 'assets/Objects/gem04purple.png', {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet('gem-red', 'assets/Objects/gem05red.png', {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet('gem-green', 'assets/Objects/gem06green.png', {
      frameWidth: 16,
      frameHeight: 16
    });


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