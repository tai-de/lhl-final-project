import Enemy from "./Enemy";
import Projectiles from "../attacks/Projectiles";

import initAnims from './anims/goblinAnims';

export default class Goblin extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'goblin');

    initAnims(scene.anims);
  }

  init() {
    super.init();

    this.health = 80;
    this.speed = 80;
    this.maxDistance = 175;
    this.setSize(18, 32);
    this.setOffset(10, 16)
    this.timeFromLastAttack = null;
    this.attackDelay = Phaser.Math.Between(250, 500);
    this.lastDirection = null;

    this.projectiles = new Projectiles(this.scene, 'bomb');
  }

  update(time, delta) {
    super.update(time, delta);

    if (!this.active) { return; }

    if (this.body.velocity.x > 0) {
      this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
    } else {
      this.lastDirection = Phaser.Physics.Arcade.FACING_LEFT;
    }

    if (this.timeFromLastAttack + this.attackDelay <= time) {
      this.projectiles.shootProjectile(this, 'bomb');
      this.timeFromLastAttack = time;
      this.attackDelay = Phaser.Math.Between(1000, 3000);
    }

    if (this.isPlayingAnims('goblin-hurt')) { return; }

    this.play('goblin-idle', true);
  }

  /**
   * Method to handle the #takesHit invocation from a source object,
   * including any animations for the Enemy object to play.
   * @param {object} source GameObject instance of the source of damage
   */
  takesHit(source) {
    super.takesHit(source);
    this.play('goblin-hurt', true);
  }

} 