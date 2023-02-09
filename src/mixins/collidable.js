export default {

  /**
   * Mixin method to add a collider with the target Phaser Game Object.
   * The optional second param is a callback that will be executed when
   * the collider is triggered. 
   * @param {object} Phaser_GameObject 
   * @param {function} callback 
   * @returns 
   */
  addCollider(otherObject, callback) {
    this.scene.physics.add.collider(this, otherObject, callback, null, this);
    return this;
  },

  /**
   * Mixin method to add an overlap with the target Phaser Game Object.
   * The optional second param is a callback that will be executed when
   * the overlap is triggered. An optional third param is the context
   * of the overlap.
   * @param {object} Phaser_GameObject 
   * @param {function} callback 
   * @param {object} context Phaser Scene context
   * @returns 
   */
  addOverlap(otherObject, callback, context) {
    this.scene.physics.add.overlap(this, otherObject, callback, null, context || this);
    return this;
  },

  bodyPositionDiffX: 0,
  prevRay: null,
  prevHasHit: null,

  /**
   * Mixin method to create raycasting lines on Enemy instances
   * to track interactions between itself and the platform colliders
   * @param {object} body Enemy body instance
   * @param {object} layer Platform colliders layer
   * @param {number} rayLength Distance for the raycasting to detect
   * @param {number} precision Precision factor (not implemented)
   * @returns 
   */
  rayCast(body, layer, rayLength = 50, precision) {
    const { x, y, width, halfHeight } = body;

    this.bodyPositionDiffX += body.x - body.prev.x;

    if ((Math.abs(this.bodyPositionDiffX) <= precision) && this.prevHasHit !== null) {
      return {
        ray: this.prevRay,
        hasHit: this.prevHasHit
      };
    }


    const line = new Phaser.Geom.Line();
    let hasHits = false;

    switch (body.facing) {
      case Phaser.Physics.Arcade.FACING_RIGHT:
        line.x1 = x + width;
        line.y1 = y + halfHeight;
        line.x2 = line.x1 + rayLength;
        line.y2 = line.y1 + rayLength;
        break;

      case Phaser.Physics.Arcade.FACING_LEFT:
        line.x1 = x;
        line.y1 = y + halfHeight;
        line.x2 = line.x1 - rayLength;
        line.y2 = line.y1 + rayLength;
        break;
    }

    const hits = layer.getTilesWithinShape(line);

    if (hits.length > 0) {
      hasHits = this.prevHasHit = hits.some(hit => hit.index !== -1);
    }

    this.prevRay = line;
    this.bodyPositionDiffX = 0;

    return { ray: line, hasHits };
  }

};