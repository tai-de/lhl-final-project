import Phaser from 'phaser';

export default class Play extends Phaser.Scene {

  constructor() {
    super('PlayScene');
  }

  create() {
    const map = this.createMap();
    const layers = this.createLayers(map);

    const player = this.createPlayer();

    this.physics.add.collider(player, layers.platforms2);
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
    const platforms = map.createLayer('platforms', tileset1);
    const environment = map.createLayer('environment', tileset2);
    const platforms2 = map.createLayer('platforms_collider', tileset1);

    platforms2.setCollisionByExclusion(-1, true);

    return {
      platforms,
      environment,
      platforms2,
    }
  }

  createPlayer() {
    const player = this.physics.add.sprite(100, 300, 'player');
    player.body.setGravityY(500);
    player.setCollideWorldBounds(true);
    
    return player;
  }

}