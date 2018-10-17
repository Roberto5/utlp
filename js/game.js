utlp.Game = function(game){
};
 
utlp.Game.prototype = {
    create: function(){ 
      this.add.text(10, 10, 'this is a game', {fill: '#fff'});
      
      

      this.input.keyboard.on('keydown', function (event) {
    	  if (event.keyCode==Phaser.Input.Keyboard.KeyCodes.ESC) {
    		  game.scene.start("Menu");
    		  game.scene.stop("Game");
    	  }
      });
       /* document.addEventListener("backbutton", onBackKeyDown);
        esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    	esc.onDown.add(onBackKeyDown, this);
	this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.ESC);-*/
    }
};
