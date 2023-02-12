import BaseScene from './BaseScene';

export default class MenuScene extends BaseScene {
  constructor(config) {
    super('MenuScene', config);

    this.menu = [
      { scene: 'PlayScene', text: 'Start' },
      { scene: 'LevelScene', text: 'Levels' },
      { scene: 'CreditsScene', text: 'Credits' }
    ];
  }

  create() {
    super.create();

    // this.createMenu(this.menu, this.setupMenuEvents.bind(this));

    this.createResetButton();
    this.createPlayButton();
  }

  setupMenuEvents(menuItem) {
    const textObject = menuItem.textObject;
    textObject.setInteractive();
    textObject.input.cursor = 'pointer';

    textObject.on('pointerout', () => {
      textObject.setStyle({ fill: '#fff' });
    });

    textObject.on('pointerover', () => {
      textObject.setStyle({ fill: '#ff0' });
    });

    textObject.on('pointerup', () => {
      menuItem.scene && this.scene.start(menuItem.scene);

      if (menuItem.text === 'Exit') {
        this.game.destroy(true);
      }
    });
  }

  createResetButton() {
    const resetLS = this.add.text(30, this.config.height - 10, 'Reset localStorage', { fontSize: '18px', fill: '#fff' })
      .setDepth(100)
      .setScrollFactor(0)
      .setOrigin(0, 1)
      .setInteractive();

    resetLS.input.cursor = 'pointer';

    resetLS.on('pointerup', () => {
      localStorage.clear();
    });
  }

  createPlayButton() {
    const playButton = this.add.image((this.config.width / 2) - 200, this.config.height / 2 - 200 , 'play')
      .setDepth(101)
      .setOrigin(0, 1)
      .setInteractive();

    playButton.input.cursor = 'pointer';

    playButton.on('pointerup', () => {
      this.scene.start('PlayScene');
    });
  }
}