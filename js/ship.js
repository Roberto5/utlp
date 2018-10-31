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
	    
	    this.room=this.add.sprite(0,0,'rooms','room1x1');
        
        this.door=this.add.sprite(0,-this.room.height/2,'rooms','door0');this.room.setScale(scale);
        //this.door.setOrigin(0.5,1);
        this.door.setScale(scale,scale*2);
        this.anims.create({ key: 'open', frames: this.anims.generateFrameNames('rooms',{prefix:'door',start:0,end:5}) });
        this.anims.create({ key: 'close', frames: this.anims.generateFrameNames('rooms',{prefix:'door',start:5,end:0}) });
        this.door.open=false;
        this.door.setInteractive();
        this.door.on('pointerdown',function(){
        	if (this.open) this.play('close');
        	else this.play('open');
        	this.open=!this.open;
        });
        this.ship=this.add.container(this.game.width/2,this.game.height/2,[this.room,this.door]);
        this.ship.setSize(100,100);
        this.ship.setScale(scale);
	    /*

    this.add.sprite(400, 300, 'gems').setScale(4).play('everything');*/
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