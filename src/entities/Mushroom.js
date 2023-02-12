import Enemy from "./Enemy";

import initAnims from './anims/mushroomAnims';

export default class Mushroom extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'mushroom');

    initAnims(scene.anims);
  }

  init () {
    super.init();

    this.speed = 40;
    this.setSize(24, 35);
    this.setOffset(12, 12)
  }

  update(time, delta) {
    super.update(time, delta);

    if (!this.active) { return; }

    if (this.isPlayingAnims('mushroom-hurt')) { return; }

    this.play('mushroom-run', true);
  }

  /**
   * Method to handle the #takesHit invocation from a source object,
   * including any animations for the Enemy object to play.
   * @param {object} source GameObject instance of the source of damage
   */
  takesHit(source) {
    super.takesHit(source);
    this.play('mushroom-hurt', true);
  }

} 