import BaseScene from './BaseScene';

export default class CreditsScene extends BaseScene {
  constructor(config) {
    super('CreditsScene', { ...config, canGoBack: true });

    this.menu = [
      { scene: null, text: 'Thanks for playing.' },
      { scene: null, text: 'Created by:' },
      { scene: null, text: 'Tai & Edward' }
    ];
  }

  create() {
    super.create();
    this.createMenu(this.menu, () => { });

    const musicConfig = {
      mute: false,
      volume: 0.5,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    };

    this.sound.stopAll();
    this.sound.add(`music-credits`, musicConfig)
      .play();
  }
}