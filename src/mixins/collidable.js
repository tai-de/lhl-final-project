export default {

  addCollider(otherObject, callback) {
    this.scene.physics.add.collider(this, otherObject, callback, null, this);
    return this;
  }

};