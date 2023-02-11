export default anims => {

  // New player sprite
  anims.create({
    key: 'idle',
    frames: anims.generateFrameNumbers('player-normal-idle', {
      start: 0,
      end: 7,
    }),
    frameRate: 8,
    repeat: -1,
  });

  anims.create({
    key: 'run',
    frames: anims.generateFrameNumbers('player-normal-run', {
      start: 0,
      end: 7,
    }),
    frameRate: 8,
    repeat: -1,
  });

  anims.create({
    key: 'jump',
    frames: anims.generateFrameNumbers('player-normal-jump', {
      start: 0,
      end: 8,
    }),
    frameRate: 7,
    repeat: 0,
  });

  anims.create({
    key: 'sword',
    frames: anims.generateFrameNumbers('player-normal-swing', {
      start: 0,
      end: 2,
    }),
    frameRate: 12,
    repeat: 0,
  });

  anims.create({
    key: 'throw',
    frames: anims.generateFrameNumbers('player-normal-spell', {
      start: 0,
      end: 8,
    }),
    frameRate: 18,
    repeat: 0,
  });
};