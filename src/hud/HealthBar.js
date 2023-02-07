import Phaser from "phaser";

export default class HealthBar{
  constructor(scene, x, y, health){
    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.bar.setScrollFactor(0, 0);

    this.x = x;
    this.y = y;
    this.health = health;
    this.size = {width: 40, height: 8};
    this.pixelsPerHealth = this.size.width / this.health;

    scene.add.existing(this.bar);
    this.draw(this.x, this.y);
  }

  draw(x, y) {
    const {width, height} = this.size;
    const margin = 2;

    this.bar.fillStyle(0x727872);
    this.bar.fillRect(x, y, width + margin, height + margin);
    this.bar.fillStyle(0xffffff);
    this.bar.fillRect(x + margin, y + margin, width - margin, height - margin);

    const healthWidth = Math.floor(this.pixelsPerHealth * this.health);


    this.bar.fillStyle(0x00ff00);
    this.bar.fillRect(x + margin, y + margin, healthWidth - margin, height - margin);
  }

  decrease(amount){
    this.health -= amount;
    this.draw(this.x, this.y);
  }

}