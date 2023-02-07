import Phaser from "phaser";
import Enemy from "./Enemy"

export default class Bat extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'bat');
  }

} 