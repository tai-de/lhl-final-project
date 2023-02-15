import Phaser from 'phaser';

import Player from '../entities/Player';
import Enemies from '../groups/Enemies';

import Collectables from '../groups/Collectables';

import Hud from '../hud';

import EventEmitter from '../events/Emitter';

import initAnims from '../anims';

export default class Play extends Phaser.Scene {

  constructor(config) {
    super('PlayScene');
    this.config = config;
  }

  create({ gameStatus }) {
    this.score = Number(localStorage.getItem('score')) || 0;
    this.kills = Number(localStorage.getItem('kills')) || 0;

    this.createBgMusic();

    const map = this.createMap();

    initAnims(this.anims);

    const layers = this.createLayers(map);
    const gameZones = this.getPlayerZones(layers.gameZones);
    const collectables = this.createCollectables(layers.collectables);
    const player = this.createPlayer(gameZones.start);
    const enemies = this.createEnemies(layers.enemySpawns, layers.platforms2);

    this.hud = new Hud(this, 0, 0);
    this.createBackground(map);

    this.createPlayerColliders(player, {
      colliders: {
        platformColliders: layers.platforms2,
        projectiles: enemies.getProjectiles(),
        collectables,
        traps: layers.traps
      }
    });

    this.createEnemyColliders(enemies, {
      colliders: {
        platformColliders: layers.platforms2,
        player
      }
    });

    this.createBackButton();
    this.createEndPoint(gameZones.end, player);
    this.setupCameraOn(player);
    this.collectItem = this.sound.add('collect-item');

    if (gameStatus === 'PLAYER_LOSE') { return; }
    this.createGameEvents();
  }

  /**
   * Cretes background music based on current level
   */
  createBgMusic() {
    const musicConfig = {
      mute: false,
      volume: 0.5,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    };

    this.sound.stopAll();
    this.sound.add(`music-level-${this.getCurrentLevel()}`, musicConfig)
      .play();
  }

  /**
   * Method to create a Phaser Tilemap instance and 
   * add the associated tileset images
   * @returns Phaser Tilemap
   */
  createMap() {
    const map = this.make.tilemap({ key: `level-${this.getCurrentLevel()}` });

    // Get the tilsets for the current level (pulled from the Tiled JSON)
    const levelTilesets = map.tilesets;

    // List of all the tileset names we are using (file names as displayed in Tiled)
    const tilesetNames = ['mainlevbuild', 'decorative_obj', 'crystal_world_tiles', 'grave_world_tileset', 'gravebg', 'Mine_Tile_tileset', 'minebg'];

    // Go through the levelTilesets and if the tileset is used, create a tilesetImage using the file name & Preload image key
    levelTilesets.forEach(tileset => {
      if (tilesetNames.includes(tileset.name)) {
        tileset.name === 'mainlevbuild' && map.addTilesetImage(tileset.name, 'tileset-1-main');
        tileset.name === 'decorative_obj' && map.addTilesetImage(tileset.name, 'tileset-1-objs');
        tileset.name === 'crystal_world_tiles' && map.addTilesetImage(tileset.name, 'crystal-world-tiles');
        tileset.name === 'grave_world_tileset' && map.addTilesetImage(tileset.name, 'grave_world_tileset1');
        tileset.name === 'gravebg' && map.addTilesetImage(tileset.name, 'grave_background1');
        tileset.name === 'Mine_Tile_tileset' && map.addTilesetImage(tileset.name, 'mine_tileset');
        tileset.name === 'minebg' && map.addTilesetImage(tileset.name, 'mine_bg');
      }
    });

    return map;
  }

