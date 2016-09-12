function aiSmart() {
	return (aiQ+Math.random() > aiQ+(CUSTOMER*Math.random())/CUSTOMER);
}
function aiLogic (o) {
	if (GAME_OVER) o.target = null;
	var x = o.x,
		y = o.y,
		attackers = o.attackers,
		atkLen = attackers.length,
		target = o.target;
	
	if (--o.wait <= 0) {
		if (o.col == "white"){
			target = Math.random() > .5 ? randomVirus() : attackers[randomInt(0, atkLen)];
			if (!target) {
				var v = randomVirus();
				v = v ? v : {x: randomInt(0, W), y: randomInt(0, H)};
				target = {x: randomInt(v.x-50, v.x+50), y: randomInt(v.y-50, v.y+50)}
			}
		} else {
			var options = [{x: randomInt(x-100, x+100), y: randomInt(y-100, y+100)}, (player.alive ? player : backup[randomInt(0, backup.length)]), attackers[randomInt(0, atkLen)]];
			target = options[randomInt(0, 3)];
		}
	
		if (!!target) {
			o.target = target;
			var data = resolveVelocities(o, target);
			o.vx *= .2;
			o.vy *= .2;
		
			o.wait = randomInt(50, (100/aiQ < 90 ? 90 : 100/aiQ));
		
			if (!target.col) return;
			target.attackers.push(o);
			if (data.dx < W*0.15 && data.dy < H*0.15) {
				//if in close range
				aiShoot(o);
			} else if (aiSmart()) aiShoot(o);
		}
	}
}

function aiShoot (o) {
	if (STARTED) {
		shootProj(o, o.target);
		o.vx *= 0.1;
		o.vy *= 0.1;
		//if lucky
		if (aiSmart()) o.target.wait = 0;
		o.target = 0;
		play("shoot");
	}
}

function playerShoot () {
	//to prevent the player from shooting continuously
	if (lastShot >= 25) {
		var o = player;
		var t = o.target;
		shootProj(o, t);
		o.vx *= 0.1;
		o.vy *= 0.1;
		
		lastShot = 5;
		play("shoot");
	}
}