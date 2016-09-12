//shows a loading sceeen
function boot () {
	ctx = gCtx;
	var COUNTDOWN = 200;
	var g = 0;
	var bt = setInterval(function () {
		clear();

		ctx.save();
		Text("Lone Guard", 295, 230, 'f', 'white', 2, 1, 1.3);
		
		//some game entities
		//ctx.scale(SCALE, SCALE);
		/*ctx.drawImage(IMAGES["antivirus"], scaleX(150), scaleY(60));
		ctx.drawImage(IMAGES["antivirus"], scaleX(100), scaleY(190));

		ctx.drawImage(IMAGES["virus"], scaleX(500), scaleY(100));
		ctx.drawImage(IMAGES["virus"], scaleX(430), scaleY(150));
		ctx.drawImage(IMAGES["virus"], scaleX(580), scaleY(210));

		ctx.drawImage(IMAGES["projectile"]("white"), scaleX(180), scaleY(210));
		ctx.drawImage(IMAGES["projectile"]("red"), scaleX(400), scaleY(150));*/

		g += 0.1;
		if (g >= randomInt(7, 9)) {
			g = 0;
			glitch(4);
		}
		ctx.restore();

		if (--COUNTDOWN < 0) {
			clear();
			clearInterval(bt);
			setTimeout(start, 500);
			tick();
		}
	}, 30);
}