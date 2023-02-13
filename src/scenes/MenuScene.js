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
    this.createLevelsButton();
    this.createCreditsButton();
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
    const playButton = this.add.image((this.config.width / 2), (this.config.height / 10) * 4  , 'play')
      .setDepth(100)
      .setOrigin(0.5, 1)
      .setInteractive()
      .setScale(0.8);

    playButton.input.cursor = 'pointer';

    playButton.on('pointerup', () => {
      this.scene.start('PlayScene');
    });
  }

  createLevelsButton() {
    const levelsButton = this.add.image((this.config.width / 2), (this.config.height / 10) * 5.5, 'levels')
      .setDepth(100)
      .setOrigin(0.5, 1)
      .setInteractive()
      .setScale(0.8);

    levelsButton.input.cursor = 'pointer';

    levelsButton.on('pointerup', () => {
      this.scene.start('LevelScene');
    });
  }

  createCreditsButton() {
    const creditsButton = this.add.image((this.config.width / 2), (this.config.height / 10) * 7, 'credits')
      .setDepth(100)
      .setOrigin(0.5, 1)
      .setInteractive()
      .setScale(0.8);

    creditsButton.input.cursor = 'pointer';

    creditsButton.on('pointerup', () => {
      this.scene.start('CreditsScene');
    });
  }
}