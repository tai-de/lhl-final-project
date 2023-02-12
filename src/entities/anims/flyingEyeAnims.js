export default anims => {

    anims.create({
      key: 'flying-eye-idle',
      frames: anims.generateFrameNumbers('flying-eye', {
        start: 0,
        end: 7,
      }),
      frameRate: 8,
      repeat: -1,
    });
  
    anims.create({
      key: 'flying-eye-hurt',
      frames: anims.generateFrameNumbers('flying-eye', {
        start: 8,
        end: 11,
      }),
      frameRate: 10,
      repeat: 0
    });
  
  };