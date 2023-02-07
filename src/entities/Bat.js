import Phaser from "phaser";
import Enemy from "./Enemy"

import initAnims from './anims/batAnims';

export default class Bat extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'bat');
    initAnims(scene.anims);
  }

  update(time, delta) {
    super.update(time, delta);
    this.play('bat-idle', true);
  }

} 