  /**
   * Method to create tilemap layers based on the
   * configuration of the tilemap JSON file
   * @param {object} map Phaser Tilemap instance
   * @returns object referencing the tilemap's layers
   */
  createLayers(map) {
    const currentLevel = this.getCurrentLevel();

    // Object holding info about levels & their respective tilesets
    const levelTilesets = {
      1: { // These are the defaults, will be used by any levels that don't explicitly specify a different tileset
        platforms: 'gravebg',
        platformColliders: 'mainlevbuild',
        environment: 'grave_world_tileset',
        traps: 'mainlevbuild'
      },

      2: {
        platforms: 'gravebg',
        platformColliders: 'mainlevbuild',
        environment: 'grave_world_tileset',
        traps: 'mainlevbuild'
      },

      3: {
        platforms: 'minebg',
        platformColliders: 'mainlevbuild',
        environment: 'Mine_Tile_tileset',
        traps: 'mainlevbuild'
      },

      4: {
        platforms: 'minebg',
        platformColliders: 'mainlevbuild',
        environment: 'Mine_Tile_tileset',
        traps: 'mainlevbuild'
      },

      7: {
        platforms: 'crystal_world_tiles',
        platformColliders: 'crystal_world_tiles',
        environment: 'crystal_world_tiles',
        traps: 'crystal_world_tiles'
      }
    };
    const platformsTiles = map.getTileset(levelTilesets[currentLevel] && levelTilesets[currentLevel].platforms || 'mainlevbuild');
    const platformCollidersTiles = map.getTileset(levelTilesets[currentLevel] && levelTilesets[currentLevel].platformColliders || 'mainlevbuild');
    const environmentTiles = map.getTileset(levelTilesets[currentLevel] && levelTilesets[currentLevel].environment || 'decorative_obj');
    const trapsTiles = map.getTileset(levelTilesets[currentLevel] && levelTilesets[currentLevel].traps || 'mainlevbuild');

    const platforms2 = map.createLayer('platforms_collider', platformCollidersTiles).setAlpha(0); // Collider layer for platforms/world objects
    const platforms = map.createLayer('platforms', platformsTiles);
    const environment = map.createLayer('environment', environmentTiles);
    const gameZones = map.getObjectLayer('game_zones');
    const enemySpawns = map.getObjectLayer('enemy_spawns');
    const collectables = map.getObjectLayer('collectables');
    const traps = map.createLayer('traps', trapsTiles);

    platforms2.setCollisionByExclusion(-1, true);
    traps.setCollisionByExclusion(-1);

    return {
      platforms,
      environment,
      platforms2,
      gameZones,
      enemySpawns,
      collectables,
      traps,
    };
  }

  /**
   * Method to a background image based on an object
   * layer from the tilemap JSON file
   * @param {object} map Phaser Tilemap instance
   */
  createBackground(map) {
    const backgroundFar = map.getObjectLayer('distance').objects[0];

    const backgroundObject = map.getObjectLayer('distance_bg').objects[0];

    this.add.tileSprite(0, 0, this.config.width * 6, this.config.height, 'background-night1')
      .setOrigin(0)
      .setDepth(-20)
      .setScale(0.6)
      .setScrollFactor(0.02, 1);

    this.add.tileSprite(0, 0, this.config.width * 3, this.config.height, 'background-night2')
      .setOrigin(0)
      .setDepth(-15)
      .setScale(1)
      .setScrollFactor(0.1, 1);

    this.add.tileSprite(0, 0, this.config.width * 6, this.config.height * 2.5, 'background1')
      .setOrigin(0)
      .setDepth(-12)
      .setScale(0.7)
      .setScrollFactor(0.25, 1);

    this.add.tileSprite(0, 0, this.config.width * 6, backgroundObject.height * 4, 'background2')
      .setOrigin(0)
      .setDepth(-10)
      .setScale(0.7)
      .setScrollFactor(0.45, 1);

    this.add.tileSprite(0, 0, this.config.width * 12, backgroundObject.height * 4, 'background3')
      .setOrigin(0)
      .setDepth(-9)
      .setScale(1)
      .setScrollFactor(0.75, 1);

    this.add.tileSprite(0, 0, this.config.width * 6, this.config.height * 2, 'background4')
      .setOrigin(0)
      .setDepth(-8)
      .setScale(.6)
      .setScrollFactor(0.85, 1);

    this.add.tileSprite(0, 0, this.config.width * 6, this.config.height * 2, 'background5')
      .setOrigin(0)
      .setDepth(-8)
      .setScale(.6)
      .setScrollFactor(0.90, 1);
  }

