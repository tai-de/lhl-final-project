import Phaser from 'phaser';

import PlayScene from './scenes/PlayScene';

const WIDTH = 1280;
const HEIGHT = 600;

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  debug: false, // Change this to true to enable phaser debugging
};

const Scenes = [
  PlayScene,
];
const createScene = Scene => new Scene(SHARED_CONFIG);
const initScenes = () => Scenes.map(createScene);

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: SHARED_CONFIG.debug,
    },
  },
  scene: initScenes(),
};

new Phaser.Game(config);