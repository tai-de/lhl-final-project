export default anims => {

  anims.create({
    key: 'bat-idle',
    frames: anims.generateFrameNumbers('bat', {
      start: 0,
      end: 6,
    }),
    frameRate: 12,
    repeat: -1,
  });

  anims.create({
    key: 'bat-hurt',
    frames: anims.generateFrameNumbers('bat', {
      start: 7,
      end: 9,
    }),
    frameRate: 6,
    repeat: 0
  });

};