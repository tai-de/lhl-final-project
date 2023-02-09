import Phaser from 'phaser';

export default new class EventEmitter extends Phaser.Events.EventEmitter {
  constructor() {
    super();
  }
}