import Enemy from "./Enemy";

import initAnims from './anims/snakeAnims';

export default class Snake extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'snake');

    initAnims(scene.anims);
  }

  init() {
    super.init();

    this.speed = 30;
    this.setSize(18, 45);
    this.setOffset(8, 15);
  }

  update(time, delta) {
    super.update(time, delta);

    if (!this.active) { return; }

    if (this.isPlayingAnims('snake-hurt')) { return; }

    this.play('snake-idle', true);
  }

  takesHit(source) {
    super.takesHit(source);
    this.play('snake-hurt', true);
  }

} 