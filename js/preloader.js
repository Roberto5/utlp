utlp.Preloader = function(game) {
	this.ready = false;
	/* for test progress bar
	this.date = new Date();
	this.time = 0;
	// */
};

utlp.Preloader.prototype = {
	preload : function() {
		this.preloadLogo = this.add.sprite(0, 0, 'logo');
		this.preloadLogo.x = this.game.width / 2;
		this.preloadLogo.y = this.game.height / 2 - 50;
		this.centerBar = [this.game.width / 2,this.game.height / 2 + 50];
		this.preloadBar = this.add.graphics();
		this.dimBar=[200,50];
		this.preloadFrame = this.add.graphics();
		this.preloadFrame.fillStyle(0x222222, 0.8);
		this.preloadFrame.fillRect(this.centerBar[0]-this.dimBar[0]/2, this.centerBar[1]-this.dimBar[1]/2, this.dimBar[0], this.dimBar[1]);
		this.load.on('progress', function (value) {
		    console.log(value);
		    this.preloadBar.clear();
		    this.preloadBar.fillStyle(0xffffff, 1);
		    this.preloadBar.fillRect(this.centerBar[0]-this.dimBar[0]/2, this.centerBar[1]-this.dimBar[1]/2, this.dimBar[0] * value, this.dimBar[1]);
		},this);
		this.load.image('phaser', 'asset/img/phaser.png');
		this.load.image('five', 'asset/img/five.png');
        this.load.image('star', 'asset/img/star.png');
        this.load.image('ship', 'asset/img/ship.png');
        this.load.image('jets', 'asset/img/jets.png');
		/* for test progress bar*/
		/*this.load.image('prova', 'http://it.chromaate.com/chroma/webdrive/products/6310a/6310a_4.jpg?q=' + Math.random(100));
		this.load.image('prova2', 'http://it.chromaate.com/chroma/webdrive/products/6310a/6310a_4.jpg?' + Math.random(100));
		//*/
	},
	update : function() {
		this.scene.start('Logo');
	}
};
