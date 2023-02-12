export default anims => {

  anims.create({
    key: 'plant-idle',
    frames: anims.generateFrameNumbers('plant', {
      start: 0,
      end: 7,
    }),
    frameRate: 12,
    repeat: -1,
  });

  anims.create({
    key: 'plant-hurt',
    frames: anims.generateFrameNumbers('plant', {
      start: 8,
      end: 10,
    }),
    frameRate: 3,
    repeat: 0,
  });

};