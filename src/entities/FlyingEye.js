import Enemy from "./Enemy";
import Projectiles from "../attacks/Projectiles";

import initAnims from './anims/flyingEyeAnims';

export default class FlyingEye extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'flying-eye');

    initAnims(scene.anims);
  }

  init() {
    super.init();

    this.speed = 40;
    this.setSize(30, 50);
    this.timeFromLastAttack = null;
    this.attackDelay = Phaser.Math.Between(250, 500);
    this.lastDirection = null;
    this.maxDistance = 200;

    this.projectiles = new Projectiles(this.scene, 'eye');
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
      this.projectiles.shootProjectile(this, 'eye');
      this.timeFromLastAttack = time;
      this.attackDelay = Phaser.Math.Between(1000, 3000);
    }

    if (this.isPlayingAnims('flying-eye-hurt')) { return; }

    this.play('flying-eye-idle', true);
  }

  /**
   * Method to handle the #takesHit invocation from a source object,
   * including any animations for the Enemy object to play.
   * @param {object} source GameObject instance of the source of damage
   */
  takesHit(source) {
    super.takesHit(source);
    this.play('flying-eye-hurt', true);
  }

} 