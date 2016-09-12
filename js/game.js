//game loop




function tick () {
	t = new Date().getTime();
	if (!last) last = t;
	if (canStart) {
		if (STARTED) update();
		render();
	}
	rAF(tick);
}

//update function
function update () {
	dt = dt + Math.min(1, (t - last)/1000);
	while (dt >= dstep) {
		updateViruses();
		updatePlayer();
		updateParticles();
		updateCollisions();
		updatePositions();
		dt -= dstep;
	}
	last = t;
}

//render function
function render () {
	//take care of UI
	ctx = uiCtx;
	ctx.save();
	drawGameUI();
	ctx.restore();
	
	//game rendering 
	ctx = gCtx;
	clear();
	if (GAME) drawGame();
	else if (MENU) {
		ctx.fillStyle = ctx.createPattern(cyberCanvas(.6), "repeat");
		ctx.fillRect(0,0,W,H);
		drawCircles(backup);
	}
}

function drawGame () {
	clear();
	ctx.save(); 
	
	//background
	ctx.fillStyle = ctx.createPattern(cyberCanvas((bgO = (bgO + 0.009)%1)), "repeat");
	ctx.fillRect(0,0,W,H)

	//draw hotspots
	//Destroy
	ctx.strokeStyle = "rgba(255,255,255,0.6)";
	ctx.fillStyle = "rgba(0,0,0,0.5)";
	ctx.beginPath();
	circle(350, 250, 80);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	//Backup
	ctx.beginPath();
	circle(0, 500, 80);
	ctx.stroke();
	ctx.fill();
	ctx.beginPath();
	circle(700, 500, 80);
	ctx.stroke();
	ctx.fill();
	//Recharge
	ctx.beginPath();
	circle(0, 0, 80);
	ctx.stroke();
	ctx.fill();
	ctx.beginPath();
	circle(700, 0, 80);
	ctx.stroke();
	ctx.fill();

	drawCircles(viruses, backup);
	drawProjectiles();
	drawParticles();
	ctx.restore();
}

function drawCircle(o) {
	ctx.save();
	ctx.translate(scaleX(o.x), scaleY(o.y));
	if (o.rotation) ctx.rotate(o.rotation);
	ctx.beginPath();
	ctx.strokeStyle = o.col;
	ctx.lineWidth = 3*SCALE;
	shadow(o.col, 10);
	circle(0, 0, o.r);
	ctx.stroke();
	ctx.closePath();
	ctx.strokeRect(-1, -1, 1, 1);
	ctx.restore();
}


function drawCircles () {
	var args = arguments;
	for (i = 0; i < args.length; i++) {
		o = args[i];
		for (j = 0; j < o.length; j++) {
			drawCircle(o[j]);
		}
	}
	if (player.alive) drawCircle(player);
	if (player.target) {
		ctx.save();
		ctx.translate(scaleX(player.target.x), scaleY(player.target.y));
		ctx.rotate(targetAngle*(Math.PI/180));
		ctx.drawImage(IMAGES["target"], -20*SCALE, -20*SCALE, 40*SCALE, 40*SCALE);
		ctx.restore();
		targetAngle = (targetAngle + 8) % 360;
	}
}

function drawProjectiles () {
	for (i = 0; i < projectiles.length; i++)
	{
		var p = projectiles[i];
		ctx.save();
		ctx.translate(scaleX(p.x), scaleY(p.y));
		ctx.scale(SCALE, SCALE);
		ctx.drawImage(p.img, -p.r, -p.r, p.r*2, p.r*2);
		ctx.restore();
	}
}

function updatePlayer () {
	if (player.target) {
		resolveVelocities(player, player.target);
		if (MOBILE) {
			viruses.forEach(function(v) {
				if (circleCollides(v, player.target)) {
					shoot = 1;
				}
			})
		}
	}
	
 	for (i=0;i<backup.length;i++) {
		var b = backup[i];
		aiLogic(b);
	}
	if (shoot && player.alive && player.target) {
		playerShoot();
		shoot = 0;
	}
	
	lastShot++;
}

function updateViruses () {
	if (--splitVirus < 0 && !GAME_OVER && STARTED) {
		splitVirus = randomInt(20, (50/aiQ) < 100 ? 100 : 100/aiQ);
		var virus = randomVirus();
		if (virus) {
			for (i = 0; i < 2; i++) {
				addCircle(virus.x, virus.y);
			}
		} else {
			splitVirus *= 0.6;
			addCircle(randomInt(0, _W), randomInt(20, 100))
		}
	}
	for (i = 0; i < viruses.length; i++) {
		var v = viruses[i];
		aiLogic(v);
	}
}

function updateCollisions () {
	var objects;
	//allows red circles vs white circles only
	/*viruses.forEach(function(v) {
		backup.forEach(function(b) {
			if (circleCollides(v, b)) {
				doPhysics(v, b);
			}
		})
		if (circleCollides(v, player)) {
			doPhysics(v, player);
		}
	});*/

	objects = viruses.concat(backup);
	for (i = 0; i < projectiles.length; i++)
	{
		var p = projectiles[i];
		if (Math.abs(p.vx) < 0.1 && Math.abs(p.vy) < 0.1) {
			projectiles.splice(i, 1);
			continue;
		}
		//check against player
		if (player.alive && p.col !== player.col && circleCollides(p, player)) {
			projectiles.splice(i, 1);
			explode(player);
			continue;
		}
		for (j = 0; j < objects.length; j++) 
		{
			var o = objects[j];
			if (o && p && p.col !== o.col && circleCollides(p, o)) {
				projectiles.splice(i, 1);
				var grp = o.col == "white" ? backup : viruses;
				explode(o, grp);
				objects[j] = 0;
				continue;
			}
		}
	}
}

