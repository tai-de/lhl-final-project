import Phaser from 'phaser';

import Player from '../entities/Player';
import Enemies from '../groups/Enemies';

export default class Play extends Phaser.Scene {

  constructor(config) {
    super('PlayScene');
    this.config = config;
  }

  create() {
    const map = this.createMap();
    const layers = this.createLayers(map);
    const gameZones = this.getPlayerZones(layers.gameZones);
    const player = this.createPlayer(gameZones.start);
    const enemies = this.createEnemies(layers.enemySpawns, layers.platforms2);

    player.addCollider(layers.platforms2);

    this.createEnemyColliders(enemies, {
      colliders: {
        platformColliders: layers.platforms2,
        player
      }
    });

    this.createEndPoint(gameZones.end, player);
    this.setupCameraOn(player);

    // this.plotting = false;
    // this.graphics = this.add.graphics();
    // this.line = new Phaser.Geom.Line();
    // this.graphics.lineStyle(1, 0x00ff00);

    // this.input.on('pointerdown', this.startDrawing, this);
    // this.input.on('pointerup', pointer => this.finishDrawing(pointer, layers.platforms), this);
  }

  // drawDebug(layer) {
  //   const collideColor = new Phaser.Display.Color(243, 134, 48, 200)
  //   layer.renderDebug(this.graphics, {
  //     tileColor: null,
  //     collideColor
  //   })
  // }

  // startDrawing(pointer) {
  //   if (this.tileHits && this.tileHits.length > 0) {
  //     this.tileHits.forEach(tile => {
  //       tile.index !== -1 && tile.setCollision(false)
  //     })
  //   }
  //   this.line.x1 = pointer.worldX;
  //   this.line.y1 = pointer.worldY;
  //   this.plotting = true;
  // }

  // finishDrawing(pointer, layer) {
  //   this.line.x2 = pointer.worldX;
  //   this.line.y2 = pointer.worldY;

  //   this.graphics.clear();
  //   this.graphics.strokeLineShape(this.line);

  //   this.tileHits = layer.getTilesWithinShape(this.line)

  //   if (this.tileHits.length > 0) {
  //     this.tileHits.forEach(tile => {
  //       tile.index !== -1 && tile.setCollision(true);
  //     })
  //   }

  //   this.drawDebug(layer);

  //   this.plotting = false;
  // }

  // Make tilemap based on the preloaded JSON file
  // Add tileset images based on @tilesetFileName and @preloaded image key
  createMap() {
    const map = this.make.tilemap({ key: 'level-1' });

    map.addTilesetImage('mainlevbuild', 'tileset-1-main');
    map.addTilesetImage('decorative_obj', 'tileset-1-objs');

    return map;
  }

  // Create layers based on the map file
  createLayers(map) {
    // Gets tileset image that was created in prev helper function
    const tileset1 = map.getTileset('mainlevbuild');
    const tileset2 = map.getTileset('decorative_obj');
    const platforms2 = map.createLayer('platforms_collider', tileset1).setAlpha(0); // Collider layer for platforms/world objects
    const platforms = map.createLayer('platforms', tileset1);
    const environment = map.createLayer('environment', tileset2);
    const gameZones = map.getObjectLayer('game_zones');
    const enemySpawns = map.getObjectLayer('enemy_spawns');

    platforms2.setCollisionByExclusion(-1, true);

    return {
      platforms,
      environment,
      platforms2,
      gameZones,
      enemySpawns
    };
  }

  getPlayerZones(gameZonesLayer) {
    const gameZones = gameZonesLayer.objects;
    return {
      start: gameZones.find(zone => zone.name === 'startPoint'),
      end: gameZones.find(zone => zone.name === 'endPoint')
    };
  }

  createPlayer(start) {
    const player = new Player(this, start.x, start.y);
    return player;
  }

  createEnemies(spawnLayer, platformsColliders) {
    const enemies = new Enemies(this);
    const enemyTypes = enemies.getTypes();

    spawnLayer.objects.forEach((point) => {
      const spawnType = point.properties && point.properties[0].value;

      const enemy = new enemyTypes[spawnType](this, point.x, point.y);
      enemy.setPlatformColliders(platformsColliders);
      enemies.add(enemy);
    });

    return enemies;
  }

  createEnemyColliders(enemies, { colliders }) {
    enemies
      .addCollider(colliders.platformColliders)
      .addCollider(colliders.player);
  }

  setupCameraOn(player) {
    const { width, height, mapOffset, zoomFactor } = this.config;
    this.physics.world.setBounds(0, 0, width + mapOffset, height + 200);
    this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(zoomFactor);
    this.cameras.main.startFollow(player);
  }

  createEndPoint(end, player) {
    // Add invisible sprite to the end point
    const endSprite = this.physics.add.sprite(end.x, end.y, 'end')
      .setAlpha(0)
      .setSize(10, 200)
      .setOrigin(0.5, 1);

    const endOverlap = this.physics.add.overlap(endSprite, player, () => {
      endOverlap.active = false;
      console.log('endpoint');
    });

  }

  update() {
     if(this.plotting){
      const pointer = this.input.activePointer;
      this.line.x2 = pointer.worldX;
      this.line.y2 = pointer.worldY;
      this.graphics.clear();
      this.graphics.strokeLineShape(this.line);
     }

  }

}