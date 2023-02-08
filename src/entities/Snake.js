import Enemy from "./Enemy";
import Projectiles from "../attacks/Projectiles";

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
    this.timeFromLastAttack = null;
    this.attackDelay = Phaser.Math.Between(1000, 3000);

    this.projectiles = new Projectiles(this.scene, 'iceball1');
  }

  update(time, delta) {
    super.update(time, delta);

    if(this.timeFromLastAttack + this.attackDelay <= time){
      this.projectiles.shootProjectile(this);
      this.timeFromLastAttack = time;
      this.attackDelay = Phaser.Math.Between(1000, 3000);   
    }
    if (!this.active) { return; }

    if (this.isPlayingAnims('snake-hurt')) { return; }

    this.play('snake-idle', true);
  }

  takesHit(source) {
    super.takesHit(source);
    this.play('snake-hurt', true);
  }

} 