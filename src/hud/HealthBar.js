import Phaser from "phaser";

export default class HealthBar {
  constructor(scene, x, y, scale = 1, health) {
    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.bar.setScrollFactor(0, 0);

    this.x = x / scale;
    this.y = y / scale;
    this.scale = scale;
    this.health = health;
    this.size = { width: 40, height: 8 };
    this.pixelsPerHealth = this.size.width / this.health;

    scene.add.existing(this.bar);
    this.draw(this.x, this.y, this.scale);
  }

  /**
   * Creates a HealthBar container on the screen
   * @param {number} x X coordinate of the game
   * @param {number} y Y coordinate of the game
   * @param {number} scale scale factor
   */
  draw(x, y, scale) {
    const { width, height } = this.size;
    const margin = 2;

    this.bar.fillStyle(0x727872);
    this.bar.fillRect(x, y, width + margin, height + margin);
    this.bar.fillStyle(0xffffff);
    this.bar.fillRect(x + margin, y + margin, width - margin, height - margin);

    const healthWidth = Math.floor(this.pixelsPerHealth * this.health);

    if (healthWidth <= width / 3) {
      this.bar.fillStyle(0xff0000); // HEALTHBAR COLOR < 30% REMAINING
    } else if (healthWidth <= width / 2) {
      this.bar.fillStyle(0xfcf63a); // HEALTHBAR COLOR < 50% REMAINING
    } else {
      this.bar.fillStyle(0x00FF7F); // HEALTHBAR DEFAULT
    }

    if (healthWidth > 0) {
      this.bar.fillRect(x + margin, y + margin, healthWidth - margin, height - margin);
    }

    this.bar.setScrollFactor(0, 0).setScale(scale);
  }

  /**
   * Sets the health value to the target amount
   * @param {number} amount Current health value
   */
  setHealth(amount) {
    this.health = amount;
    this.draw(this.x, this.y, this.scale);
  }

}