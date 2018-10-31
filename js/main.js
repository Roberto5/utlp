ratio=16/9;
var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.DOM.FILL,
        width: window.innerHeight*ratio,
        height: window.innerHeight
    },
    backgroundColor:'#222',
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
    game.scene.add('Intro',utlp.Intro);
    game.scene.add('Shipyard',utlp.Shipyard);
    game.scene.add('Map',utlp.Map);
    game.scene.add('Ship',utlp.Ship);
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