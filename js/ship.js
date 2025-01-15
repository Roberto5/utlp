utlp.Ship = function(game){
};
 
utlp.Ship.prototype = {
	speed : 5,
	max : 100,
	xx : [],
	yy : [],
	stars:[],
    create: function(){
    	this.game.scene.backgroundColor = '#555';
    	this.stars=[];
	    for (var i = 0; i < this.max; i++)
	    {
	    	this.xx[i] =  Math.floor(Math.random() * this.game.width);
	    	this.yy[i] = Math.floor(Math.random() * this.game.height);
	    	var star=this.add.sprite(this.xx[i], this.yy[i], 'star');
	    	this.stars.push(star);
	    }
		soundOfSilence.scene=this;
	    this.ship=new Starship(soundOfSilence);
	    this.anims.create({ key: 'open', frames: this.anims.generateFrameNames('rooms',{prefix:'door',start:0,end:5}) });
        this.anims.create({ key: 'close', frames: this.anims.generateFrameNames('rooms',{prefix:'door',start:5,end:0}) });
	    this.ship.render(this).setScale(scale);
	    /*this.room=this.add.sprite(0,0,'rooms','room2x1');
	    //this.room.setScale(scale);
        
        this.door=this.add.sprite(0,-this.room.height/2,'rooms','door0');
        //this.door.setOrigin(0.5,1);
        //this.door.setScale(scale);
        
        this.door.open=false;
        this.door.setInteractive(new Phaser.Geom.Rectangle(0, -this.door.height, this.door.width, this.door.height*3), Phaser.Geom.Rectangle.Contains);
        this.door.on('pointerdown',function(){
        	if (this.open) this.play('close');
        	else this.play('open');
        	this.open=!this.open;
        });
        this.ship=this.add.container(this.game.width/2,this.game.height/2,[this.room,this.door]);
        this.ship.setSize(100,100);
        */
    },
	update:function() {
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
	}
};