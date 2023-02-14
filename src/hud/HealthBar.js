import Phaser from "phaser";

export default class HealthBar {
  constructor(scene, x, y, scale = 1, health) {
    this.healthText = scene.add.text(scene.config.topLeftCorner.x + 15, scene.config.topLeftCorner.y + 10, `Health: ${health}/${health}`, {
      fontSize: `14px`,
      fill: '#fff'
    })
      .setOrigin(0, 0)
      .setDepth(9)
      .setScrollFactor(0, 0);

    this.barFrame = scene.add.image(scene.config.topLeftCorner.x + 10, scene.config.topLeftCorner.y + 24, 'hp-bar-frame')
      .setOrigin(0, 0)
      .setDepth(9)
      .setScale(3)
      .setScrollFactor(0, 0);

    this.bar = new Phaser.GameObjects.Graphics(scene).setDepth(10);
    this.bar.setScrollFactor(0, 0);

    this.x = x / scale;
    this.y = y / scale;
    this.scale = scale;
    this.maxHealth = health;
    this.health = health;
    this.size = { width: 70, height: 10 };
    this.pixelsPerHealth = this.size.width / this.health;

    scene.add.existing(this.bar);

    this.draw(this.x, this.y + 7, this.scale);
  }

  /**
   * Creates a HealthBar container on the screen
   * @param {number} x X coordinate of the game
   * @param {number} y Y coordinate of the game
   * @param {number} scale scale factor
   */
  draw(x, y, scale) {
    const { width, height } = this.size;
    const margin = 4;

    // this.bar.fillStyle(0x727872);
    // this.bar.fillRect(x, y, width + margin, height + margin);
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
    this.healthText.setText(`Health: ${amount}/${this.maxHealth}`)
    this.draw(this.x, this.y + 7, this.scale);
  }

}