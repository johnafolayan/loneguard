function clear (c) {
	c = c || ctx;
	c.clearRect(0, 0, W, H);
}

function circle (x, y, r, c, angle) {
	x = scaleX(x);
	y = scaleY(y);
	r *= SCALE;
	c = c || ctx;
	c.arc(x, y, r, 0, angle || angle360, false);
}

function line (x, y, x2, y2, fill) {
	x /= SCALE_X;
	y /= SCALE_Y;
	x2 /= SCALE_X;
	y2 /= SCALE_Y;
	ctx.save();
	ctx.fillStyle = fill || "white";
	ctx.lineWidth = 1.5 * SCALE;
	ctx.fillRect(x, y, x2 - x, y2 - y);
	ctx.restore();
}

function shadow(color, blur, c) {
	c = c || ctx;
	c.shadowColor = color;
	c.shadowBlur = blur;
}

function tmpCanvas (w, h, cb) {
	var canvas = document.createElement('canvas');
	canvas.width = w;
	canvas.height = h;
	cb(canvas.getContext('2d'), canvas);
	return canvas;
}

var cyberCanvas = function (opacity) {
		return tmpCanvas(100, 100, function (c) {
			/*c.fillStyle = "skyBlue";
			c.fillRect(0, 0, 100, 100)*/
			c.globalAlpha = opacity;
			c.strokeStyle = "rgba(30,50,220,.8)";

			c.lineWidth = 1;
			c.strokeRect(5, 5, 20, 20);
			c.strokeRect(40, 5, 1, 30);
			c.strokeRect(15, 36, 26, 1);
			c.strokeRect(15, 36, 1, 30);
			c.strokeRect(50, 50, 40, 1);
			c.strokeRect(70, 50, 1, 30);
			c.strokeRect(50, 70, 20, 1);
		})
	}