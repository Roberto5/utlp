utlp.Game = function(game){
};
 
utlp.Game.prototype = {
    create: function(){ 
      //this.add.text(10, 10, 'this is a game', {fill: '#fff'});
      this.back=this.add.text(this.game.width-20*scale,this.game.height-50*scale,lang.back, {fill: '#fff'});
      this.back.setOrigin(1);
      this.back.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.back.width, this.back.height), Phaser.Geom.Rectangle.Contains);
      this.back.setScale(scale);
      this.back.on('pointerdown',function(){
    	  game.scene.start('Menu');
    		game.scene.stop('Game');
      },this);
      this.input.keyboard.on('keydown', function (event) {
    	  if (event.keyCode==Phaser.Input.Keyboard.KeyCodes.ESC) {
    		 
    			  game.scene.start("Menu");
    			  game.scene.stop("Game");
    		  
    	  }
      });
      this.frame=this.add.graphics();
      this.frame.fillStyle(0x222222, 0.8);
      this.frame.fillRect(this.game.width/8,this.game.height/7,this.game.width*6/8,this.game.height*4/6);
      
      this.slot=new Array(3);
      this.slotText=new Array(3);
      for (var i=0;i<this.slot.length;i++) {
    	  this.slot[i]=this.add.graphics();
    	  this.slot[i].fillStyle(0x444444, 0.8);
    	  y=this.game.height/7+this.game.height*(1/24+i*1/24)+i*this.game.height*1/6;
    	  x=this.game.width/4+10;
    	  rect=new Phaser.Geom.Rectangle(x,y,this.game.width/2-20,this.game.height*1/6);
          this.slot[i].fillRectShape(rect);
          this.slot[i].setInteractive(rect,Phaser.Geom.Rectangle.Contains);
          save=localStorage.getItem("slot"+(i+1));
          this.slot[i].save=null;
          if (save==null) text=lang.empty;
          else {
        	  if (validateSave(save)) {
        		  this.slot[i].save=JSON.parse(save);
        		  time=new Date(this.slot[i].save.last);
        		  text=this.slot[i].save.playerName+" "+time.toLocaleString()+"\n"+this.slot[i].save.progress+"%";
        	  }
        	  else text=lang.empty;
          }
          this.slotText[i]=this.add.text(x+10*scale,y+10*scale,"slot 1 "+text,{fill: '#fff'});
          this.slotText[i].setScale(scale);
          this.slot[i].i=i;
          this.slot[i].on('pointerdown',loadGame);
      }
      
      for (var i=0;i<this.slotText.length;i++) {
    	  
    	  this.slotText[i].parentContainer=this.slot[i];
    	  
      }
    }
};
