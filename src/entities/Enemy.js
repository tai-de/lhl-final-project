import Phaser from "phaser";
import collidable from "../mixins/collidable";
import anims from '../mixins/anims';

export default class Enemies extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    // Binds 'this' context to the scene
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Include mixins
    Object.assign(this, collidable);
    Object.assign(this, anims);

    this.init();
    this.initEvents();
  }

  init() {
    this.gravity = 500;
    this.speed = 30;
    this.timeFromLastTurn = 0;
    this.maxDistance = 100;
    this.currentDistance = 0;

    this.health = 40;
    this.damage = 20;

    this.platformCollidersLayer = null;
    this.rayGraphics = this.scene.add.graphics({
      lineStyle: {
        width: 2,
        color: 0xEEfe00
      }
    },);

    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setOrigin(0.5, 1);
    this.setImmovable(true);
    this.setVelocityX(this.speed);
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update(time, delta) {
    
    if (!this.body) { return; }

    if (this.health <= 0) {
      this.scene.events.removeListener(Phaser.Scenes.Events.UPDATE, this.update, this);
      this.setActive(false);
      this.rayGraphics.clear();
      this.destroy();
      return;
    }

    this.currentDistance += Math.abs(this.body.deltaX());

    const { ray, hasHits } = this.rayCast(this.body, this.platformCollidersLayer);
    if ((!hasHits || this.currentDistance >= this.maxDistance || this.body.deltaX() === 0) && this.timeFromLastTurn + 100 < time) {
      // console.log('Has Hits');
      this.setFlipX(!this.flipX);
      this.setVelocityX(this.speed = -this.speed);
      this.timeFromLastTurn = time;
      this.currentDistance = 0;
    }
    this.rayGraphics.clear();
    this.rayGraphics.strokeLineShape(ray);
  }

  setPlatformColliders(platformCollidersLayer) {
    this.platformCollidersLayer = platformCollidersLayer;
  }

  // Empty function to prevent game crash
  // when Player collides with Enemy
  // Can be used to have Enemy perform some
  // other action on Player collision if needed
  deliversHit(target) { }

  takesHit(source) {
    source.deliversHit(this);
    this.health -= source.damage;

    if (this.health <= 0) {
      this.setTint('0xff0000');
    }
  }

} 