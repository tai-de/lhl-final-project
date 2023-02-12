import BaseScene from './BaseScene';

export default class LevelScene extends BaseScene {
  constructor(config) {
    super('LevelScene', { ...config, canGoBack: true });
    this.finalLevel = config.finalLevel;
  }

  create() {
    super.create();

    this.menu = [];

    const levelsCompleted = localStorage.getItem('levels-completed') || 0;

    for (let i = 0; i <= levelsCompleted && i < this.finalLevel; i++) {
      this.menu.push({
        scene: 'PlayScene',
        text: `Level ${i+1}`,
        level: i + 1
      });
    }

    this.createMenu(this.menu, this.setupMenuEvents.bind(this));
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
      if (menuItem.scene) {
        this.registry.set('level', menuItem.level);
        this.scene.start(menuItem.scene);
      }

      if (menuItem.text === 'Exit') {
        this.game.destroy(true);
      }
    });
  }
}