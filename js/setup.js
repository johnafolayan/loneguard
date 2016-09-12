/*
	** Setup file for the game.
	** Creates variables that will be useful throughout the game
*/

var 	game = $("gameArea"),
		canvas = $("g"), //main canvas
		uiCanvas = $("u"), //ui canvas
		playBtn = $("play"),
		gCtx = canvas.getContext("2d"),
		uiCtx = uiCanvas.getContext("2d"),
		ctx = gCtx,
		_W = canvas.width,
		_H = canvas.height,
		MARGIN_Y = 40,
		SCALE = 1,
		SCALE_X = 1,
		SCALE_Y = 1,
		dstep = 1/60,
		DEBUG = 1,
		MOBILE = "ontouchstart" in document,
		STORAGE = !!window["localStorage"],
		angle360 = 2 * Math.PI;

		
$("btnShoot").innerHTML = MOBILE ? "tap them" : "press the Space Bar";
function scaleX (n) { return n / SCALE_X; };
function scaleY (n) { return n / SCALE_Y; };

function addListener (e, fn) {
	var listener = document.addEventListener || document.attachEvent;
	return listener.call(document, e, fn, false);
}

var rAF = (function () {
	return window.requestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				function (callback) {
					setTimeout(callback, 1000/60);
				}
})();

var H = 700, W = 500;

function hideAddressBar () {
	if (!window.location.hash) 
	{
		if (document.height < window.outerHeight) 
		{
			document.body.style.height = (window.outerHeight + 50) + "px";
		}
		setTimeout(function () { window.scrollTo(0, 1);}, 1);
	}
}

var wH = 0,
	wW = 0;

function resize () {
	wW = window.innerWidth;
	wH = window.innerHeight;

	if (H === wH && W === wW) return;
	H = wH;
	W = wW;

	SCALE_X = _W/W;
	SCALE_Y = _H/H;
	SCALE = 1 / Math.max(SCALE_X, SCALE_Y);
	
	MARGIN_Y = H*0.3;
	
	canvas.width = W;
	canvas.height = H;

	uiCanvas.width = W;
	uiCanvas.height = H;

	document.body.style.fontSize = SCALE*0.9 + "em";
//	if (MOBILE && !window.scrollOffset) hideAddressBar();
}

setInterval(resize, 50);