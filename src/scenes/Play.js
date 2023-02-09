import Phaser from 'phaser';

import Player from '../entities/Player';
import Enemies from '../groups/Enemies';

import Collectables from '../groups/Collectables';

import Hud from '../hud';

import initAnims from '../anims';

export default class Play extends Phaser.Scene {

  constructor(config) {
    super('PlayScene');
    this.config = config;
  }

  create() {
    this.score = 0;
    
    const map = this.createMap();

    initAnims(this.anims);

    const layers = this.createLayers(map);
    const gameZones = this.getPlayerZones(layers.gameZones);
    const player = this.createPlayer(gameZones.start);
    const enemies = this.createEnemies(layers.enemySpawns, layers.platforms2);
    const collectables = this.createCollectables(layers.collectables);
    
    this.hud = new Hud(this, 0, 0);


    this.createPlayerColliders(player, {
      colliders: {
        platformColliders: layers.platforms2,
        projectiles: enemies.getProjectiles(),
        collectables
      }
    });

    this.createEnemyColliders(enemies, {
      colliders: {
        platformColliders: layers.platforms2,
        player
      }
    });

    this.createEndPoint(gameZones.end, player);
    this.setupCameraOn(player);
  }

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
    const environment = map.createLayer('environment', tileset2).setDepth(-2);
    const platforms2 = map.createLayer('platforms_collider', tileset1).setAlpha(0); // Collider layer for platforms/world objects
    const platforms = map.createLayer('platforms', tileset1);
    const gameZones = map.getObjectLayer('game_zones');
    const enemySpawns = map.getObjectLayer('enemy_spawns');
    const collectables = map.getObjectLayer('collectables');

    platforms2.setCollisionByExclusion(-1, true);

    return {
      platforms,
      environment,
      platforms2,
      gameZones,
      enemySpawns,
      collectables
    };
  }

  createCollectables(collectablesLayer) {
    const collectables = new Collectables(this).setDepth(-1);

    collectables.addFromLayer(collectablesLayer);

    collectables.playAnimation('diamond');

    return collectables;
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

  onCollect(player, collectable) {
    collectable.disableBody(true, true);
    this.score += collectable.score;
    this.hud.updateScoreBoard(this.score);
  }

  createPlayerColliders(player, { colliders }) {
    player
      .addCollider(colliders.platformColliders)
      .addCollider(colliders.projectiles, this.onHits)
      .addOverlap(colliders.collectables, this.onCollect, this);
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
      .addCollider(colliders.player, this.onPlayerCollision)
      .addCollider(colliders.player.projectiles, this.onHits)
      .addOverlap(colliders.player.meleeWeapon, this.onHits);
  }

  onHits(entity, source) {
    entity.takesHit(source);
  }

  onPlayerCollision(enemy, player) {
    player.takesHit(enemy);

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
    if (this.plotting) {
      const pointer = this.input.activePointer;
      this.line.x2 = pointer.worldX;
      this.line.y2 = pointer.worldY;
      this.graphics.clear();
      this.graphics.strokeLineShape(this.line);
    }

  }

}