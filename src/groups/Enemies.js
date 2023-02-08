import Phaser from 'phaser';
import collidable from '../mixins/collidable';
import ENEMYTYPES from '../entities/enemyTypes';

export default class Enemies extends Phaser.GameObjects.Group {
  constructor(scene) {
    super(scene);

    // Include mixins
    Object.assign(this, collidable);
  }

  getTypes() {
    return ENEMYTYPES;
  }

  getProjectiles() {
    const projectiles = new Phaser.GameObjects.Group();
    this.getChildren().forEach( (enemy) => {
      enemy.projectiles && projectiles.addMultiple(enemy.projectiles.getChildren());
    });
    return projectiles;
  }

}