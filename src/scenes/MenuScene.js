import BaseScene from './BaseScene';

export default class MenuScene extends BaseScene {
  constructor(config) {
    super('MenuScene', config);

    this.menu = [
      { scene: 'PlayScene', text: 'Start' },
      { scene: 'LevelScene', text: 'Levels' },
      { scene: null, text: 'Exit' }
    ];
  }

  create() {
    super.create();

    this.createMenu(this.menu, this.setupMenuEvents.bind(this));
  }

  setupMenuEvents(menuItem) {
    const textObject = menuItem.textObject;
    textObject.setInteractive();

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
}