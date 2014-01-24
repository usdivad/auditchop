(function() {
	//Doesn't work in iOS Safari
	/*	
	var osc = T("pulse");
	var env = T("perc", {a:50, r:2500});
	var oscenv = T("OscGen", {osc:osc, env:env, mul:0.15}).play();
	*/

	//Works in iOS Safari
	var osc;
	var env;
	var oscenv;
	var timer;
	
	function k() {
		
		//Works in iOS Safari (w/ local var declaration or outer one)
		osc = T("pulse");
		env = T("perc", {a:50, r:2500});
		oscenv = T("OscGen", {osc:osc, env:env, mul:0.15}).play();
		
		timer = T("interval", {interval:500}, function(count) {
		  var noteNum  = 69 + [0, 2, 4, 5, 7, 9, 11, 12][count % 8];
		  var velocity = 64 + (count % 64);
		  oscenv.noteOn(noteNum, velocity);
		}).start();
	}
	function k_stop() {
		timer.stop();
	}

	$("#box_nw").bind("touchstart mousedown", function(e) {
		k();
	});
	$("#box_nw").bind("touchend mouseup", function(e) {
		k_stop();
	});
})();



/*
THEREIN LIES THE PROBLEM:
you have to declare the T() object WITHIN the function!!
*/