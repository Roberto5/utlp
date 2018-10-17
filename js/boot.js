var utlp = {};
// prepare the asset for loader screeen
utlp.Boot = function(game){
};
 
utlp.Boot.prototype = {
   preload: function() {
       this.load.image('loader', 'asset/img/loader.png');
       this.load.image('loader-frame', 'asset/img/loader-frame.png');
       this.load.image('logo','asset/img/logo.png');
   },
  create: function(){
       this.game.scene.backgroundColor = '#000';
      //this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
  },
  update: function(){
      this.scene.start('Preloader');
  }
};

