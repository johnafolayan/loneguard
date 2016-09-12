function Projectile (x, y, col) {
	this.x = x;
	this.y = y;
	this.r = 5;
	this.vx = 0;
	this.vy = 0;
	this.col = col;
	this.img = IMAGES["projectile"](col);
}

function shootProj(o, target) {
	var x = o.x + (o.vx * 6),
		y = o.y + (o.vy * 6);
	
	var p = new Projectile(x, y, o.col);
	resolveVelocities(p, target);
	projectiles.push(p);
}