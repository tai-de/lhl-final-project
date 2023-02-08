import Phaser from "phaser";
import collidable from "../mixins/collidable";

export default class Enemies extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    // Binds 'this' context to the scene
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Include mixins
    Object.assign(this, collidable);

    this.init();
    this.initEvents();
  }

  init() {
    this.gravity = 500;
    this.speed = 30;
    this.timeFromLastTurn = 0;
    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setOrigin(0.5, 1);
    this.setSize(30, 24);
    this.setImmovable(true);
    this.rayGraphics = this.scene.add.graphics({ lineStyle: { width: 2, color: 0xEEfe00 } },);
    this.platformCollidersLayer = null;
    this.maxDistance = 100;
    this.currentDistance = 0;
    this.damage = 20;
    this.health = 40;
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update(time, delta) {
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

  takesHit(source) {
    source.deliversHit(this);
    this.health -= source.damage;

    if (this.health <= 0) {
      console.log('enemy dead');
    }
  }

} 