  /**
   * Method to set up event listeners on the custom EventEmitter instance
   */
  createGameEvents() {
    EventEmitter.on('PLAYER_LOSE', () => {
      this.scene.restart({ gameStatus: 'PLAYER_LOSE' });
    });

    EventEmitter.on('ENEMY_KILLED', () => {
      this.hud.updateKillBoard(this.kills += 1);
    });
  }

  /**
   * Method to create collectables group / objects based
   * on an object layer from the tilemap JSON file
   * @param {object} collectablesLayer Phaser Tilemap Layer
   * @returns 
   */
  createCollectables(collectablesLayer) {
    const collectables = new Collectables(this).setDepth(-5);

    collectables.addFromLayer(collectablesLayer);

    // Customize the gem color per level (orange, blue, yellow, purple, red, or green)
    const collectablesColor = {
      1: 'gem-blue',
      2: 'gem-orange',
      3: 'gem-purple',
    };

    collectables.playAnimation(collectablesColor[this.getCurrentLevel()] || 'gem-blue');

    return collectables;
  }

  /**
   * Method to get and store the startPoint and endPoint objects
   * from the tilemap JSON file
   * @param {object} gameZonesLayer Phaser Tilemap Layer
   * @returns 
   */
  getPlayerZones(gameZonesLayer) {
    const gameZones = gameZonesLayer.objects;
    return {
      start: gameZones.find(zone => zone.name === 'startPoint'),
      end: gameZones.find(zone => zone.name === 'endPoint')
    };
  }

  /**
   * Method to create a new Player instance at the given start position
   * @param {object} startZoneObject Phaser object containing the startZone object from the tilemap JSON file
   * @returns 
   */
  createPlayer(start) {
    const player = new Player(this, start.x, start.y);
    return player;
  }

  /**
   * Method used when the Player has overlapped with a collectable item.
   * This disables the collectable's physics body, increases the Player's
   * score variable, and tells the HUD to update to the new score.
   * @param {object} player Player instance
   * @param {object} collectable Collectable instance
   */
  onCollect(player, collectable) {
    collectable.disableBody(true, true);
    this.score += collectable.score;
    this.collectItem.play();
    this.hud.updateScoreBoard(this.score);
  }

  /**
   * Method used to create colliders and overlap listeners for the Player,
   * based on a collection of tilemap layers
   * @param {object} player Player instance
   * @param {object} colliders  Object containing a colliders key which holds an object of Phaser Tilemap Layers that the Player should have collider or overlap listeners for
   */
  createPlayerColliders(player, { colliders }) {
    player
      .addCollider(colliders.platformColliders)
      .addCollider(colliders.projectiles, this.onHits)
      .addCollider(colliders.traps, this.onHits)
      .addOverlap(colliders.collectables, this.onCollect, this);
  }

  /**
   * Method to create new Enemies group and instances based on the
   * tilemap JSON file and add platform colliders
   * @param {object} spawnLayer Phaser Tilemap layer containing enemy spawn points as objects
   * @param {object} platformsColliders Phaser Tilemap Layer for the platform colliders
   * @returns 
   */
  createEnemies(spawnLayer, platformsColliders) {
    const enemies = new Enemies(this);
    const enemyTypes = enemies.getTypes();

    spawnLayer.objects.forEach((point) => {
      const spawnType = point.properties && point.properties[0].value;

      const enemy = new enemyTypes[spawnType](this, point.x, point.y);
      enemy.setPlatformColliders(platformsColliders);
      enemies.add(enemy);
    });

    return enemies;
  }

