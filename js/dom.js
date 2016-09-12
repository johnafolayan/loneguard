//DOM helper functions

function $(id) {
	return document.getElementById(id);
}

function show (obj) {
	obj.style.display = "block";
}

function hide (obj) {
	obj.style.display = "none";
}

function fadeIn (obj, duration) {
	duration = duration || 100;
	var op = 0.1;
	obj.style.opacity = 0;
	show(obj); 
	var fade = setInterval(function () {
		obj.style.opacity = op;
		op += 0.05;
		if (op >= 1){
			clearInterval(fade)
		} 
	}, duration);
}