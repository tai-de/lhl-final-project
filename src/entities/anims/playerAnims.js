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
    frames: [
      { key: 'player-throw1' },
      { key: 'player-throw2' },
      { key: 'player-throw3' },
      { key: 'player-throw4' },
      { key: 'player-throw5' },
      { key: 'player-throw6' },
      { key: 'player-throw7' },
    ],
    frameRate: 14,
    repeat: 0,
  })

};