function updatePositions () {
	if (player.alive) {
		player.x += player.vx;
		player.y += player.vy;
	}

	backup.forEach(function(b) {
		b.x += b.vx;
		b.y += b.vy;
	});
	
	if (STARTED) {
		viruses.forEach(function(v) {
			v.x += v.vx;
			v.y += v.vy;
		})
	}


	for (i = 0; i < projectiles.length; i++)
	{
		o = projectiles[i];
		o.x += o.vx;
		o.y += o.vy;
		if (o.x + o.r > _W || o.x < o.r || o.y + o.r > W || o.y < o.r) projectiles.splice(i, 1);
	};
	var ents = viruses.concat(backup).concat([player]);
	ents.forEach(function(o) {
		//if any hits the border, make them move in the opposite direction with lesser energy
		if (scaleX(o.x) + o.r*SCALE > W) {
			o.x = 685;
			o.vx *= -0.1;
		} else if (scaleX(o.x) < o.r*SCALE) {
			o.x = 15;
			o.vx *= -0.1;
		}
		if (scaleY(o.y) + o.r*SCALE > H) {
			o.y = _H - o.r;
			o.vy *= -0.1;
		} else if (scaleY(o.y) < o.r*SCALE) {
			o.y = o.r;
			o.vy *= -0.1;
		}
	})
}

//particles
function drawParticles () {
	var p;
	for (i = 0; i < particles.length; i++) {
		p = particles[i];
		ctx.save();
		ctx.translate(scaleX(p.x), scaleY(p.y));
		ctx.globalAlpha = p.scale;
		ctx.drawImage(IMAGES["particle"], -p.r*SCALE, -p.r*SCALE, p.r*SCALE, p.r*SCALE);
		ctx.restore();
	}
}

function updateParticles() {
	var p;
	for (i = 0; i < particles.length; i++) {
		p = particles[i];
		p.x += p.vx;
		p.y += p.vy;
		p.scale -= p.scaleSpeed;
		if (p.scale <= 0) particles.splice(i, 1);
	}
}


function start () {
	player = new Antivirus(350, 450);
	MENU = 1;
	canStart = 1;
}

function reset() {
	//goes back to menu
	PAUSED = 0;
	canStart = 1;
		
	aiMsg = "";

	CUSTOMER = 1;
	THREATS = 0;
	LIVES = 3;
	RECEIVED = 0;
	viruses = [];
	desViruses = 0;
	projectiles = [];
	particles = [];
		
	splitVirus = 500;
	lastShot = 0;
	aiQ = 0.1;
	backup = [];
	shoot = !1;

	MENU = 1;
}

function restart() {
	reset();
	initData();
	MENU = 0;
	GAME_OVER = 0;
	player.alive = 1;
	GAME = 1;
	sendMsg("                A NEW CUSTOMER", "yellow","                CUSTOMER "+CUSTOMER);
	setTimeout(function() {
		for (i = 0; i < 3; i++) {
			addCircle(randomInt(0, W), randomInt(-10, H*0.1));
		}
	}, 2000);
	STARTED = 1;
}

var destroyHS = new Circle(350, 250, 80),
	backupHSL = new Circle(0, 500, 80),
	backupHSR = new Circle(700, 500, 80),
	rechargeHSL = new Circle(0, 0, 80),
	rechargeHSR = new Circle(700, 0, 80);

var useBytes = function () {
	var activate = 0, activating = 0, cnt;

	var count = function(name, hs) {
		activating = 1;
		activate = 2;
		var test = hs.length === 1 ? circleCollides(player, hs[0]) : (circleCollides(player, hs[0]) || circleCollides(player, hs[1]));
		cnt = setInterval(function() {
			if (!test) {activate = 10;
				clearInterval(cnt);
				return;
			}
			if (--activate <= 0) {
				clearInterval(cnt);
					activating = 0;
					sendMsg("    "+"' "+name+" '  ACTIVATED", "rgb(39,100,80)");
					switch (name) {
						case "DESTROY":
							destroyAll();
							break;
						case "BACKUP":
							createBackup();
							break;
						case "RECHARGE":
							reCharge();
							break;
						default:
							break;
					}
				save();
			}
		}, 1000);
	}
	setInterval(function() {
		if (STARTED && player.alive && !activating) {
			if (circleCollides(player, destroyHS)) {
				if (ITEMS[2] > 0) count("DESTROY", [destroyHS]);
			} else if ((circleCollides(player, backupHSL) || circleCollides(player, backupHSR))) {
				if (ITEMS[1] > 0) count("BACKUP", [backupHSL, backupHSR]);
			} else if ((circleCollides(player, rechargeHSL) || circleCollides(player, rechargeHSR))) {
				if (ITEMS[0] > 0) count("RECHARGE", [rechargeHSL, rechargeHSR]);
			}
		}
	}, 1000);
}
useBytes();