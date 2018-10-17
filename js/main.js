var config = {
    type: Phaser.AUTO,
    width: 720,
    height: 480,
    parent:'game'
};
document.getElementById("game").style.width = '730';
document.getElementById("game").style.height = '480';

var game = new Phaser.Game(config);
    game.scene.add('Boot', utlp.Boot);
    game.scene.add('Preloader', utlp.Preloader);
    game.scene.add('Logo',utlp.Logo);
    game.scene.add('Menu',utlp.Menu);
    game.scene.add('Game', utlp.Game);
    game.scene.add('How',utlp.How);
    game.scene.start('Boot');
    game.height=480;
    game.width=720;