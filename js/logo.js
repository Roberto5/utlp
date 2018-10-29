/**
 * @class Phaser.state
 * @param {Phaser.Game}
 *            game
 */
utlp.Logo = function(game) {
};
utlp.Logo.prototype = {
	l1 : false,
	l2 : false,
    skip:0,
	preload : function() {
		this.time = new Date().getTime();//this.game.time.totalElapsedSeconds()*1000;//
	},
	create : function() {
        this.input.on('pointerdown',skipLogo,this);
	},
	update : function() {
		t = new Date().getTime();//this.game.time.totalElapsedSeconds()*1000;
		t -= this.time;
		t1 = 6000;
		t2 = 11000;
		ta=2000;
        switch (this.skip) {
            case 1:t+=t1;break;
            case 2:t+=t2;
        }
		if (t < t1) {
			if (!this.l1) {
				this.logo = this.add.sprite(0, 0, 'five');
				this.logo.setScale(scale);
				this.logo.x = this.game.width / 2;
				this.logo.y = this.game.height / 2;
				this.l1 = true;
				this.textLogo = this.add.text(0, 0, 'FIVE', {
					fill : '#fff'
				});
				this.textLogo.setScale(scale);
				this.textLogo.setOrigin(0.5);
				this.textLogo.x = this.game.width / 2;
				this.textLogo.y = this.game.height / 2 + 150*scale;
			}
			alpha = t / ta;
			this.logo.alpha = alpha > 1 ? 1 : alpha;
            this.textLogo.setText(typeInAcronym(['Five','Is','Very','Elegant'],t-1000));
			this.textLogo.x = this.game.width / 2;
			this.textLogo.y = this.game.height / 2 + 150*scale;
		}
		if ((t > t1) && (t < t2)) {
			if (!this.l2) {
				//this.logo.kill();
				this.logo.visible=false;
				this.textLogo.setText(typeInAnimation('Build with Phaser engine',t-t1));
				this.textLogo.x = this.game.width / 2;
				this.textLogo.y = this.game.height / 2 + 200*scale;
				this.logoPhaser = this.add.sprite(0, 0, 'phaser');
				this.logoPhaser.setScale(scale);
				this.logoPhaser.setOrigin(0.5);
				this.logoPhaser.x = this.game.width / 2;
				this.logoPhaser.y = this.game.height / 2;
				this.l2 = true;

			}
            this.textLogo.setText(typeInAnimation('Build with Phaser engine',t-t1));
            this.textLogo.x = this.game.width / 2;
				this.textLogo.y = this.game.height / 2 + 200*scale;
			alpha = (t - t1) / ta;
			this.logoPhaser.alpha = alpha > 1 ? 1 : alpha;
		}
		if (t > t2)
			this.scene.start('Menu');
	}
};

function skipLogo() {
    utlp.Logo.prototype.skip++;
}