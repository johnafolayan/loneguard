

function handleClick (e) {
	var x = e.pageX * SCALE_X;
	var y = e.pageY * SCALE_Y;
	
	if (MENU) {
		if (x >= 320 && x <= 380) {
			if (y >= 150 && y <= 192) {
				//PLAY
				clear(uiCtx);
				MENU = 0;
				setTimeout(function () {
					player.alive = 1;
					GAME = 1;
					initData();
					STARTED = 1;
					sendMsg("A NEW CUSTOMER", "indigo", "CUSTOMER "+CUSTOMER);
					setTimeout(function() {
						for (i = 0; i < 3; i++) {
							addCircle(randomInt(0, 700), randomInt(19, 30));
							viruses[i].wait = 50;
						}
					}, 3000);
				}, 500)
			} else if (y >= 230 && y <= 272) {
				MENU = 0;
				setTimeout(function () {
					SHOP = 1;
				}, 500);
			} else if (y >= 310 && y <= 352) {
				MENU = 0;
				setTimeout(function () {
					INVENTORY = 1;
				}, 500);
			}
		}
	} else if (SHOP) {
		if (x >= 50 && x <= 110 && y >= 30 && y <= 72) {
			SHOP = 0;
			MENU = 1;
			aiMsg = "";
		} else if (x >= 300 && x <= 360) {
			if (y >= 145 && y <= 187) {
				buy("Recharge");
			} else if (y >= 190 && y <= 232) {
				buy("Backup");
			} else if (y >= 235 && y <= 277) {
				buy("Destroy");
			}		}
	} else if (INVENTORY) {
		if (x >= 50 && x <= 110 && y >= 30 && y <= 72) {
			INVENTORY = 0;
			MENU = 1;
			aiMsg = "";
		}
	}
	if (GAME && !GAME_OVER) {
		player.target = {x: x, y: y, r: 10};
	}
	if (GAME_OVER) {
		if (y >= 300 && y <= 342) {
			if (x >= 230 && x <= 290) {
				GAME_OVER = 0;
				STARTED = 0;
				GAME = 0;
				setTimeout(restart, 500);
			} else if (x >= 420 && x <= 480) {
				GAME_OVER = 0;
				STARTED = 0;
				GAME = 0;
				setTimeout(reset, 500);
			}
		}
	}
}

if (MOBILE) {
	addListener('touchstart', function (e) {
		e.preventDefault();
		handleClick(e.changedTouches[0]);
	}, false);
	playBtn.ontouchstart = function () {
		hide($("home"));
		fadeIn(game, 50);
		glitch(5, boot);
	}
} else {
	addListener('click', function (e) {
		e.preventDefault();
		handleClick(e);
	}, false);
	
	addListener("keydown", function (e) {
		if (e.keyCode === 32) {
			e.preventDefault();
			if (STARTED) shoot = 1;
		}
	})
	playBtn.onclick = function () {
		hide($("home"));
		fadeIn(game, 50);
		glitch(6, boot);
	};
}