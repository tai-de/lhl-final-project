import Enemy from "./Enemy";

import initAnims from './anims/batAnims';

export default class Bat extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'bat');

    initAnims(scene.anims);
  }

  init () {
    super.init();
    this.setSize(30, 24);
  }

  update(time, delta) {
    super.update(time, delta);

    if (!this.active) { return; }

    if (this.isPlayingAnims('bat-hurt')) { return; }

    this.play('bat-idle', true);
  }

  /**
   * Method to handle the #takesHit invocation from a source object,
   * including any animations for the Enemy object to play.
   * @param {object} source GameObject instance of the source of damage
   */
  takesHit(source) {
    super.takesHit(source);
    this.play('bat-hurt', true);
  }

} 