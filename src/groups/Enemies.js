import Phaser from 'phaser';
import collidable from '../mixins/collidable';
import { ENEMYTYPES } from '../entities/enemyTypes';

export default class Enemies extend Phaser.GameObjects.Group {
   constructor(scene){
    super(scene);

     // Include mixins
     Object.assign(this, collidable);
   }

   getTypes(){
    return ENEMYTYPES;
   }

}