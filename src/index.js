import Phaser from 'phaser';

import PreloadScene from './scenes/Preload';
import PlayScene from './scenes/Play';
import MenuScene from './scenes/MenuScene';

const WIDTH = document.body.offsetWidth;
const HEIGHT = 600;
const MAPWIDTH = 1600;
const ZOOMFACTOR = 1.5;

// Shared configuration object will be passed through to all scenes
const SHARED_CONFIG = {
  mapOffset: MAPWIDTH > WIDTH ? MAPWIDTH - WIDTH : 0,
  width: WIDTH,
  height: HEIGHT,
  zoomFactor: ZOOMFACTOR,
  debug: true, // Change this to true to enable phaser debugging
  topLeftCorner: { // This calculates the x,y top left based on zoom factor & game size (determined by doc.body.offsetW)
    x: (WIDTH - (WIDTH / ZOOMFACTOR)) / 2,
    y: (HEIGHT - (HEIGHT / ZOOMFACTOR)) / 2
  },
  topRightCorner: {
    x: (WIDTH / ZOOMFACTOR) + ((WIDTH - (WIDTH / ZOOMFACTOR)) / 2),
    y: (HEIGHT - (HEIGHT / ZOOMFACTOR)) / 2,
  }
};

const Scenes = [
  PreloadScene,
  MenuScene,
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