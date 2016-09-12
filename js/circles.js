//N/B: Antivirus and Virus functions do not need to be called as constructors

//circle class
var Circle = function (x, y, r) {
	this.x = x;
	this.y = y;
	this.r = r || 19;
	this.vx = 0;
	this.vy = 0;
	this.col = null;
	this.angle = 0;
	this.wait = 0; //decides if the circle should change action
	this.target = null;
	this.attackers = [];
	this.dfs = 0;
}
//function to return an antivirus object
function Antivirus () {
	Circle.apply(this, arguments);
	this.col = "white";
}

//function to return a virus object
function Virus () {
	Circle.apply(this, arguments);
	this.col = "red";
}

function randomVirus() {
	return viruses[randomInt(0, viruses.length)];
}

var targetAngle = 1;

//function to add a circle - either virus or antivirus
function addCircle(x, y, type) {
	if (type == "a") {
		backup.push(new Antivirus(x, y));
	} else {
		//virus
		if (desViruses + viruses.length <= THREATS) {
			viruses.push(new Virus(x, y))
		}
	}
}

function destroyAll () {
	ITEMS[2]--;
	PAUSED = 1;
	save();
	glitch(3, function() {
		var l = viruses.length;
		for (var d = 0; d < l; d++) {
			explode(viruses[d], viruses);
		}
	});
}

function createBackup () {
	for (var add = 0; add < 2; add++) addCircle(randomInt(0, 700), randomInt(490, 550), "a");
	ITEMS[1]--;
	save();
}

function reCharge() {
	ITEMS[0]--;
	save();
	sendMsg("YOU RECEIVED AN EXTRA LIFE. YIPEE!", "gray");
	LIVES++;
}