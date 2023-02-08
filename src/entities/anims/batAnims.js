export default anims => {

  anims.create({
    key: 'bat-idle',
    frames: anims.generateFrameNumbers('bat', {
      start: 0,
      end: 6,
    }),
    frameRate: 8,
    repeat: -1,
  });

  anims.create({
    key: 'bat-hurt',
    frames: [
      { key: 'bat-hit1' },
      { key: 'bat-hit2' },
      { key: 'bat-hit3' }
    ],
    frameRate: 6,
    repeat: 0
  });

};