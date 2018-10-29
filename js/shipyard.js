utlp.Shipyard = function(game){
};
 
utlp.Shipyard.prototype = {
    create: function(){ 
      
      this.input.keyboard.on('keydown', function (event) {
    	  if (event.keyCode==Phaser.Input.Keyboard.KeyCodes.ESC) {
    		  //@todo make confirm button
    		  if (confirm(lang.returnMenu)) {
    			  //@todo save game
    			  game.scene.start("Menu");
    			  game.scene.stop("Shipyard");
    		  }
    	  }
    	  console.log(event);
    	  event.preventDefault();
          event.stopImmediatePropagation();
      });
      window.onbeforeunload = function() {
          
      };
    }
};