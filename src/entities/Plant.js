import Enemy from "./Enemy";

import initAnims from './anims/plantAnims';

export default class Plant extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'plant');

    initAnims(scene.anims);
  }

  init () {
    super.init();

    this.health = 100;
    this.damage = 30;
    this.speed = 0;
    this.maxDistance = 0;
    this.setSize(28, 40);
    this.setOffset(0, 8);
    this.setVelocityX(this.speed);
  }

  update(time, delta) {
    super.update(time, delta);

    if (!this.active) { return; }

    if (this.isPlayingAnims('plant-hurt')) { return; }

    this.play('plant-idle', true);
  }

  /**
   * Method to handle the #takesHit invocation from a source object,
   * including any animations for the Enemy object to play.
   * @param {object} source GameObject instance of the source of damage
   */
  takesHit(source) {
    super.takesHit(source);
    this.play('plant-hurt', true);
  }

} 