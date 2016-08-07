var utlp = {};
// prepare the asset for loader screeen
utlp.Boot = function(game){
};
 
utlp.Boot.prototype = {
   preload: function() {
       this.load.image('loader', 'img/loader.png');
       this.load.image('loader-frame', 'img/loader-frame.png');
       this.load.image('logo','img/logo.png');
   },
  create: function(){
       this.game.stage.backgroundColor = '#000';
  },
  update: function(){
      this.state.start('Preloader');
  }
};

