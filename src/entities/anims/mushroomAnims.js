export default anims => {

  anims.create({
    key: 'mushroom-run',
    frames: anims.generateFrameNumbers('mushroom', {
      start: 0,
      end: 7,
    }),
    frameRate: 8,
    repeat: -1,
  });

  anims.create({
    key: 'mushroom-hurt',
    frames: anims.generateFrameNumbers('mushroom', {
      start: 8,
      end: 11,
    }),
    frameRate: 8,
    repeat: 0
  });

};