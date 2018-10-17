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
        this.ship=this.add.sprite(100,this.game.height/2,'ship');
        //this.ship.anchor.set(0.5);
        this.ship.y=this.game.height/2;
        //this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.title=this.add.text(10, 10, 'Until The Last Piece', {fill: '#fff'});
        this.title.setOrigin(0.5);
        this.title.x=this.game.width/2;
        
        this.jets = this.add.particles('jets');

        this.jets.createEmitter({
            //frame: 'jets',
            radial: false,
            x: -30,
            y: 20,
            lifespan: 1000,
            speedX: { min: -170, max: -200 },
            quantity: 4,
            gravityX:0,
            gravityY:0,
            follow:this.ship,
            scale: { start: 1, end: 0 , ease: 'Power3'},
            blendMode: 'ADD',
        });
        this.jets.createEmitter({
            //frame: 'jets',
            radial: false,
            x: -30,
            y: -20,
            lifespan: 1000,
            speedX: { min: -170, max: -200 },
            quantity: 4,
            gravityX:0,
            gravityY:0,
            follow:this.ship,
            scale: { start: 1, end: 0 , ease: 'Power3'},
            blendMode: 'ADD',
        });
        var d=50;
	var step=50;
        this.how=this.add.text(10, 10, 'How to play', {fill: '#fff'});
        this.how.setOrigin(1);
        this.how.x=this.game.width-20;
        this.how.y=this.game.height-d;
        this.how.inputEnabled=true;
        this.how.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.how.width, this.how.height), Phaser.Geom.Rectangle.Contains);
        this.how.on('pointerdown',how,this);
        d+=step;
        this.play=this.add.text(10, 10, 'Play', {fill: '#fff'});
        this.play.setOrigin(1);
        this.play.x=this.game.width-20;
        this.play.y=this.game.height-d;
        this.play.inputEnabled=true;
        this.play.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.how.width, this.how.height), Phaser.Geom.Rectangle.Contains);
        
        this.play.on('pointerdown',play,this);
        d+=step;
        this.fps=this.add.text(10,50,'fps',{fill:'#fff'});
        this.input.on('pointerdown',function(v){this.tap=true;},this);
        this.input.on('pointerdown',function(v){this.tap=false;},this);
    },
    update: function() {
    	
    	if (Math.abs(this.input.activePointer.worldY-this.ship.y)>10) {
    		if (this.ship.y<this.input.activePointer.worldY) this.ship.y+=this.speed; 
    		else this.ship.y-=this.speed; 
    	}
        /*if (this.physics.arcade.distanceToPointer(this.ship, this.input.activePointer) > 8) {
           	this.ship.body.velocity.set(0,300);
		this.game.physics.arcade.moveToPointer(this.ship,300);
            	//this.ship.x=100;
            if (this.tap) {
                //this.jets.lifespan=1000;
            }
            else {
                this.ship.x=100;
                //this.jets.lifespan=200;
            }
        }
        else this.ship.body.velocity.set(0);
        /*this.jets.emitX=this.ship.x;
        this.jets.emitY=this.ship.y;*/
        
        this.fps.setText('fps : '+Math.round(this.game.loop.actualFps) +" star : "+this.max);
        for (var i = 0; i < this.max; i++)
        {
        	
        	this.stars[i].active=true;
/*
        	if (this.stars[i].body!=null) this.stars[i].body.velocity.set(-this.speed,0);
        	else {
        		//this.game.physics.enable(this.stars[i], Phaser.Physics.ARCADE);
        	}
        	if (this.stars[i].x<0)
        	{
                this.stars[i].x = this.game.width;
                this.stars[i].y= Math.floor(Math.random() * this.game.height);
                
            }*/
            this.xx[i] -= this.speed;
            if (this.xx[i] < 0)
            {
                this.xx[i] = this.game.width;
                this.yy[i] = Math.floor(Math.random() * this.game.height);
                
            }
            this.stars[i].x=this.xx[i];
            this.stars[i].y=this.yy[i];
            
        }
        
    },
    resumed : function() {
    	
        this.game.state.restart();
    }
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