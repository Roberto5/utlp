utlp.Game = function(game){
};
 
utlp.Game.prototype = {
    create: function(){ 
      this.add.text(10, 10, 'this is a game', {fill: '#fff'});
        document.addEventListener("backbutton", onBackKeyDown);
        esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    	esc.onDown.add(onBackKeyDown, this);
	this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.ESC);
    }
};
function onBackKeyDown(ev) {
        game.state.start("Menu");
}