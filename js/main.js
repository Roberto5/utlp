var game = new Phaser.Game(800, 600, Phaser.AUTO);
    game.state.add('Boot', utlp.Boot);
    game.state.add('Preloader', utlp.Preloader);
    game.state.add('Logo',utlp.Logo);
    game.state.add('Menu',utlp.Menu);
    game.state.add('Game', utlp.Game);
    game.state.start('Boot');

