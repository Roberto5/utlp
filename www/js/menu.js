utlp.Menu = function(game){
};

utlp.Menu.prototype = {
    create: function(){
        document.removeEventListener("backbutton", onBackKeyDown);
        this.title=this.add.text(10, 10, 'Until The Last Piece', {fill: '#fff'});
        this.title.centerX=this.game.width/2;
        d=50;
        step=50;
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
    },
    update: function() {
        
    }
};
function play(obj) {
    obj.game.state.start('Game');
}