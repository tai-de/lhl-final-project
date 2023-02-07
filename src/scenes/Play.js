import Phaser from 'phaser';

import Player from '../entities/Player';
import Bat from '../entities/Bat';

export default class Play extends Phaser.Scene {

  constructor(config) {
    super('PlayScene');
    this.config = config;
  }

  create() {
    const map = this.createMap();
    const layers = this.createLayers(map);
    const gameZones = this.getPlayerZones(layers.gameZones);
    const player = this.createPlayer(gameZones.start);
    const enemies = this.createEnemies(layers.enemySpawns);

    player.addCollider(layers.platforms2);

    this.createEnemyColliders(enemies, {
      colliders: {
        platformColliders: layers.platforms2,
        player
      }
    });

    this.createEndPoint(gameZones.end, player);
    this.setupCameraOn(player);
  }

  // Make tilemap based on the preloaded JSON file
  // Add tileset images based on @tilesetFileName and @preloaded image key
  createMap() {
    const map = this.make.tilemap({ key: 'level-1' });

    map.addTilesetImage('mainlevbuild', 'tileset-1-main');
    map.addTilesetImage('decorative_obj', 'tileset-1-objs');

    return map;
  }

  // Create layers based on the map file
  createLayers(map) {
    // Gets tileset image that was created in prev helper function
    const tileset1 = map.getTileset('mainlevbuild');
    const tileset2 = map.getTileset('decorative_obj');
    const platforms2 = map.createLayer('platforms_collider', tileset1).setAlpha(0); // Collider layer for platforms/world objects
    const platforms = map.createLayer('platforms', tileset1);
    const environment = map.createLayer('environment', tileset2);
    const gameZones = map.getObjectLayer('game_zones');
    const enemySpawns = map.getObjectLayer('enemy_spawns');

    platforms2.setCollisionByExclusion(-1, true);

    return {
      platforms,
      environment,
      platforms2,
      gameZones,
      enemySpawns
    };
  }

  getPlayerZones(gameZonesLayer) {
    const gameZones = gameZonesLayer.objects;
    return {
      start: gameZones.find(zone => zone.name === 'startPoint'),
      end: gameZones.find(zone => zone.name === 'endPoint')
    };
  }

  createPlayer(start) {
    const player = new Player(this, start.x, start.y);
    return player;
  }

  createEnemies(spawnLayer) {
    return spawnLayer.objects.map(point => {
      return new Bat(this, point.x, point.y);
    });
  }

  createEnemyColliders(enemies, { colliders }) {
    enemies.forEach(enemy => {
      enemy
        .addCollider(colliders.platformColliders)
        .addCollider(colliders.player);
    });
  }

  setupCameraOn(player) {
    const { width, height, mapOffset, zoomFactor } = this.config;
    this.physics.world.setBounds(0, 0, width + mapOffset, height + 200);
    this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(zoomFactor);
    this.cameras.main.startFollow(player);
  }

  createEndPoint(end, player) {
    // Add invisible sprite to the end point
    const endSprite = this.physics.add.sprite(end.x, end.y, 'end')
      .setAlpha(0)
      .setSize(10, 200)
      .setOrigin(0.5, 1);

    const endOverlap = this.physics.add.overlap(endSprite, player, () => {
      endOverlap.active = false;
      console.log('endpoint');
    });
  }

  update() {


  }

}