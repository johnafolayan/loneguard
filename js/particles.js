function Particle (x, y) {
	this.x = x;
	this.y = y;
	this.r = 30;
	this.vx = 0;
	this.vy = 0;
	this.scale = 1;
	this.scaleSpeed = 0.015;
}

function emitParticles(x, y, count) {
	var angle = randomInt(10, 30);
	for (i = 0; i < 360; i += Math.floor(360/count)) {
		var particle = new Particle(x, y);
		angle = i + Math.random() * angle;
		particle.vx = Math.cos(angle * Math.PI/180);
		particle.vy = Math.sin(angle * Math.PI/180);
		particles.push(particle);
	}
}