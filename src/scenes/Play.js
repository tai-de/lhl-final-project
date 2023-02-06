import Phaser from 'phaser';

export default class Play extends Phaser.Scene {

  constructor() {
    super('PlayScene');
  }

  create() {
    const map = this.make.tilemap({ key: 'level-1' });
    const tileset1 = map.addTilesetImage('mainlevbuild', 'tileset-1-main');
    const tileset2 = map.addTilesetImage('decorative_obj', 'tileset-1-objs');

    map.createStaticLayer('environment', tileset2);
    map.createStaticLayer('platforms', tileset1);
  }

}