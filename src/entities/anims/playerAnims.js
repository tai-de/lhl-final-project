export default anims => {

  anims.create({
    key: 'idle',
    frames: anims.generateFrameNumbers('player', {
      start: 0,
      end: 8,
    }),
    frameRate: 8,
    repeat: -1,
  });

  anims.create({
    key: 'run',
    frames: anims.generateFrameNumbers('player', {
      start: 9,
      end: 16,
    }),
    frameRate: 8,
    repeat: -1,
  });

  anims.create({
    key: 'jump',
    frames: anims.generateFrameNumbers('player', {
      start: 18,
      end: 24,
    }),
    frameRate: 4,
    repeat: 0,
  });

  anims.create({
    key: 'throw',
    frames: anims.generateFrameNumbers('player-throw', {
      start: 0,
      end: 6,
    }),
    frameRate: 14,
    repeat: 0,
  });

};