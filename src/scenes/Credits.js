import BaseScene from './BaseScene';

export default class CreditsScene extends BaseScene {
  constructor(config) {
    super('CreditsScene', { ...config, canGoBack: true });

    this.menu = [
      { scene: null, text: 'You won! Thanks for playing.' },
      { scene: null, text: 'Created by:' },
      { scene: null, text: 'Tai & Edward' }
    ];
  }

  create() {
    super.create();
    this.createMenu(this.menu, () => { });
  }
}