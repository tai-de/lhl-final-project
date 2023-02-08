import Phaser from 'phaser';
import Collectable from '../collectables/Collectable';

export default class Collectables extends Phaser.Physics.Arcade.StaticGroup {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createFromConfig({
      classType: Collectable
    });
  }

  addFromLayer(layer) {
    const { score: defaultScore, type } = this.mapProperties(layer.properties);

    layer.objects.forEach((collectableObject) => {
      const collectable = this.get(collectableObject.x, collectableObject.y, type);

      // Checking if an individual collectable has its own custom score property
      const properties = this.mapProperties(collectableObject.properties)

      collectable.score = properties.score || defaultScore;
    });
  }

  mapProperties(propertiesArray) {
    if (!propertiesArray || propertiesArray.length === 0) { return {}; }

    return propertiesArray.reduce((map, obj) => {
      map[obj.name] = obj.value;
      return map;
    }, {});
  }
}