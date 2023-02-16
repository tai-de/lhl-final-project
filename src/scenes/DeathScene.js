import BaseScene from './BaseScene';

export default class DeathScene extends BaseScene {
  constructor(config) {
    super('DeathScene', config);

    this.config = config;

    this.menu = [
      { scene: 'PlayScene', text: 'Start' },
      { scene: 'LevelScene', text: 'Levels' },
      { scene: 'CreditsScene', text: 'Credits' }
    ];
  }

  create() {
    // this.createMenu(this.menu, this.setupMenuEvents.bind(this));
    this.add.image(this.screenCenter.x, this.screenCenter.y, 'game-over-bg')
    .setOrigin(0.5)
    .setScale(0.80);

    this.config.debug && this.createResetButton();
    this.createRestartButton();
    this.createLevelsButton();
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

  createRestartButton() {
    //I put 9.07 because when I created the retry button the spacing is different than the levels button
    const playButton = this.add.image((this.config.width / 10) * 4, (this.config.height / 10) * 9.07, 'retry')
      .setDepth(100)
      .setOrigin(0.5, 1)
      .setInteractive()
      .setScale(0.8);

    playButton.input.cursor = 'pointer';

    playButton.on('pointerup', () => {
      this.scene.start('PlayScene', { gameStatus: 'PLAYER_LOSE' });
    });
  }

  createLevelsButton() {
    const levelsButton = this.add.image((this.config.width / 10) * 6, (this.config.height / 10) * 9, 'levels')
      .setDepth(100)
      .setOrigin(0.5, 1)
      .setInteractive()
      .setScale(0.8);

    levelsButton.input.cursor = 'pointer';

    levelsButton.on('pointerup', () => {
      this.scene.start('LevelScene');
    });
  }
}