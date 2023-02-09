import Phaser from "phaser";

export default class Hud extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    scene.add.existing(this);

    const { topRightCorner } = scene.config;
    this.setPosition(topRightCorner.x - 50, topRightCorner.y + 5);
    this.setScrollFactor(0);

    this.setupList();
  }

  setupList() {
    this.fontSize = 20;
    const scoreBoard = this.scene.add.text(0, 0, '0', {
      fontSize: `${this.fontSize}px`,
      fill: '#fff'
    });

    // const scoreBoard1 = this.scene.add.text(0, 0, 'Hello', {
    //   fontSize: `${this.fontSize}px`,
    //   fill: '#fff'
    // });


    // const scoreBoard2 = this.scene.add.text(0, 0, 'Banana', {
    //   fontSize: `${this.fontSize}px`,
    //   fill: '#fff'
    // });

    this.add([scoreBoard]); // Add more items to the array to display on screen

    let lineHeight = 0;

    // This allows multiple items in the Hud container
    // to be displayed and spaced vertically
    this.list.forEach(item => {
      item.setPosition(item.x, item.y + lineHeight);
      lineHeight += 20;
    })
  }

}