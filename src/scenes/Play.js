import Phaser from 'phaser';

import Player from '../entities/Player';

export default class Play extends Phaser.Scene {

  constructor(config) {
    super('PlayScene');
    this.config = config;
  }

  create() {
    const map = this.createMap();
    const layers = this.createLayers(map);

    const player = this.createPlayer();

    player.addCollider(layers.platforms2);

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
    const gameZones = map.getObjectLayer('game_zones').objects;

    platforms2.setCollisionByExclusion(-1, true);

    return {
      platforms,
      environment,
      platforms2,
      gameZones
    };
  }

  createPlayer() {
    const player = new Player(this, 100, 300);
    return player;
  }

  setupCameraOn(player) {
    const { width, height, mapOffset, zoomFactor } = this.config;
    this.physics.world.setBounds(0, 0, width + mapOffset, height + 200);
    this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(zoomFactor);
    this.cameras.main.startFollow(player);
  }

  update() {


  }

}