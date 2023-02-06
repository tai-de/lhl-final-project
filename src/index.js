import Phaser from 'phaser';

import PreloadScene from './scenes/Preload';
import PlayScene from './scenes/Play';

const WIDTH = 1280;
const HEIGHT = 600;

// Shared configuration object will be passed through to all scenes
const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  debug: true, // Change this to true to enable phaser debugging
};

const Scenes = [
  PreloadScene,
  PlayScene,
];

// Function to create Scene instances for all of the Scenes imported above
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