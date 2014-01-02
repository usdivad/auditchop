/*
 * SYNTHS
 *
 */
var osc_nw = T("konami");
var env_nw = T("adsr", {a:10, d:300, s:0.25, r:700});
var oe_nw = T("OscGen", {osc:osc_nw, env:env_nw, mul:0.4}).play();

var osc_se = T("konami");
var env_se = T("adsr", {a:500, d:500, s:1, r:1500});
var oe_se = T("OscGen", {osc:osc_se, env:env_se, mul:0.4}).play();

var osc_ne = T("sin");
//var env_ne = T("adsr", {a:100,d:250,s:0.6,r:500});
var env_ne = T("adsr", {a:50, d:300, s:0.1, r:500});
//var env_ne = T("perc", {a:50, r:300});
var oe_ne = T("OscGen", {osc:osc_ne, env:env_ne, mul:0.75}).play();

var delay_ne = T("delay", {time:500, fb:0, mix:0.5}, oe_ne).play();
var delay_ne_2 = T("delay", {time:750, fb:0, mix:0.25}, oe_ne).play();

//testing fx
//T("phaser", {freq:osc_nw, Q:1, steps:8}, oe_se).play();

/*
 *SOUND PARAMS**/
//var pitches_nw = [62, 64, 67, 69, 71];
var pitches_nw = [76,74,71,71,67,69,67,69,76,74,71,71,74,76,79,74,71,71,67,69,67,69,71,69,67,64,64,62,67];
var pitches_se = [55,57,59,62,64];
var pitches_ne = [62,60,59,57,59,57,55,52,50,52,54,55,50,50,52,54,55,55,57,62,60,59,57,55,60,55];
/*for (var i=0; i<pitches.length; i++) {
	pitches[i] = pitches[i] - 24;
}*/
var interval_nw = 150;
var interval_ne = 225;
var timerOn = false;


//var noteNum = 62;
//var velocity = 50;
var timer_nw = T("interval", {interval:interval_nw}, function(count) {
	//oe.noteOff(noteNum); //last noteNum from prev interval bang
	var noteNum = pitches_nw[Math.floor(Math.random()*pitches_nw.length)] - (12*Math.floor(Math.random()*4));
	var velocity = Math.random()*50 + 50;
	oe_nw.noteOn(noteNum, velocity);
});

var timer_ne = T("interval", {interval:interval_ne}, function(count) {
	//oe_ne.allNoteOff();
	var noteNum = pitches_ne[Math.floor(Math.random()*pitches_ne.length)] +12; //+ (12*Math.floor(Math.random()*2));
	var velocity = Math.random()*50 + 50;
	oe_ne.noteOn(noteNum, velocity);
	/*setTimeout(function() {
		oe_ne.noteOff(noteNum);
		console.log(noteNum+" off");
	}, interval_ne*1.1);*/
})

//control params
var box_nw = document.getElementById("box_nw");
var box_se = document.getElementById("box_se");
var box_ne = document.getElementById("box_ne");

//	- for desktop
/*box_nw.onmousedown = function() {
	$("#box_nw").trigger("touchstart");
	console.log("s");
};*/
box_nw.onmouseup = function() {
	pause_nw();
	box_nw.style.color = "green";
};
box_se.onmousedown = function() {
	play_se();
	box_se.style.color = "green";
};
box_se.onmouseup = function() {
	pause_se();
	box_se.style.color = "orange";
};
box_ne.onmousedown = function() {
	play_ne();
	box_ne.style.color = "purple";
};
box_ne.onmouseup = function() {
	pause_ne();
	box_nw.style.color = "red";
};


//	- prevent scrolling
document.body.addEventListener("touchmove", function(e) {
	e.preventDefault();
});


//	- f0r touch(multi)
$("#box_nw").bind("touchstart mousedown", function() {
	play_nw();
	box_nw.style.color = "orange";
});
/*box_nw.addEventListener("touchstart", function() {
	play_nw();
	box_nw.style.color = "orange";
}, false);*/
box_nw.addEventListener("touchend", function() {
	pause_nw();
	box_nw.style.color = "green";
}, false);
box_se.addEventListener("touchstart", function() {
	play_se();
	box_se.style.color = "green";
}, false);
box_se.addEventListener("touchend", function() {
	pause_se();
	box_se.style.color = "orange";
}, false);
box_ne.addEventListener("touchstart", function() {
	play_ne();
	box_ne.style.color = "purple";
}, false);
box_ne.addEventListener("touchend", function() {
	pause_ne();
	box_nw.style.color = "red";
}, false);

function play_se() {
	//oe_se.allNoteOff();
	var n = pitches_se[Math.floor(Math.random()*pitches_se.length)] - 36;
	//var n = Math.floor(Math.random()*12 + 62-24);
	var v = Math.random()*50 + 50;
	oe_se.noteOn(n, v);
	
	var dice = Math.random()*3;
	if (dice <= 1) {
		oe_se.noteOn(n-5, v);
	}
	else if (dice <= 2) {
		oe_se.noteOn(n-7, v);
	}
	else {
		oe_se.noteOn(n-12, v);
	}
}

function pause_se() {
	oe_se.allNoteOff();
}

function play_nw() {
	//if (!timerOn) {
		timer_nw.start();
	//}
	//timerOn = true;
}

function pause_nw() {
	oe_nw.allNoteOff();
	timer_nw.stop()
}

function play_ne() {
	//if (!timerOn) {
		timer_ne.start();
	//}
	//timerOn = true;
}

function pause_ne() {
	oe_ne.allNoteOff();
	timer_ne.stop();
}

/*
function pause() {
	oe_nw.allNoteOff();
	oe_se.allNoteOff();
	oe_ne.allNoteOff();
	timer_nw.stop();
	timer_ne.stop();
	timerOn = false;
}
*/