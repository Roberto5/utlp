utlp.Preloader = function(game) {
	this.ready = false;
	/* for test progress bar
	this.date = new Date();
	this.time = 0;
	// */
};

utlp.Preloader.prototype = {
	preload : function() {
		//this.time = this.date.getTime();
		this.preloadLogo = this.add.sprite(0, 0, 'logo');
		this.preloadLogo.centerX = this.game.width / 2;
		this.preloadLogo.centerY = this.game.height / 2 - 50;
		this.preloadBar = this.add.sprite(0, 0, 'loader');
		this.preloadBar.centerX = this.game.width / 2;
		this.preloadBar.centerY = this.game.height / 2 + 50;
		this.preloadFrame = this.add.sprite(0, 0, 'loader-frame');
		this.preloadFrame.centerX = this.game.width / 2;
		this.preloadFrame.centerY = this.game.height / 2 + 50;

		this.load.setPreloadSprite(this.preloadBar);
		this.load.image('phaser', 'img/phaser.png');
		this.load.image('five', 'img/five.png');
		/* for test progress bar
		this.load.image('prova', 'http://it.chromaate.com/chroma/webdrive/products/6310a/6310a_4.jpg?' + Math.random(100));
		this.load.image('prova2', 'http://it.chromaate.com/chroma/webdrive/products/6310a/6310a_4.jpg?' + Math.random(100));
		// this.load.image('prova3','http://it.chromaate.com/chroma/webdrive/products/6310a/6310a_4.jpg?'+Math.random(100));
		// */
		this.load.onLoadComplete.add(this.loadComplete, this);
	},
	loadComplete : function() {
		this.ready = true;
	},
	update : function() {
		/*
		t = new Date().getTime() - this.time;
		if ((this.ready === true) && (t > 5000)) {// */
			this.state.start('Logo');
		//}
		//console.log(t);
	}
};
