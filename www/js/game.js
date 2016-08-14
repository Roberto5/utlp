utlp.Game = function(game){
};
 
utlp.Game.prototype = {
    create: function(){ 
      this.add.text(10, 10, 'this is a game', {fill: '#fff'});
        document.addEventListener("backbutton", onBackKeyDown);
    //this.game.input.on
    }
};
function onBackKeyDown(ev) {
    
    if (game.state.current=="Game") {
        game.state.start("Menu");
        return false;
    }
    else {
        navigator.app.exitApp();
    }
}