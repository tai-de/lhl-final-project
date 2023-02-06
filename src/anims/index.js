export default anims => {

  anims.create({
    key: 'player-idle',
    frames: [
      { key: 'player1' },
      { key: 'player2' },
      { key: 'player3' },
      { key: 'player4' },
      { key: 'player5' },
      { key: 'player6' },
      { key: 'player7' },
      { key: 'player8' },
      { key: 'player9' }
    ],
    frameRate: 8,
    repeat: -1,
  });

  anims.create({
    key: 'player-run',
    frames: [
      { key: 'player-run1' },
      { key: 'player-run2' },
      { key: 'player-run3' },
      { key: 'player-run4' },
      { key: 'player-run5' },
      { key: 'player-run6' },
      { key: 'player-run7' },
      { key: 'player-run8' },
    ],
    frameRate: 8,
    repeat: -1,
  });


  anims.create({
    key: 'player-jump',
    frames: [
      { key: 'player-jump-start1' },
      { key: 'player-jump-start2' },
      { key: 'player-jump-mid1' },
      { key: 'player-jump-mid2' },
      { key: 'player-jump-mid3' },
      { key: 'player-jump-mid4' },
      { key: 'player-jump-land' }
    ],
    frameRate: 4,
    repeat: 0,
  });
};