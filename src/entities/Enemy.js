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
    this.speed = 100;
    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setOrigin(0.5, 1);
    this.setSize(30, 24);
    this.setImmovable(true);
    this.rayGraphics = this.scene.add.graphics({lineStyle: {width: 2, color:  0xEEfe00 }},);
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update(time, delta) {
    this.setVelocityX(30);
    const {ray} = this.rayCast(this.body);
    this.rayGraphics.clear();
    this.rayGraphics.strokeLineShape(ray);
  }

  rayCast(body){
   const {x, y, width, halfHeight} = body;
   const line = new Phaser.Geom.Line();
   line.x1 = x + width;
   line.y1 = y + halfHeight;
   line.x2 = line.x1 + 30;
   line.y2 = line.y1 + 30;

   return {ray: line};
  }
} 