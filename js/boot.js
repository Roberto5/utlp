var utlp = {};
// prepare the asset for loader screeen
utlp.Boot = function(game){
};
 
utlp.Boot.prototype = {
   preload: function() {
       //this.load.image('loader', 'asset/img/loader.png');
       //this.load.image('loader-frame', 'asset/img/loader-frame.png');
       this.load.image('logo','asset/img/logo.png');
   },
  create: function(){
       this.game.scene.backgroundColor = '#000';
       this.game.height=this.game.canvas.clientHeight;
       this.game.width=this.game.canvas.clientWidth;
       document.getElementById("game").style.width = this.game.width + 10;
       document.getElementById("game").style.height = this.game.height+10;
       this.game.createSave=document.getElementById("createSave");
       this.game.createSave.style.width=200*scale;
       this.game.easyButton=document.getElementById("easy");
       this.game.normalButton=document.getElementById("normal");
       this.game.hardButton=document.getElementById("hard");
       this.game.sendButton=document.getElementById("button");
       this.game.difficulty=document.getElementById("diff");
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
       document.getElementById("displayName").textContent=lang.createSave;
       this.game.easyButton.textContent=lang.easy;
       this.game.normalButton.textContent=lang.normal;
       this.game.hardButton.textContent=lang.hard;
       document.getElementById("difficulty").textContent=lang.selectDiff;
       this.game.sendButton.textContent=lang.send;
      //this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
  },
  update: function(){
      this.scene.start('Preloader');
  }
};

