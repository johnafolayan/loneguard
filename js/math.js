function randomInt (min, max) {
	return Math.floor(min + Math.random() * (max-min));
} 

function euclid_distance (a, b) {
	return Math.sqrt(((a.x-b.x)*(a.x-b.x)) + ((a.y-b.y)*(a.y-b.y)));
}

//used to fire a projectile towards a target
function calculatePath (point, goal) {
	var distance = euclid_distance(point, goal);
}

function resolveVelocities (o, point) {
	var dx = (o.x - point.x)*0.9;
	var dy = (o.y - point.y)*0.9;

	if (!o.r) {
		var angle = Math.atan(dx/dy);
		o.vx = -dx * 0.01;
		o.vy = o.vx / Math.tan(angle);
		o.angle = angle;
		return;
	}
	
	if (o.r == 25 && o.col == "red") {
		//if red circle
		dx *= 1.1;
		dy *= 1.1;
	}
	if (dx < W * 0.2 && dy < H * 0.2 && o.r == 5) {
		dx *= 2.3;
		dy *= 2.3;
	}
	
	var angle = Math.atan(dx/dy);
	o.vx = -dx * 0.016;
	o.vy = o.vx / Math.tan(angle);
	o.angle = angle;
	return {dx: dx, dy: dy, angle: angle}
}

function circleCollides (a, b) {
	var d = euclid_distance(a, b);
	var r = a.r + b.r;
	return d < r;
}

function doPhysics (a, b, noResolve) {
	var a_midx = a.x;
	var a_midy = a.y;
	
	var b_midx = b.x;
	var b_midy = b.y;
	
	//calculate the distances between mid coords
	var dx = a_midx - b_midx;
	var dy = a_midy - b_midy;
	var absDX = Math.abs(dx);
	var absDY = Math.abs(dy);
	
	//add half sizes
	var halfWidths = a.r + b.r,
		halfHeights = a.r + a.r;
	
	//direction of impact
	var dir = null;
	
	//if the mid distances are less than their halves, a collision is occuring
	if (absDX < halfWidths && absDY < halfHeights) 
	{
		//determine the site
		var rX = halfWidths - absDX;
		var rY = halfHeights - absDY;
		//if from the top/down
		if (rX >= rY) {
			//if a is approaching from the bottom
			if (dy > 0) {
				a.y += rY;
				dir = 'bottom';
			} else {
				a.y -= rY;
				dir = 'top';
			}
		} else {
			//if from sides
			//right
			if (dx > 0) {
				a.x += rX;
				dir = 'right';
			} else {
				a.x -= rX;
				dir = 'left';
			}
		}
	}

	//resolve
	if (!noResolve) {
		if (dir === 'left' || dir === 'right') {
			a.vx *= -1;
		} else if (dir === 'bottom' || dir === 'top') {
			a.vy *= -1;
		}
	}
}