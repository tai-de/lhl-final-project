import Phaser from 'phaser';

export default class Play extends Phaser.Scene {

  constructor() {
    super('PlayScene');
  }

  create() {
    const map = this.createMap();
    const layers = this.createLayers(map);
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
    const platforms = map.createStaticLayer('platforms', tileset1);
    const environment = map.createStaticLayer('environment', tileset2);

    return {
      platforms,
      environment,
    }
  }

}