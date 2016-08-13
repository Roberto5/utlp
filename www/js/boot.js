var utlp = {};
// prepare the asset for loader screeen
utlp.Boot = function(game){
};
 
utlp.Boot.prototype = {
    /*init: function() {
            this.stage.disableVisibilityChange = true;
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            //this.scale.setScreenSize(true);
        //this.scale.startFullScreen();
        //this.scale.forceOrientation(true);
            this.scale.refresh();
        },*/
   preload: function() {
       this.load.image('loader', 'asset/img/loader.png');
       this.load.image('loader-frame', 'asset/img/loader-frame.png');
       this.load.image('logo','asset/img/logo.png');
   },
  create: function(){
       this.game.stage.backgroundColor = '#000';
      this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
      //this.scale.forceOrientation(false, true);
        //this.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
      //intel.xdk.device.setRotateOrientation("landscape");
      //intel.xdk.device.setAutoRotate(false);
     
     // screen.orientation.lock('landscape');
  },
  update: function(){
      this.state.start('Preloader');
  }
};

