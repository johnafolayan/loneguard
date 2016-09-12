
//stores all game data and everything that stores data

//images
var IMAGES = {
	"antivirus": tmpCanvas(50, 50, function (c) {
		c.beginPath();
		c.strokeStyle = 'white';
		c.lineWidth = 3;
		shadow("white", 3, c);
		circle(25, 25, 21, c);
		c.stroke();
		c.closePath();
		c.strokeRect(24,24,1,1);
	}),
	
	"virus": tmpCanvas(50, 50, function (c) {
		c.beginPath();
		c.strokeStyle = 'red';
		c.lineWidth = 3;
		shadow("red", 3, c);
		circle(25, 25, 21, c);
		c.stroke();
		c.closePath();
		c.strokeRect(24,24,1,1);
	}),
	
	"particle": tmpCanvas(50, 50, function (c) {
		c.fillStyle = "rgba(255,255,255,.8)";
		c.beginPath(); 
		shadow("white", 10, c);
		circle(25, 25, 23, c);
		c.fill();
		c.closePath(); 
	}),

	"byte": tmpCanvas(10, 10, function (c) {
		var gradient = c.createLinearGradient(5,5,2,5,5,5);
		gradient.addColorStop(0, "#E2E858");
		gradient.addColorStop(1, "yellow");
		c.fillStyle = gradient;
		c.shadowColor = "yellow";
		c.shadowBlur = 13;
		c.fillRect(0,0,10,10);
	}),

	"projectile": function (col) {
		return tmpCanvas(6, 6, function (c) {
			c.fillStyle = col;
			c.beginPath();
			c.arc(3, 3, 3, 0, angle360);
			c.fill();
		})
	},

	"target": tmpCanvas(50, 50, function (c) {
		c.beginPath();
		c.strokeStyle = 'white';
		c.lineWidth = 1.5;
		//draw a circle with a radius larger than halfwidth to cause a clipped circle
		//creating a real target circle effect
		c.arc(25, 25, 26, 0, angle360);
		c.stroke();
		c.closePath();
	})
}

//saves game
function save() {
	if (STORAGE)  {
		localStorage.lg_items = JSON.stringify(ITEMS);
		localStorage.lg_cash = JSON.stringify(CASH);
	}
}

//restore game
function restore () {
	if (STORAGE) {
		var lg = localStorage.lg_items;
		var cash = localStorage.lg_cash;
		if (lg && cash) {
			ITEMS = JSON.parse(lg);
			CASH = JSON.parse(cash);
		} else {
			save();
		}
	}
}


function initData(newLvl) {
	if (!newLvl) {
		for (i = 0; i < 3; i++) {
			addCircle(randomInt(0, 700), randomInt(400, 500), "a");
		}
	} else {
		aiQ += 0.1 + Math.random() * 0.25;
		CUSTOMER++;
	}
	THREATS += 
	randomInt(10+(CUSTOMER/aiQ)*0.1, 20+(CUSTOMER/aiQ)*0.1);
}


