import Phaser from "phaser";

export default class Hud extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    scene.add.existing(this);

    const { topRightCorner } = scene.config;
    this.setPosition(topRightCorner.x - 80, topRightCorner.y + 5);
    this.setScrollFactor(0);

    this.setupList();
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
      fill: '#fff'
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
      fill: '#fff'
    })
      .setOrigin(1, 0);
    // const killImage = this.scene.add.image(killText.width + 5, 0, 'diamond')
    //   .setOrigin(0)
    //   .setScale(1.3);
    const killImage = this.scene.add.text(30, 5, 'kills', {
      fontSize: `14px`,
      fill: '#fff'
    });

    const killBoard = this.scene.add.container(0, 0, [killText, killImage]);

    return killBoard;
  }

  /**
   * Updates the scoreBoard container with the given score value
   * @param {number} score Player score
   */
  updateKillBoard(score) {
    const [killText, killImage] = this.getByName('killBoard').list;
    killText.setText(score);
    killText.setX(scoreText.width + 5);
  }

}