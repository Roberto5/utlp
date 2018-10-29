utlp.How = function(game){
};

utlp.How.prototype = {
		preload : function() {
			
		},
		create: function(){
			this.title=this.add.text(10, 10, 'How TO Play', {fill: '#fff'});
	        this.title.centerX=this.game.width/2;
	        this.back=this.add.text(this.game.width-20*scale,this.game.height-50*scale,lang.back, {fill: '#fff'});
	        this.back.setOrigin(1);
	        this.back.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.back.width, this.back.height), Phaser.Geom.Rectangle.Contains);
	        this.back.setScale(scale);
	        this.back.on('pointerdown',back,this);
		},
		update: function() {
			
		}
};
function back(obj){
	
	this.game.scene.start('Menu');
	this.game.scene.stop('How');
}