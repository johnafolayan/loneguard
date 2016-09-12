	//functions that make use of the UI Canvas

function glitch(count, callback) {
	count = count || 6;
	var glh = setInterval(function () {
		ctx = uiCtx;
		clear();
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, W, H);
		if ((--count)%2 == 0) {
			ctx.fillStyle = "black";
			ctx.fillRect(0, 0, W, H);
		}
		if (count <= 0) {
			clearInterval(glh);
			PAUSED = 0;
			if (callback) callback();
		}
	}, 200);
}

function Button(text, x, y, col, w, h) {
	ctx.save();
	ctx.strokeStyle = 'rgb(105,120,180)';
	ctx.lineWidth = 1*SCALE;
	ctx.globalAlpha = 1;
	ctx.translate(scaleX(x), scaleY(y));
	if (col) opacity = 1;
	Text(text, 15, 30, 'f', 'white', 1, opacity, .95);
	line(0, 41, 60, 42, col || "navy");
	ctx.restore();
	opacity = (opacity + 0.01)%1;
}

function drawGameUI () {
	if (PAUSED) return;
	clear();
	Text(" "+aiMsg, 250, 50, "f", aiMsgCol, 1, (aiMsgO-=0.03), 1.4);
	if (MENU) {
		//draw buttons
		Button("Play", 320, 150);
		Button("Shop", 320, 230);
		Button("Bytes", 320, 310);
	} else if (SHOP) {
		Button("BACK", 50, 30, "fuchsia");
		Text("Cash: $"+CASH, 500, 90, "f", "", 1, 1, 1);
		Text("Please tap/click 'Buy' to buy.", 250, 120, "f", "gray", 1, 1, .9);

		Text("Recharge - $100", 100, 180, "f", "green", 1, 1, 1);
		//line(285, 191, 415, 192, "green");
		Button("Buy", 300, 145, "white");

		Text("Backup - $350", 100, 225, "f", "white", 1, 1, 1);
		//line(285, 231, 415, 232, "white");
		Button("Buy", 300, 190, "white");

		Text("Destroy - $250", 100, 270, "f", "navy", 1, 1, 1);
		//line(285, 271, 400, 272, "navy");
		Button("Buy", 300, 235, "white");

	} else if (INVENTORY) {
		Button("BACK", 50, 30, "fuchsia");
		Text("Cash: $"+CASH, 500, 90, "f", "", 1, 1, 1);
		Text("Your Inventory", 290, 120, "f", "gray", 1, 1, 1.1);
		Text("Recharge x"+ITEMS[0], 100, 180, "f", "green", 1, 1, .9);
		Text("Backup x"+ITEMS[1], 100, 225, "f", "white", 1, 1, .9);
		Text("Destroy x"+ITEMS[2], 100, 270, "f", "navy", 1, 1, .9);
	}

	if (STARTED) {
		if (!GAME_OVER) {
			Text("Lives ::  "+LIVES, 20, 30, "f", "white", 3, 1, 1.1);
			Text("Destroyed Viruses ::  "+desViruses, 20, 50, "f", "white", 3, 1, 1.1);
		}
	}
	
	if (GAME_OVER) {
		Text("Game Over !!", 250, 100, 'f', 'red', 5, 1, 3);
		Text("Oops. You lost. Better luck next time", 50, 180, 'f', '', 2, 1, 2);
		Text("Customers served: "+CUSTOMER, 150, 220, 'f', 'gray', 1, 1, 1);
		Text("Money received: $"+RECEIVED, 150, 250, 'f', 'gray', 5, 1, 1);
		Button("RETRY", 230, 300);
		Button("HOME", 420, 300);
	}
}