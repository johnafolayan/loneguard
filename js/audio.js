var Audio = function () {
	var AudioContext = window.AudioContext || window.webkitAudioContext;
	if (AudioContext)
	{
		this.ctx = new AudioContext();
		this.tempo = 120;
		this.sounds = {};
		this.playing = {};
		this.addSounds();
	}
}

Audio.prototype = {
	addSounds: function () {
		var self = this;
		this.sounds.explosion = (function () {
			var tempo = 1300;
			var sequence = new TinyMusic.Sequence(self.ctx, tempo, [
				"B2 q",
				"F2 q"
			]);
			sequence.loop = false;
			sequence.gain.gain.value = 1;
			sequence.bass.gain.value = 20;
			sequence.waveType = "triangle";
			return sequence;
		})();
		this.sounds.shoot = (function () {
			var tempo = 1000;
			var sequence = new TinyMusic.Sequence(self.ctx, tempo, [
				"F5 q",
				"G4 e"
			]);
			sequence.loop = false;
			sequence.gain.gain.value = 0.8;
			sequence.bass.gain.value = 20;
			sequence.waveType = "sine";
			return sequence;
		})();
		this.sounds.victory = (function () {
			var tempo = 900;
			var sequence = new TinyMusic.Sequence(self.ctx, tempo, [
				"C3 q",
				"D4 q",
				"E5 w"
			]);
			sequence.loop = false;
			sequence.gain.gain.value = 0.8;
			sequence.bass.gain.value = 20;
			sequence.waveType = "triangle";
			return sequence;
		})();
	},
	play: function (name) {
		if (this.sounds[name]) {
			this.playing[name] = this.sounds[name];
			this.playing[name].play(this.ctx.currentTime);
			if (!this.playing[name].loop) this.playing[name] = null;
		}
	},
	stop: function (name, d) {
		if (this.playing[name]) {
			d = d || 0;
			this.playing[name].stop(this.ctx.currentTime+d);
		}
	}
}

var audio = new Audio();
var play = function (name) { audio.play(name); };