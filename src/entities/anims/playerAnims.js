export default anims => {

  // New player sprite
  anims.create({
    key: 'normal-idle',
    frames: anims.generateFrameNumbers('player-normal-idle', {
      start: 0,
      end: 7,
    }),
    frameRate: 8,
    repeat: -1,
  });

  anims.create({
    key: 'normal-run',
    frames: anims.generateFrameNumbers('player-normal-run', {
      start: 0,
      end: 7,
    }),
    frameRate: 8,
    repeat: -1,
  });

  anims.create({
    key: 'normal-jump',
    frames: anims.generateFrameNumbers('player-normal-jump', {
      start: 0,
      end: 8,
    }),
    frameRate: 7,
    repeat: 0,
  });

  anims.create({
    key: 'normal-sword',
    frames: anims.generateFrameNumbers('player-normal-swing', {
      start: 0,
      end: 2,
    }),
    frameRate: 12,
    repeat: 0,
  });

  anims.create({
    key: 'normal-throw',
    frames: anims.generateFrameNumbers('player-normal-spell', {
      start: 0,
      end: 8,
    }),
    frameRate: 18,
    repeat: 0,
  });

    // Fire sword player sprite
    anims.create({
      key: 'fire-idle',
      frames: anims.generateFrameNumbers('player-fire-idle', {
        start: 0,
        end: 7,
      }),
      frameRate: 8,
      repeat: -1,
    });
  
    anims.create({
      key: 'fire-run',
      frames: anims.generateFrameNumbers('player-fire-run', {
        start: 0,
        end: 7,
      }),
      frameRate: 8,
      repeat: -1,
    });
  
    anims.create({
      key: 'fire-jump',
      frames: anims.generateFrameNumbers('player-fire-jump', {
        start: 0,
        end: 8,
      }),
      frameRate: 7,
      repeat: 0,
    });
  
    anims.create({
      key: 'fire-sword',
      frames: anims.generateFrameNumbers('player-fire-swing', {
        start: 0,
        end: 2,
      }),
      frameRate: 12,
      repeat: 0,
    });
  
    anims.create({
      key: 'fire-throw',
      frames: anims.generateFrameNumbers('player-fire-spell', {
        start: 0,
        end: 8,
      }),
      frameRate: 18,
      repeat: 0,
    });
};