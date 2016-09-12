function Byte (x, y, fill) {
	this.x = x;
	this.y = y;
	this.w = 8;
	this.h = 8;
	this.o = 0.1;
	this.fill = fill;
	this.img = IMAGES["byte"];

	this.lasts = randomInt(5, 10);
}

function sendByte(x, y, fill) {
	var b = new Byte(x, y, fill);
	b.name = BYTES[fill].name;
	b.effect = BYTES[fill].effect;
	bytes.push(b);
	placeByte = randomInt(500, 600);
}

//conirms or denies a player's transaction
function buy(id) {
	var c = CASH;
	var p;
	var _buy = function(price) {
		if (CASH >= price) {
			p = price;
			CASH -= price;
			return 1;
		}
		return 0;
	}
	switch(id) {
		case "Recharge":
			if (_buy(100)) ITEMS[0]++;
			break;
		case "Backup":
			if (_buy(350)) ITEMS[1]++;
			break;
		case "Destroy":
			if (_buy(250)) ITEMS[2]++;
			break;
		case "Setback":
			if (_buy(50)) ITEMS[3]++; 
			break;
		default:
			break;
	}
	if (c > CASH) {
		sendMsg(id.toUpperCase()+" BOUGHT SUCCCESSFULLY", "rgba(80,230,100,.9)", "$"+p+" HAS BEEN DEDUCTED");
		save();
	} else {
		//denied
		if (c === CASH) sendMsg("TRANSACTION DENIED", "red", "REASON: NOT ENOUGH MONEY")
	}
}