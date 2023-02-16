import Phaser from "phaser";

export default class Hud extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    scene.add.existing(this);

    const { topRightCorner, bottomLeftCorner } = scene.config;
    this.setPosition(topRightCorner.x - 80, topRightCorner.y + 5);
    this.setScrollFactor(0);

    this.setupList();
    this.addLevel(bottomLeftCorner);
  }

  addLevel(bottomLeftCorner) {
    const levelText = this.scene.add.text(bottomLeftCorner.x + 16, bottomLeftCorner.y - 8, `Level ${this.scene.registry.get('level')}`, {
      fontSize: `14px`,
      fill: '#fff',
      shadow: {
        offsetX: 0,
        offsetY: 0,
        blur: 3,
        fill: true,
      }
    });

    levelText
      .setOrigin(0, 1)
      .setScrollFactor(0);
  }

  /**
   * Method on the Hud Container handle the creation of display items
   */
  setupList() {
    this.fontSize = 20;

    const scoreBoard = this.createScoreBoard();
    scoreBoard.setName('scoreBoard');

    const killBoard = this.createKillBoard();
    killBoard.setName('killBoard');

    this.add([scoreBoard, killBoard]); // Add more items to the array to display on screen

    let lineHeight = 0;

    // This allows multiple items in the Hud container
    // to be displayed and spaced vertically
    this.list.forEach(item => {
      item.setPosition(item.x, item.y + lineHeight);
      lineHeight += 20;
    });
  }

  /**
   * Creates a container with the a scoreText and scoreImage instance
   * @returns Phaser GameObjects Container
   */
  createScoreBoard() {

    const scoreText = this.scene.add.text(0, 0, localStorage.getItem('score') || 0, {
      fontSize: `${this.fontSize}px`,
      fill: '#fff',
      shadow: {
        offsetX: 0,
        offsetY: 0,
        blur: 3,
        fill: true,
      }
    });
    const scoreImage = this.scene.add.image(scoreText.width + 5, 0, 'diamond')
      .setOrigin(0)
      .setScale(1.3);

    const scoreBoard = this.scene.add.container(0, 0, [scoreText, scoreImage]);

    return scoreBoard;
  }

  /**
   * Updates the scoreBoard container with the given score value
   * @param {number} score Player score
   */
  updateScoreBoard(score) {
    const [scoreText, scoreImage] = this.getByName('scoreBoard').list;
    scoreText.setText(score);
    scoreImage.setX(scoreText.width + 5);
  }

  /**
   * Creates a container with the a killText and killImage instance
   * @returns Phaser GameObjects Container
   */
  createKillBoard() {

    const killText = this.scene.add.text(25, 0, localStorage.getItem('kills') || 0, {
      fontSize: `${this.fontSize}px`,
      fill: '#fff',
      shadow: {
        offsetX: 0,
        offsetY: 0,
        blur: 3,
        fill: true,
      }
    })
      .setOrigin(1, 0);
    // const killImage = this.scene.add.image(killText.width + 5, 0, 'diamond')
    //   .setOrigin(0)
    //   .setScale(1.3);
    const killImage = this.scene.add.text(30, 5, 'kills', {
      fontSize: `14px`,
      fill: '#fff',
      shadow: {
        offsetX: 0,
        offsetY: 0,
        blur: 3,
        fill: true,
      }
    });

    const killBoard = this.scene.add.container(0, 0, [killText, killImage]);

    return killBoard;
  }

  /**
   * Updates the killBoard container with the given kill value
   * @param {number} kills Player kills
   */
  updateKillBoard(kills) {
    const [killText, killImage] = this.getByName('killBoard').list;
    killText.setText(kills);
    killText.setX(killText.width + 5);
  }

}