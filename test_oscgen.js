(function() {
	function k() {
		var osc = T("pulse");
		var env = T("perc", {a:50, r:2500});
		var oscenv = T("OscGen", {osc:osc, env:env, mul:0.15}).play();

		T("interval", {interval:500}, function(count) {
		  var noteNum  = 69 + [0, 2, 4, 5, 7, 9, 11, 12][count % 8];
		  var velocity = 64 + (count % 64);
		  oscenv.noteOn(noteNum, velocity);
		}).start();
	}

	$("#box_nw").click(function() {
		k();
	});
})();