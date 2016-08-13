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
	preload : function() {
		this.time = new Date().getTime();
	},
	create : function() {
	},
	update : function() {
		t = new Date().getTime();
		t -= this.time;
		t1 = 6000;
		t2 = 11000;
		ta=2000;
		if (t < t1) {
			if (!this.l1) {
				this.logo = this.add.sprite(0, 0, 'five');
				this.logo.centerX = this.game.width / 2;
				this.logo.centerY = this.game.height / 2;
				this.l1 = true;
				this.textLogo = this.add.text(0, 0, 'FIVE', {
					fill : '#fff'
				});
				this.textLogo.centerX = this.game.width / 2;
				this.textLogo.centerY = this.game.height / 2 + 150;
			}
			alpha = t / ta;
			this.logo.alpha = alpha > 1 ? 1 : alpha;
			step=100;
			tb=1000;
			if ((t>tb)&&(t<tb+step)) this.textLogo.setText('F IVE');
			tb+=step;
			if ((t>tb)&&(t<tb+step)) this.textLogo.setText('Fi IVE');
			tb+=step;
			if ((t>tb)&&(t<tb+step)) this.textLogo.setText('Fiv IVE');
			tb+=step;
			if ((t>tb)&&(t<tb+step)) this.textLogo.setText('Five IVE');
			tb+=step;
			if ((t>tb)&&(t<tb+step)) this.textLogo.setText('Five I VE');
			tb+=step;
			if ((t>tb)&&(t<tb+step)) this.textLogo.setText('Five Is VE');
			tb+=step;
			if ((t>tb)&&(t<tb+step)) this.textLogo.setText('Five Is V E');
			tb+=step;
			if ((t>tb)&&(t<tb+step)) this.textLogo.setText('Five Is Ve E');
			tb+=step;
			if ((t>tb)&&(t<tb+step)) this.textLogo.setText('Five Is Ver E');
			tb+=step;
			if ((t>tb)&&(t<tb+step)) this.textLogo.setText('Five Is Very E');
			tb+=step;
			if ((t>tb)&&(t<tb+step)) this.textLogo.setText('Five Is Very El');
			tb+=step;
			if ((t>tb)&&(t<tb+step)) this.textLogo.setText('Five Is Very Ele');
			tb+=step;
			if ((t>tb)&&(t<tb+step)) this.textLogo.setText('Five Is Very Eleg');
			tb+=step;
			if ((t>tb)&&(t<tb+step)) this.textLogo.setText('Five Is Very Elega');
			tb+=step;
			if ((t>tb)&&(t<tb+step)) this.textLogo.setText('Five Is Very Elegan');
			tb+=step;
			if ((t>tb)&&(t<tb+step)) this.textLogo.setText('Five Is Very Elegant');
			this.textLogo.centerX = this.game.width / 2;
			this.textLogo.centerY = this.game.height / 2 + 150;
		}
		if ((t > t1) && (t < t2)) {
			if (!this.l2) {
				this.logo.kill();
				this.textLogo.setText('Build with Phaser engine');
				this.textLogo.centerX = this.game.width / 2;
				this.textLogo.centerY = this.game.height / 2 + 200;
				this.logoPhaser = this.add.sprite(0, 0, 'phaser');
				this.logoPhaser.centerX = this.game.width / 2;
				this.logoPhaser.centerY = this.game.height / 2;
				this.l2 = true;

			}
			alpha = (t - t1) / ta;
			this.logoPhaser.alpha = alpha > 1 ? 1 : alpha;
		}
		if (t > t2)
			this.state.start('Menu');
	}
};