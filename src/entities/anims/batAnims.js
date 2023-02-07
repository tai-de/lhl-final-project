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

};