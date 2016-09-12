	
//game states
var 	STARTED = 0,
		PAUSED = 0,
		GAME_OVER = 0,
		canStart = 0,
		
		aiMsg = "", // message shown by the personal guide,
		aiMsgCol = "white",
		aiMsgO = 1,

		//game bckground vars
		bgO = 0,

		GAME = 0,
		MENU = 0,
		SHOP = 0,
		INVENTORY = 0,
		
		CUSTOMER = 1, //current customer
		THREATS = 0, //number of viruses to beat in a level
		LIVES = 3,
		CASH = 100,
		RECEIVED = 0, //money received after a game
		ITEMS = [2, 1, 1], //in the order: Recharge, Backup, Destroy
		
		t = 0, //current time
		last = 0, //last time
		dt = 0, //change in time
		dstep = 1/60, // 60 fps
		
		o = 0, //global variable for any thread to access
		opacity = 0, //random var
		
		
		i = 0, //especially for looping
		j = 0, //ditto
		
		viruses = [], //group of viruses
		desViruses = 0, //destroyed viruses
		projectiles = [], //'bombs'
		particles = [], //particle effects
		
		splitVirus = 500, //countdown to determine if a virus should be added or not
		lastShot = 0, //to prevent lasers from flying everywhere
		aiQ = 0.1, //ai intelligence
		placeByte = 50,
		
		player = 0,
		backup = [],
		shoot = !1;

var msgs = {
	kills: ["NICE HIT !!!","!!! EXTREME  !!!","UNSTOPPABLE","YOU GOT THIS","SUPERB !!!"],
	lost: ["OUCH !!!","AWW ... COME ON"," TRY HARDER","TERRIBLE","ARE YOU THAT ... WEAK?"]
};

function sendMsg(msg, col, msg2) {
	aiMsg = msg;
	aiMsgCol = col;
	aiMsgO = 1;

	setTimeout(function () {
		aiMsg = "";
		if (msg2) setTimeout(function() {
			sendMsg(msg2, col);
		}, 500);
	}, 2500);
}

function explode(o, g) {
	emitParticles(o.x, o.y, randomInt(7, 10));
	if (!g) {
		if (--LIVES <= 0) {
			LIVES = 0;
			player.alive = 0;
			if (backup.length === 0) {
				PAUSED = 1;
				RECEIVED += randomInt(15, 30);
				CASH += RECEIVED;
				save();
				glitch(6, function() {
					GAME_OVER = 1;
					PAUSED = 0;
				});
			}
			else {
				sendMsg("SITUATION IS CRITICAL !!!", Math.random() > .5 ? "red" : "fuchsia", backup.length+" BACKUP(S) REMAINING");
				glitch(3);
			}
		}
		sendMsg(msgs.lost[randomInt(0, 5)], Math.random() > .5 ? "red" : "fuchsia");
		return;
	}
	
	if (o.col == "red") {
		g.splice(g.indexOf(o), 1);
		if (++desViruses >= THREATS) {
			RECEIVED += randomInt(50, 100);
			sendMsg(msgs.kills[randomInt(0, 5)], Math.random() > .5 ? "green" : "purple", "     WELL DONE.");
			//STARTED = 0;
			play("victory");
			setTimeout(function() {
				initData(1);
				sendMsg("YOU HAVE A NEW CUSTOMER", "violet", "    CUSTOMER "+CUSTOMER);
				STARTED = 1;
				splitVirus = 250;
			}, 5000);
		} else {
			sendMsg(msgs.kills[randomInt(0, 5)], Math.random() > .5 ? "brown" : "white");
		}
	} else {
		backup.splice(backup.indexOf(o), 1);
		sendMsg("OOPS! ONE BACKUP DOWN", "rgb(200,150,190)");
		if (STARTED && backup.length === 0 && !player.alive) {
				PAUSED = 1;
				RECEIVED += randomInt(15, 30);
				CASH += RECEIVED;
				save();
				glitch(6, function() {
					GAME_OVER = 1;
					PAUSED = 0;
				});
		}
	}
	o.attackers.forEach(function (a) {
		a.target = null;
		a.wait = 10;
	})
}

//restore game state
restore();