  /**
   * Method used to create colliders and overlap listeners for the Enemies,
   * based on a collection of tilemap layers
   * @param {object} player Enemies group instance
   * @param {object} colliders  Object containing a colliders key which holds an object of Phaser Tilemap Layers that the Enemies should have collider or overlap listeners for
   */
  createEnemyColliders(enemies, { colliders }) {
    enemies
      .addCollider(colliders.platformColliders)
      .addCollider(colliders.player, this.onPlayerCollision)
      .addCollider(colliders.player.projectiles, this.onHits)
      .addOverlap(colliders.player.meleeWeapon, this.onHits);
  }

  /**
   * Method to call a GameObject's #takesHit method
   * @param {object} entity Player or other Phaser GameObject instance that has taken damage
   * @param {object} source Player or other Phaser GameObject instance that has dealt damage
   */
  onHits(entity, source) {
    entity.takesHit(source);
  }

  /**
   * Method that handles the Player receiving damage from a given Enemy
   * @param {object} enemy Enemy instance
   * @param {object} player Player instance
   */
  onPlayerCollision(enemy, player) {
    player.takesHit(enemy);
  }

  /**
   * Method to set the Phaser.Physics.World bounds as well as the
   * Phaser main camera bounds before calling it to follow the player
   * @param {object} player Player instance
   */
  setupCameraOn(player) {
    const { width, height, mapOffset, zoomFactor } = this.config;
    this.physics.world.setBounds(0, 0, width + mapOffset, height + 250);
    //Added +40 so that bottom of level is not cut off
    this.cameras.main.setBounds(0, 0, width + mapOffset, height + 40).setZoom(zoomFactor);
    this.cameras.main.startFollow(player);
    this.cameras.main.roundPixels = true;
  }

  /**
   * Method to create the endZone area and add an overlap sprite
   * to trigger any end of level events
   * @param {object} endZoneObject Phaser object containing the endZone object from the tilemap JSON file
   * @param {object} player 
   */
  createEndPoint(end, player) {
    // Add invisible sprite to the end point
    const endSprite = this.physics.add.sprite(end.x, end.y, 'end')
      .setAlpha(0)
      .setSize(10, 200)
      .setOrigin(0.5, 1);

    const endOverlap = this.physics.add.overlap(endSprite, player, () => {
      endOverlap.active = false;

      localStorage.setItem('score', this.score);
      localStorage.setItem('kills', this.kills);
      localStorage.setItem('levels-completed', this.getCurrentLevel());

      if (this.registry.get('level') === this.config.finalLevel) {
        this.scene.start('CreditsScene');
        return;
      }

      this.registry.inc('level', 1);
      this.registry.inc('levels-unlocked', 1);
      this.scene.restart({ gameStatus: 'LEVEL_COMPLETE' });
    });

  }

  /**
   * Method to create the Back to Menu button on the PlayScene
   */
  createBackButton() {
    // const backText = this.add.text(this.config.bottomRightCorner.x - 30, this.config.bottomRightCorner.y - 10, 'Back to Menu', { fontSize: '18px', fill: '#fff' })
    //   .setDepth(100)
    //   .setScrollFactor(0)
    //   .setOrigin(1)
    //   .setInteractive();

    const backButton = this.add.image(this.config.bottomRightCorner.x, this.config.bottomRightCorner.y - 5, 'back')
      .setOrigin(1)
      .setScrollFactor(0)
      .setScale(1.5)
      .setInteractive();

    // backText.input.cursor = 'pointer';
    backButton.input.cursor = 'pointer';

    // backText.on('pointerup', () => {
    //   this.scene.start('MenuScene');
    // });

    backButton.on('pointerup', () => {
      this.scene.start('MenuScene');
    });
  }

  /**
   * Helper to determine the current PlayScene level
   * @returns PlayScene current level per Phaser registry
   */
  getCurrentLevel() {
    return this.registry.get('level') || 1;
  }

}