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
      end: 18,
    }),
    frameRate: 19,
    repeat: 0,
  });

  anims.create({
    key: 'eye',
    frames: anims.generateFrameNumbers('eye', {
      start: 0,
      end: 7,
    }),
    frameRate: 8,
    repeat: 0,
  });

  anims.create({
    key: 'diamond',
    frames: [
      { key: 'diamond1' },
      { key: 'diamond2' },
      { key: 'diamond3' },
      { key: 'diamond4' },
      { key: 'diamond5' },
      { key: 'diamond6' }
    ],
    frameRate: 5,
    repeat: -1,
  });

};