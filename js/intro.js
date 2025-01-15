utlp.Intro = function(game){
};
 
utlp.Intro.prototype = {
	preload :function (){
		if (this.game.data.progress>0) {
			this.game.scene.stop('Intro');
			this.game.scene.start('Ship');
		}
	},
    create: function(){ 
		if (this.game.data.progress>0) {
			this.game.scene.stop('Intro');
			this.game.scene.start('Ship');
		}
    	this.state=0;
    	this.t=new Date().getTime();
    	this.textIntro=this.add.text(50*scale,20*scale,"",{fill : '#fff'});
    	this.textIntro.setScale(scale);
		this.textIntro.setOrigin(0);
		this.text='"';
		switch (this.game.data.difficulty) {
			case "1" : this.text+=lang.easy;break;
			case "2" : this.text+=lang.normal;break;
			case "3" : this.text+=lang.hard;break;
		}
		this.text+=" "+this.game.data.playerName+", "+lang.intro1;
		this.leave=this.add.text(50*scale,this.game.height-150*scale,lang.leave,{fill : '#080'});
		this.leave.setScale(scale);
		this.leave.setOrigin(0);
		this.leave.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.leave.width, this.leave.height), Phaser.Geom.Rectangle.Contains);
		this.leave.visible=false;
		this.leave.on('pointerover',function(){
			this.setFill('#0f0');
		});
		this.leave.on('pointerout',function(){
			this.setFill('#080');
		});
		this.leave.on('pointerdown',function(){
			this.text=lang.intro2;
			this.t=new Date().getTime();
			this.leave.setText(lang.intro3);
			this.noskip=true;
			this.state=1;
			this.stay.visible=false;
			this.leave.on('pointerdown',function(){
				game.data.progress=1;
				saveGame(game.data);
				game.scene.start("Ship");
    			  game.scene.stop("Intro");
			},this);
		},this);
		this.stay=this.add.text(50*scale,this.game.height-100*scale,lang.stay,{fill : '#080'});
		this.stay.setScale(scale);
		this.stay.setOrigin(0);
		this.stay.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.stay.width, this.stay.height), Phaser.Geom.Rectangle.Contains);
		this.stay.visible=false;
		this.stay.on('pointerover',function(){
			this.setFill('#0f0');
		});
		this.stay.on('pointerout',function(){
			this.setFill('#080');
		});
		this.stay.on('pointerdown',stay,this);
		this.skip=this.add.text(this.game.width-10*scale,this.game.height-10*scale,lang.skip,{fill : '#fff'});
		this.skip.setScale(scale);
		this.skip.setOrigin(1);
		this.skip.visible=false;
		this.ts=0;
    	this.input.keyboard.on('keydown', function (event) {
      	  if (event.keyCode==Phaser.Input.Keyboard.KeyCodes.ESC) {
      		 if (confirm(lang.returnMenu)) {
      			saveGame(game.data);
      			  game.scene.start("Menu");
      			  game.scene.stop("Intro");
      		 }
      	  }
      	  if (event.keyCode==Phaser.Input.Keyboard.KeyCodes.ENTER) { //skip press enter
      		game.scene.start("shipyard");
			  game.scene.stop("Intro");
      	  }
        });
    	this.input.on("pointerdown",function() {
    		if (this.noskip) this.noskip=false;
    		else {
    			this.t-=8000;
        		this.skip.visible=true;
        		this.ts=new Date().getTime();
    		}
    		
    	},this);
    	
    },
	update : function() {
		this.delay=25;
		t=new Date().getTime();
		if (t-this.ts>3000) this.skip.visible=false;
		t-=this.t;
		this.textIntro.setText(typeInAnimation(this.text,t,this.delay));
		if (t>this.text.length*this.delay) {
			if (this.state!=1) this.stay.visible=true;
			if (this.state!=2) this.leave.visible=true;
		}
	}
};
function stay() {
	this.text=lang.introEsterEgg;
	this.t=new Date().getTime();
	this.stay.setText(lang.retry);
	this.noskip=true;
	this.state=2;
	this.leave.visible=false;
	this.stay.on('pointerdown',function(){
		this.state=0;
		this.text='"';
		switch (game.data.difficulty) {
			case "1" : this.text+=lang.easy;break;
			case "2" : this.text+=lang.normal;break;
			case "3" : this.text+=lang.hard;break;
		}
		this.text+=" "+game.data.playerName+", "+lang.intro1;
		this.stay.setText(lang.stay);
		this.leave.visible=false;
		this.stay.visible=false;
		this.stay.on('pointerdown',stay,this);
	},this);
}