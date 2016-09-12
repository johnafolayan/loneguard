function Text (text, x, y, method, color, width, opacity, font) {
	color = color || "white";
	width *= SCALE;
	opacity = opacity || 1; 	
	if (opacity > 1) opacity = 1;
	else if (opacity < 0) opacity = o;
	ctx.save();
	ctx.translate(scaleX(x), scaleY(y));
	ctx.globalAlpha = opacity;
	ctx.lineWidth = width;
	if (font) ctx.font = font + "em Verdana";
	if (method === "s") {
		ctx.strokeStyle = color;
		ctx.strokeText(text, 0, 0);
	} else if (method === "f") {
		ctx.fillStyle = color;
		ctx.fillText(text, 0, 0);
	} else {
		ctx.strokeStyle = color[1];
		ctx.fillStyle = color[0];
		ctx.strokeText(text, 0, 0);
		ctx.fillText(text, 0, 0);
	}
	ctx.restore();
}