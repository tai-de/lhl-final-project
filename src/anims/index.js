export default anims => {

  anims.create({
    key: 'hit-effect',
    frames: anims.generateFrameNumbers('hitsheet1', {
      start: 0,
      end: 4,
    }),
    frameRate: 10,
    repeat: 0,
  });

};