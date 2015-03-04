//TODO: refactor to avoid using these globals!

// global variables
var ctx;


// WIP: event object
// var treeParams = new Object;
// treeParams["ctx"] = "tempValue";   // undefined
// treeParams["hex"] = "tempValue";
// treeParams["branchWidth"] = "tempValue";
// treeParams["branchLength"] = "tempValue";



var Tree = {
	hex: undefined,
	branchWidth: undefined,
	branchLength: undefined,

	// draw: function () {
	// 	this.branchWidth ..
	// },

	// drawBranch: function () {
	// 	this.draw
	// }


}




var canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');




// stuff for color picker slider
function hexFromRGB(r, g, b) {
	var rgb_hex = [
	  r.toString( 16 ),
	  g.toString( 16 ),
	  b.toString( 16 )
	];
	$.each( rgb_hex, function( nr, val ) {
	  if ( val.length === 1 ) {
	    rgb_hex[ nr ] = "0" + val;
	  }
	});
	
	// returns hex values for red, green, and blue sliders
	return rgb_hex.join( "" ).toUpperCase();
}

function refreshSwatch() {
	var red = $( "#red" ).slider( "value" );
	var green = $( "#green" ).slider( "value" );
	var blue = $( "#blue" ).slider( "value" );

	// creates one hex code with the combined rgb color values
	hex = hexFromRGB( red, green, blue );
	
	treeParams.hex = hex; //testing
	draw(20, 12, 0, hex); //testing

	// sets swatch backbround to user selected color 
	$( "#swatch" ).css( "background-color", "#" + hex );

}

//document ready event prevents jQuery from loading before document has loaded
$(function() {
	$( "#red, #green, #blue" ).slider({
	  orientation: "horizontal",
	  range: "min",
	  max: 255,
	  value: 127,
	  slide: refreshSwatch,
	  change: refreshSwatch
	});
	$( "#red" ).slider( "value", 255 );
	$( "#green" ).slider( "value", 140 );
	$( "#blue" ).slider( "value", 60 );
});
//end color picker slider


// // branch length slider
// $(function() {
// 	$("#slider").slider({max: 16, min: 0, value: 8});
// 	$("#slider").on("slide", function(event, ui) {
// 		branchLength = ui.value;
// 	});
// });
// // end branch length slider

$(function() { 
	var canvas = document.getElementById('canvas');
	if (canvas.getContext){
		ctx = canvas.getContext('2d');
	}else{
		alert("HTML5 Canvas isn't supported by your browser!");
	}
});


// create tree
function draw(branchWidth, branchLength, delay, hex){
		ctx.clearRect(0, 0, 700, 600); // clear canvas
		drawTree(ctx, 350, 600, -90, branchWidth, branchLength, 9, delay); // initiate chain of recursive calls
	
}

function drawTree(context, x1, y1, angle, branchWidth, branchLength, depth, delay){
//function drawTree(context, x1, y1, angle, depth, delay){
	//var BRANCH_LENGTH = random(0, 18);
	
	if (depth != 0){
		//var x2 = x1 + (cos(angle) * depth * BRANCH_LENGTH);
		//var y2 = y1 + (sin(angle) * depth * BRANCH_LENGTH);

		var x2 = x1 + (cos(angle) * depth * branchLength);
		var y2 = y1 + (sin(angle) * depth * branchLength);
		window.setTimeout(function(){
			drawLine(context, x1, y1, x2, y2, depth, hex);
		}, 100 * delay);
	
		// drawTree(context, x2, y2, angle - random(15, 20), depth - 1, delay * 1.2);
		// drawTree(context, x2, y2, angle + random(15, 20), depth - 1, delay * 1.2);
		drawTree(context, x2, y2, angle + branchWidth, branchWidth, branchLength, depth - 1, delay * 1.2);
		drawTree(context, x2, y2, angle - branchWidth, branchWidth, branchLength, depth - 1, delay * 1.2);

	}
}

function drawLine(context, x1, y1, x2, y2, thickness, color){
	context.fillStyle   = '#000';
	context.strokeStyle = '#' + hex;		

	context.lineWidth = thickness;
	context.beginPath();

	context.moveTo(x1, y1);
	context.lineTo(x2, y2);

	context.closePath();
	context.stroke();
	context.save();
}

function cos (angle) {
	return Math.cos(deg_to_rad(angle));
}

function sin (angle) {
	return Math.sin(deg_to_rad(angle));
}

function deg_to_rad(angle){
	return angle*(Math.PI/180.0);
}

function random(min, max){
	return min + Math.floor(Math.random()*(max+1-min));
}


// var drawMath = {
// 	cos: function(angle) {
// 		return ...
// 	},

// 	sin: function(angle) {
// 		return ...,
// 	}
// }


// draw tree on mouse click with delay so it appears to grow
var clicked = false;
$("#canvas").on("click", function(event) {
	clicked = !clicked;
	if (clicked) {
		draw(20, 12, 1, hex); 
	// draw tree on mousemove with no delay, so it appears to change immediately with mouse movement
		$("#canvas" ).mousemove(function(event) {
			if (Date.now() % 5 == 0){
				var xCord = event.clientX;
			 	var yCord = event.clientY;
			
			 	console.log("hex inside mousemove=", hex); //testing

			 	// pass scaled coordinates to draw() as branchWidth and branchLength respectively
			 	draw(xCord/30, yCord/45, 0, hex);
			}
		});
	}
	//turn off mouse movement
	if (!clicked) {
		$( "#canvas").unbind( "mousemove" );
	}

});

// end create tree


// clear canvas on mouse click and unbind mousemove event
$("#clearCanvas").on("click", function(evt) {
	ctx.clearRect(0, 0, 700, 600);
	$( "#canvas").unbind( "mousemove" );
});


// save image as base64 string, 
// submit POST request to '/save' route in controller.py
// alert user image has saved
$("#save").on("click", function(evt){
		var canvas = document.getElementById('canvas');
		var dataURL = canvas.toDataURL(); // a string
		$.post('/save', {'data': dataURL}, function(d){
			alert("Saved!");
			});
});




// Model for form to pop up on 'save' to get more user info. Use ajax.
// $("#save").on("click", 
// 	info = promptUserForInfo();
// 	sendPictureToServer(info);

// 	});

// function sendPictureToServer(userInfo) {
// 		var canvas = document.getElementById('canvas');
// 		var dataURL = canvas.toDataURL();
// 		//document.getElementById('canvasImg').src = dataURL;
// 		$.post('/save', {data: dataURL}, function(d){
// 			alert("Saved!");
// 			});
// }