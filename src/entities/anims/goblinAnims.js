export default anims => {

    anims.create({
      key: 'goblin-idle',
      frames: anims.generateFrameNumbers('goblin', {
        start: 0,
        end: 7,
      }),
      frameRate: 8,
      repeat: -1,
    });
  
    anims.create({
      key: 'goblin-hurt',
      frames: anims.generateFrameNumbers('goblin', {
        start: 8,
        end: 11,
      }),
      frameRate: 10,
      repeat: 0
    });
  
  };