import Phaser from "phaser";
import collidable from "../mixins/collidable";
import anims from '../mixins/anims';

export default class Enemies extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    // Binds 'this' context to the scene
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Include mixins
    Object.assign(this, collidable);
    Object.assign(this, anims);

    this.init();
    this.initEvents();
  }

  init() {
    this.gravity = 500;
    this.speed = 30;
    this.timeFromLastTurn = 0;
    this.maxDistance = 100;
    this.currentDistance = 0;

    this.health = 40;
    this.damage = 20;
    this.damageText = null;
    this.damageTextAnim = null;

    this.platformCollidersLayer = null;
    this.rayGraphics = this.scene.add.graphics({
      lineStyle: {
        width: 2,
        color: 0xEEfe00
      }
    },);

    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setOrigin(0.5, 1);
    this.setImmovable(true);
    this.setVelocityX(this.speed);
    this.enemyHit = this.scene.sound.add('enemy-hit');
    this.enemyDeath = this.scene.sound.add('enemy-death');
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update(time, delta) {

    if (!this.body) { return; }

    if (this.health <= 0) {
      this.enemyDeath.play();
      this.scene.events.removeListener(Phaser.Scenes.Events.UPDATE, this.update, this);
      this.setActive(false);
      this.rayGraphics.clear();
      this.destroy();
      return;
    }

    if (this.damageText) {
      this.damageText.setPosition(this.x, this.getBounds().top - 5).setOrigin(0.5, 1);

      this.animDamageText();
    }

    this.currentDistance += Math.abs(this.body.deltaX());

    const { ray, hasHits } = this.rayCast(this.body, this.platformCollidersLayer);
    if ((!hasHits || this.currentDistance >= this.maxDistance || this.body.deltaX() === 0) && this.timeFromLastTurn + 100 < time) {
      // console.log('Has Hits');
      this.setFlipX(!this.flipX);
      this.setVelocityX(this.speed = -this.speed);
      this.timeFromLastTurn = time;
      this.currentDistance = 0;
    }

    if (this.scene.config.debug && ray) {
      this.rayGraphics.clear();
      this.rayGraphics.strokeLineShape(ray);

    }
  }

  /**
   * Sets an instance variable to contain the collidable layer for enemies
   * @param {object} platformCollidersLayer Phaser Tilemap layer
   */
  setPlatformColliders(platformCollidersLayer) {
    this.platformCollidersLayer = platformCollidersLayer;
  }

  // Empty function to prevent game crash
  // when Player collides with Enemy
  // Can be used to have Enemy perform some
  // other action on Player collision if needed
  deliversHit(target) { }

  /**
   * Method to handle the #takesHit invocation from a source object
   * @param {object} source GameObject instance of the source of damage
   */
  takesHit(source) {
    source.deliversHit(this);
    this.health -= source.damage;
    this.enemyHit.play();

    if (this.health <= 0) {
      this.setTint('0xff0000');
    }

    let fontOptions = { font: "12px Arial", fill: "#fff", align: "center" };
    this.damageText = this.scene.add.text(0, 0, `-${source.damage}`, fontOptions);
  }

  animDamageText() {
    this.scene.tweens.add({
      targets: this.damageText,
      alpha: 0,
      duration: 1000,
      repeat: 0,
      ease: 'linear',
      onComplete: () => {
        this.damageTextAnim.stop();
        this.damageText = null;
      }
    });

    this.damageTextAnim = this.scene.tweens.add({
      targets: this.damageText,
      x: this.x - 5,
      duration: 500,
      repeat: -1,
      yoyo: true,
      ease: 'linear',
    });
  }

} 