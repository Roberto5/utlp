utlp.Menu = function(game){
};

utlp.Menu.prototype = {
    speed : 5,
    max : 100,
    xx : [],
    yy : [],
    stars:[],
    preload : function() {
        this.game.time.advancedTiming = true;
    },
    create: function(){
        document.removeEventListener("backbutton", onBackKeyDown);
        // star field
        this.sprites = this.game.add.spriteBatch();
	for (var i = 0; i < this.max; i++)
        {
            this.xx[i] =  Math.floor(Math.random() * this.game.width);
            this.yy[i] = Math.floor(Math.random() * this.game.height);
            var star=this.game.make.sprite(this.xx[i], this.yy[i], 'star');
            this.sprites.addChild(star);
            this.stars.push(star);
        }
        //ship
        this.ship=this.game.add.sprite(100,this.game.height/2,'ship');
        this.ship.anchor.set(0.5);
        this.ship.centerY=this.game.height/2;
        this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.title=this.add.text(10, 10, 'Until The Last Piece', {fill: '#fff'});
        this.title.centerX=this.game.width/2;
        var d=50;
	var step=50;
        /*this.how=this.add.text(10, 10, 'How to play', {fill: '#fff'});
        this.how.right=this.game.width-20;
        this.how.centerY=this.game.height-d;
        d+=step;*/
        this.play=this.add.text(10, 10, 'Play', {fill: '#fff'});
        this.play.right=this.game.width-20;
        this.play.centerY=this.game.height-d;
        this.play.inputEnabled=true;
        this.play.events.onInputDown.add(play,this);
        d+=step;
        this.fps=this.add.text(10,50,'fps',{fill:'#fff'});
    },
    update: function() {
        if (this.game.physics.arcade.distanceToPointer(this.ship, this.game.input.activePointer) > 8) {
           	this.ship.body.velocity.set(0,300);
		this.game.physics.arcade.moveToPointer(this.ship,300);
            	this.ship.x=100;
        }
        else this.ship.body.velocity.set(0);
        this.fps.setText('fps : '+this.game.time.fps+" star : "+this.max);
        for (var i = 0; i < this.max; i++)
        {
            
            this.xx[i] -= this.speed;
            if (this.xx[i] < 0)
            {
                this.xx[i] = this.game.width;
                this.yy[i] = Math.floor(Math.random() * this.game.height);
                
            }
            this.stars[i].x=this.xx[i];
                this.stars[i].y=this.yy[i];
        }
    }
};
function play(obj) {
    obj.game.state.start('Game');
}