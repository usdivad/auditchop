(function() {
	/*
	 * SYNTHS
	 *
	 */
	//NW
	var osc_nw = T("konami");
	var env_nw = T("adsr", {a:10, d:300, s:0.25, r:700});
	var oe_nw = T("OscGen", {osc:osc_nw, env:env_nw, mul:0.4}).play();

	//SE
	var osc_se = T("konami");
	var env_se = T("adsr", {a:500, d:500, s:1, r:1500});
	var oe_se = T("OscGen", {osc:osc_se, env:env_se, mul:0.4}).play();

	//NE
	var osc_ne = T("sin");
	//var env_ne = T("adsr", {a:100,d:250,s:0.6,r:500});
	var env_ne = T("adsr", {a:50, d:300, s:0.1, r:500});
	//var env_ne = T("perc", {a:50, r:300});
	var oe_ne = T("OscGen", {osc:osc_ne, env:env_ne, mul:0.5}).play();
	var delay_ne = T("delay", {time:500, fb:0, mix:0.5}, oe_ne).play();
	var delay_ne_2 = T("delay", {time:750, fb:0, mix:0.25}, oe_ne).play();

	//SW
	var osc_sw = T("sin");
	var env_sw = T("adsr", {a:300, d:500, s:1, r:2000});
	var oe_sw = T("OscGen", {osc:osc_sw, env:env_sw, mul:0.75}).play();

	//testing fx
	//T("phaser", {freq:osc_nw, Q:1, steps:8}, oe_se).play();

	/*
	 * SOUND PARAMS
	 *
	 * NW = auld lang syne chorus
	 * SE = chords
	 * NE = auld lang syne verse
	 * SW = quartal/september
	 */ 

	//pitch arrays
	var pitches_nw = [76,74,71,71,67,69,67,69,76,74,71,71,74,76,79,74,71,71,67,69,67,69,71,69,67,64,64,62,67];
	var pitches_se = [55,57,59,62,64];
	var pitches_ne = [62,60,59,57,59,57,55,52,50,52,54,55,50,50,52,54,55,55,57,62,60,59,57,55,60,55];
	var pitches_sw = pitches_se;
	var interval_nw = 150;
	var interval_ne = 225;
	var timerOn = false;

	//timers
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
	});

	/*
	 * CONTROL PARAMS
	 */
	/*
	var box_nw = document.getElementById("box_nw");
	var box_se = document.getElementById("box_se");
	var box_ne = document.getElementById("box_ne");
	var box_sw = document.getElementById("box_sw");
	*/

	//prevent scrolling
	document.body.addEventListener("touchmove", function(e) {
		e.preventDefault();
	});

	//touchmove
	$("body").bind("touchmove", function() {

	});


	//f0r  touch(multi) and desktop
	//e.stopPropagation(); e.preventDefault(); prevents double-trigger on mobile
	$("#box_nw").bind("touchstart mousedown", function(e) {
		play_nw();
		//window.setTimeout(function() {
			$("#box_nw").style.color = "orange";
		//}, 50);
		e.stopPropagation();
		e.preventDefault();
	});
	//opacity exp
	/*$("#box_nw").bind("touchmove", function() {
		//box_nw.style.color = "orange";
		//$("#box_nw").css("opacity:")
		if (box_nw.style.opacity) {
			box_nw.style.opacity+=0.1;
		}
		else {
			box_nw.style.opacity = 0;
		}
	})*/
	$("#box_nw").bind("touchend mouseup", function(e) {
		pause_nw();
		$("#box_nw").style.color = "green";
		e.stopPropagation();
		e.preventDefault();
	});
	$("#box_se").bind("touchstart mousedown", function(e) {
		play_se();
		$("#box_se").style.color = "green";
		e.stopPropagation();
		e.preventDefault();
	});
	$("#box_se").bind("touchend mouseup", function(e) {
		pause_se();
		$("#box_se").style.color = "orange";
		e.stopPropagation();
		e.preventDefault();
	});
	$("#box_ne").bind("touchstart mousedown", function(e) {
		play_ne();
		$("#box_ne").style.color = "purple";
		e.stopPropagation();
		e.preventDefault();
	});
	$("#box_ne").bind("touchend mouseup", function(e) {
		pause_ne();
		$("#box_ne").style.color = "red";
		e.stopPropagation();
		e.preventDefault();
	});
	$("#box_sw").bind("touchstart mousedown", function(e) {
		play_sw();
		$("#box_sw").style.color = "red";
		e.stopPropagation();
		e.preventDefault();
	});
	$("#box_sw").bind("touchend mouseup", function(e) {
		pause_sw();
		$("#box_sw").style.color = "purple";
		e.stopPropagation();
		e.preventDefault();
	});

	/*
	 * FUNCTIONS
	 */
	function play_se() {
		//Creation
		osc_se = T("konami");
		env_se = T("adsr", {a:500, d:500, s:1, r:1500});
		oe_se = T("OscGen", {osc:osc_se, env:env_se, mul:0.4}).play();

		//oe_se.allNoteOff();
		var n = pitches_se[Math.floor(Math.random()*pitches_se.length)] - 36;
		//var n = Math.floor(Math.random()*12 + 62-24);
		var v = Math.random()*30 + 70;
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
		//Creation: synth
		osc_nw = T("konami");
		env_nw = T("adsr", {a:10, d:300, s:0.25, r:700});
		oe_nw = T("OscGen", {osc:osc_nw, env:env_nw, mul:0.4}).play();

		//Creation: timer
		timer_nw = T("interval", {interval:interval_nw}, function(count) {
				//oe.noteOff(noteNum); //last noteNum from prev interval bang
				var noteNum = pitches_nw[Math.floor(Math.random()*pitches_nw.length)] - (12*Math.floor(Math.random()*4));
				var velocity = Math.random()*50 + 50;
				oe_nw.noteOn(noteNum, velocity);
		});

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
		//Creation: synth
		 osc_ne = T("sin");
		// env_ne = T("adsr", {a:100,d:250,s:0.6,r:500});
		 env_ne = T("adsr", {a:50, d:300, s:0.1, r:500});
		// env_ne = T("perc", {a:50, r:300});
		 oe_ne = T("OscGen", {osc:osc_ne, env:env_ne, mul:0.5}).play();
		 delay_ne = T("delay", {time:500, fb:0, mix:0.5}, oe_ne).play();
		 delay_ne_2 = T("delay", {time:750, fb:0, mix:0.25}, oe_ne).play();

		//Creation: timer
		timer_ne = T("interval", {interval:interval_ne}, function(count) {
				//oe_ne.allNoteOff();
				var noteNum = pitches_ne[Math.floor(Math.random()*pitches_ne.length)] +12; //+ (12*Math.floor(Math.random()*2));
				var velocity = Math.random()*50 + 50;
				oe_ne.noteOn(noteNum, velocity);
				/*setTimeout(function() {
					oe_ne.noteOff(noteNum);
					console.log(noteNum+" off");
				}, interval_ne*1.1);*/
		});


		//if (!timerOn) {
			timer_ne.start();
		//}
		//timerOn = true;
	}

	function pause_ne() {
		oe_ne.allNoteOff();
		timer_ne.stop();
	}

	function play_sw() {
		//Creation
		osc_sw = T("sin");
		env_sw = T("adsr", {a:300, d:500, s:1, r:2000});
		oe_sw = T("OscGen", {osc:osc_sw, env:env_sw, mul:0.75}).play();


		var n = pitches_sw[Math.floor(Math.random()*pitches_sw.length)];
		//var n = Math.floor(Math.random()*12 + 62-24);
		var v = Math.random()*20 + 80;
		var d = 2;
		oe_sw.noteOn(n, v/d);
		oe_sw.noteOn(n-12, v/d);
		oe_sw.noteOn(n-24, v/d);

		var dice = Math.floor(Math.random()*3);
		if (dice <= 1) {
			oe_sw.noteOn(n+2+12, v/d);
			oe_sw.noteOn(n+7, v/d);
		}
		else if (dice <=2) {
			oe_sw.noteOn(n+5+12, v/d);
			oe_sw.noteOn(n+7, v/d);
		}
		else {
			oe_sw.noteOn(n+5, v/d);
			oe_sw.noteOn(n+2+12, v/d);
		}
	}

	function pause_sw() {
		oe_sw.allNoteOff();
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
})();