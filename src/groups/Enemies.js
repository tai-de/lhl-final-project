import Phaser from 'phaser';
import collidable from '../mixins/collidable';
import ENEMYTYPES from '../entities/enemyTypes';

export default class Enemies extends Phaser.GameObjects.Group {
  constructor(scene) {
    super(scene);

    // Include mixins
    Object.assign(this, collidable);
  }

  /**
   * 
   * @returns Object containing all of the Enemy class instances
   */
  getTypes() {
    return ENEMYTYPES;
  }

  /**
   * Gets all of the projectile instances belonging to the Enemies group
   * @returns Phaser GameObjects Group containing all of the Projectile instances belonging to its children
   */
  getProjectiles() {
    const projectiles = new Phaser.GameObjects.Group();
    this.getChildren().forEach( (enemy) => {
      enemy.projectiles && projectiles.addMultiple(enemy.projectiles.getChildren());
    });
    return projectiles;
  }

}