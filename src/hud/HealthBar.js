import Phaser from "phaser";

export default class HealthBar{
  constructor(scene, x, y, health){
    this.bar = new Phaser.GameObjects.Graphics(scene);

    this.x = x;
    this.y = y;
    this.health = health;
    this.size = {width: 40, height: 8};
    this.pixelsPerHealth = this.size.width / this.health;

    scene.add.existing(this.bar);
  }
}