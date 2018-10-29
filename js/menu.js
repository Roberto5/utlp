utlp.Menu = function(game){
};

utlp.Menu.prototype = {
    speed : 5,
    max : 100,
    xx : [],
    yy : [],
    stars:[],
    jets:{},
    preload : function() {
        //this.game.time.advancedTiming = true;
    },
    create: function(){
    	
        //document.removeEventListener("backbutton", onBackKeyDown);
        // star field
        //this.sprites = this.game.add.spriteBatch();
    	this.stars=[];
	       for (var i = 0; i < this.max; i++)
        {
            this.xx[i] =  Math.floor(Math.random() * this.game.width);
            this.yy[i] = Math.floor(Math.random() * this.game.height);
            var star=this.add.sprite(this.xx[i], this.yy[i], 'star');
            //this.sprites.addChild(star);
            //this.game.physics.enable(star, Phaser.Physics.ARCADE);
            this.stars.push(star);
        }
        //ship
        this.ship=this.add.sprite(100*scale,this.game.height/2,'ship');
        //this.ship.anchor.set(0.5);
        this.ship.y=this.game.height/2;
        this.ship.setScale(scale);
        //this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.title=this.add.text(this.game.width/2, 10*scale, 'Until The Last Piece', {fill: '#fff'});
        this.title.setOrigin(0.5);
        this.title.setScale(scale);
        this.jets = this.add.particles('jets');
        this.jets.createEmitter({
            //frame: 'jets',
            radial: false,
            x: -30*scale,
            y: 20*scale,
            lifespan: 1000,
            speedX: { min: -150*scale, max: -200*scale },
            quantity: 4,
            gravityX:0,
            gravityY:0,
            follow:this.ship,
            scale: { start: 1*scale, end: 0 , ease: 'Power3'},
            blendMode: 'ADD',
        });
        this.jets.createEmitter({
            //frame: 'jets',
            radial: false,
            x: -30*scale,
            y: -20*scale,
            lifespan: 1000,
            speedX: { min: -150*scale, max: -200*scale },
            quantity: 4,
            gravityX:0,
            gravityY:0,
            follow:this.ship,
            scale: { start: 1*scale, end: 0 , ease: 'Power3'},
            blendMode: 'ADD',
        });
        var d=50*scale;
	var step=50*scale;
        this.how=this.add.text(this.game.width-20*scale, this.game.height-d, lang.how, {fill: '#fff'});
        this.how.setOrigin(1);
        this.how.inputEnabled=true;
        this.how.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.how.width, this.how.height), Phaser.Geom.Rectangle.Contains);
        this.how.on('pointerdown',how,this);
        this.how.setScale(scale);
        d+=step;
        this.play=this.add.text(this.game.width-20*scale, this.game.height-d, lang.play, {fill: '#fff'});
        this.play.setOrigin(1);
        this.play.inputEnabled=true;
        this.play.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.how.width, this.how.height), Phaser.Geom.Rectangle.Contains);
        this.play.setScale(scale);
        this.play.on('pointerdown',play,this);
        d+=step;
        this.fps=this.add.text(10,50,'fps',{fill:'#fff'});
        // @todo this.tap unuse, mabie in the future will be use?
        this.input.on('pointerdown',function(v){this.tap=true;},this);
        this.input.on('pointerdown',function(v){this.tap=false;},this);
    },
    update: function() {
    	
    	if (Math.abs(this.input.activePointer.worldY-this.ship.y)>10) {
    		if (this.ship.y<this.input.activePointer.worldY) this.ship.y+=this.speed*scale; 
    		else this.ship.y-=this.speed; 
    	}
        this.fps.setText('fps : '+Math.round(this.game.loop.actualFps) +" star : "+this.max);
        for (var i = 0; i < this.max; i++)
        {
        	this.stars[i].active=true;
            this.xx[i] -= this.speed*scale;
            if (this.xx[i] < 0)
            {
                this.xx[i] = this.game.width;
                this.yy[i] = Math.floor(Math.random() * this.game.height);
            }
            this.stars[i].x=this.xx[i];
            this.stars[i].y=this.yy[i];
            
        }
        
    },
   /* resumed : function() {
    	
        this.game.state.restart();
    }*/
};
function how(obj) {
	this.tap=false;
	this.game.scene.start('How');
	this.game.scene.stop('Menu');
}
function play(obj) {
	this.tap=false;
	this.game.scene.start('Game');
	this.game.scene.stop('Menu');
}