import Phaser from 'phaser';

export default class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);

    this.config = config;
    this.screenCenter = { x: config.width / 2, y: config.height / 2 };
    this.fontSize = 50;
    this.lineHeight = 75;
    this.fontStyles = {
      fontSize: `${this.fontSize}px`, fill: '#fff'
    };
  }

  create() {
    this.add.image(this.screenCenter.x, this.screenCenter.y, 'menu-bg')
      .setOrigin(0.5)
      .setScale(1.25);

    if (this.config.canGoBack) {
      // const backText = this.add.text(this.config.width - 30, this.config.height - 10, 'Back to Menu', { fontSize: '18px', fill: '#fff' })
      //   .setDepth(100)
      //   .setScrollFactor(0)
      //   .setOrigin(1)
      //   .setInteractive();

      const backButton = this.add.image(this.config.width, this.config.height - 5, 'back')
        .setOrigin(1)
        .setScale(2)
        .setInteractive();

      // backText.input.cursor = 'pointer';
      backButton.input.cursor = 'pointer';

      // backText.on('pointerup', () => {
      //   this.scene.start('MenuScene');
      // });

      backButton.on('pointerup', () => {
        this.scene.start('MenuScene');
      });
    }
  }

  createMenu(menu, setupMenuEvents) {
    let lastMenuYPosition = 0;

    let { x: centerX, y: centerY } = this.screenCenter;

    if (menu.length > 6) {
      centerX = this.screenCenter.x - 150;
      lastMenuYPosition = -this.lineHeight;
    }

    menu.forEach((menuItem, i) => {
      if (i === 6) { // Reset to next column on index 6 (lv 7)
        lastMenuYPosition = -this.lineHeight;
        centerX = this.screenCenter.x + 150;
      }

      const menuPosition = [centerX, centerY - 100 + lastMenuYPosition];

      menuItem.textObject = this.add.text(...menuPosition, menuItem.text, this.fontStyles)
        .setOrigin(0.5, 1)
        .setDepth(10);

      this.add.rectangle(centerX, centerY - 100 + lastMenuYPosition, menuItem.textObject.width + 50, menuItem.textObject.height, 0x000000)
        .setOrigin(0.5, 1)
        .setAlpha(0.5);

      lastMenuYPosition += this.lineHeight;

      setupMenuEvents(menuItem);
    });
  }

}