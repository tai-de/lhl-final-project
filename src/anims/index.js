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

  anims.create({
    key: 'sword-attack-anim',
    frames: anims.generateFrameNumbers('swordsheet1', {
      start: 0,
      end: 2,
    }),
    frameRate: 10,
    repeat: 0,
  });

  anims.create({
    key: 'fireball',
    frames: anims.generateFrameNumbers('fireball', {
      start: 0,
      end: 8,
    }),
    frameRate: 5,
    repeat: -1,
  });

  anims.create({
    key: 'iceball',
    frames: [
      { key: 'iceball1' },
      { key: 'iceball2' }
    ],
    frameRate: 6,
    repeat: -1,
  });

  anims.create({
    key: 'bomb',
    frames: anims.generateFrameNumbers('bomb', {
      start: 0,
      end: 19,
    }),
    frameRate: 20,
    repeat: 0,
  });

  anims.create({
    key: 'eye',
    frames: anims.generateFrameNumbers('eye', {
      start: 0,
      end: 12,
    }),
    frameRate: 10,
    repeat: 0,
  });

  anims.create({
    key: 'gem-orange',
    frames: anims.generateFrameNumbers('gem-orange', {
      start: 0,
      end: 7,
    }),
    frameRate: 5,
    repeat: -1,
  });

  anims.create({
    key: 'gem-blue',
    frames: anims.generateFrameNumbers('gem-blue', {
      start: 0,
      end: 7,
    }),
    frameRate: 5,
    repeat: -1,
  });

  anims.create({
    key: 'gem-yellow',
    frames: anims.generateFrameNumbers('gem-yellow', {
      start: 0,
      end: 7,
    }),
    frameRate: 5,
    repeat: -1,
  });

  anims.create({
    key: 'gem-purple',
    frames: anims.generateFrameNumbers('gem-purple', {
      start: 0,
      end: 7,
    }),
    frameRate: 5,
    repeat: -1,
  });

  anims.create({
    key: 'gem-red',
    frames: anims.generateFrameNumbers('gem-red', {
      start: 0,
      end: 7,
    }),
    frameRate: 5,
    repeat: -1,
  });

  anims.create({
    key: 'gem-green',
    frames: anims.generateFrameNumbers('gem-green', {
      start: 0,
      end: 7,
    }),
    frameRate: 5,
    repeat: -1,
  });


};