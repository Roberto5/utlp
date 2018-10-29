ratio=16/9;
var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.DOM.FILL,
        width: window.innerHeight*ratio,
        height: window.innerHeight
    },
    parent:'game'
};
// 800:50=h:x   x=y*h/800
var scale= window.innerHeight*ratio/800;
var language= {};
var lang;

var game = new Phaser.Game(config);
    game.scene.add('Boot', utlp.Boot);
    game.scene.add('Preloader', utlp.Preloader);
    game.scene.add('Logo',utlp.Logo);
    game.scene.add('Menu',utlp.Menu);
    game.scene.add('Game', utlp.Game);
    game.scene.add('How',utlp.How);
    game.scene.add('Shipyard',utlp.Shipyard);
    game.scene.start('Boot');
    
