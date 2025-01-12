ratio = 16 / 9;
var baseHeight = 800;
var border = 50;
var baseWidth = baseHeight * ratio;

var screenHeight = window.innerHeight-border;
var screenWidth = window.innerWidth-border;
var windowRatio = screenWidth / screenHeight;

var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: windowRatio > ratio ? screenHeight * ratio  : screenWidth,
        height: windowRatio > ratio ? screenHeight  : screenWidth / ratio 
    },
    backgroundColor: '#222',
    parent: 'game'
};

// Calcola il fattore di scala rispetto a un canvas con altezza 800 pixel e rapporto 16/9
var scale = config.scale.height / baseHeight;
var language = {};
var lang;

var game = new Phaser.Game(config);
game.scene.add('Boot', utlp.Boot);
game.scene.add('Preloader', utlp.Preloader);
game.scene.add('Logo', utlp.Logo);
game.scene.add('Menu', utlp.Menu);
game.scene.add('Game', utlp.Game);
game.scene.add('How', utlp.How);
game.scene.add('Intro', utlp.Intro);
game.scene.add('Shipyard', utlp.Shipyard);
game.scene.add('Map', utlp.Map);
game.scene.add('Ship', utlp.Ship);
game.scene.start('Boot');

window.addEventListener('load', function() {
    window.history.pushState({}, '');
});

window.addEventListener('popstate', function() {
    if (game.scene.isActive('Game')) {
        game.scene.stop('Game');
        game.scene.start('Menu');
    }
    if (game.scene.isActive('Shipyard')) {
        game.scene.stop('Shipyard');
        game.scene.start('Ship');
    }
    if (game.scene.isActive('Map')) {
        game.scene.stop('Map');
        game.scene.start('Ship');
    }
    if (game.scene.isActive('Intro')) {	
        if (confirm(lang.returnMenu)) {
            saveGame(game.data);
            game.scene.stop('Intro');
            game.scene.start('Menu');
        }
    }
    if (game.scene.isActive('Ship')) {	
        if (confirm(lang.returnMenu)) {
            saveGame(game.data);
            game.scene.stop('Ship');
            game.scene.start('Menu');
        }
    }
    if (!game.scene.isActive('Menu')) window.history.pushState({}, '');
});