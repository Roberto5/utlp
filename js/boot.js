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
       this.game.height=this.game.canvas.clientHeight;
       this.game.width=this.game.canvas.clientWidth;
       document.getElementById("game").style.width = this.game.width + 10;
       document.getElementById("game").style.height = this.game.height+10;
       var preferredLanguage = navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || this.defaultLanguage;
       if (preferredLanguage === null) {
           this.languageCode = 'en';
  	   } else if (preferredLanguage.length > 2) {
           this.languageCode = preferredLanguage.substr(0, 2);
           // already valid and only 2 characters long
       } else {
           this.languageCode = preferredLanguage;
       }
       lang=language[this.languageCode];
      //this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
  },
  update: function(){
      this.scene.start('Preloader');
  }
};

