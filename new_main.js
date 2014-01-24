(function() {
	//NW
	var osc_nw = T("konami");
	var env_nw = T("adsr", {a:10, d:300, s:0.25, r:700});
	var oe_nw = T("OscGen", {osc:osc_nw, env:env_nw, mul:0.4});
	oe_nw.play();
	play_nw();
	//oe_nw.start();

	//var box_nw = document.getElementById("box_nw");
	$("#box_nw").bind("touchstart mousedown", function(e) {
		play_nw();

		//window.setTimeout(function() {
			box_nw.style.color = "orange";
		//}, 50);
		/*e.stopPropagation();
		e.preventDefault();*/
		console.log("bind");
	});

	$("#box_nw").bind("touchend mouseup", function(e) {
		pause_nw();
		box_nw.style.color = "green";
		/*e.stopPropagation();
		e.preventDefault();*/
	});

	function play_nw() {
		/*osc_nw = T("konami");
		env_nw = T("adsr", {a:10, d:300, s:0.25, r:700});
		oe_nw = T("OscGen", {osc:osc_nw, env:env_nw, mul:0.4}).play();*/
		oe_nw.noteOn(80, 100);
		console.log("play");
		console.log(oe_nw);
	}
	function pause_nw() {
		oe_nw.allNoteOff();
	}

})();