
var ctx; // global variable


// global variable
var canvas = document.getElementById('canvas');

	
// TODO: put this in a function?
// set canvas context
if (canvas.getContext) {
	ctx = canvas.getContext('2d');
} else {
	alert("HTML5 Canvas isn't supported by your browser!");
}


// global class
var Tree = {
	
	hex: undefined,
	depth: true,
	branchAngle: undefined,
	branchWidth: undefined,
	branchLength: undefined,
	branchThickness: undefined,
	
	draw: function(delay) {
		ctx.clearRect(0, 0, 700, 600); // clear canvas
		Tree.drawTree(350, 600, -90, Tree.depth, delay); // initiate chain of recursive calls
	},
	
	drawTree: function(x1, y1, angle, depth, delay) {
		if (depth != 0){
			var x2 = x1 + (drawMath.cos(angle) * depth * Tree.branchLength);
			var y2 = y1 + (drawMath.sin(angle) * depth * Tree.branchLength);
			
			window.setTimeout(function() {drawLine(x1, y1, x2, y2); }, 100 * delay);

			Tree.drawTree(x2, y2, angle + Tree.branchAngle, depth - 1, delay * 1.2);
			Tree.drawTree(x2, y2, angle - Tree.branchAngle, depth - 1, delay * 1.2);
		}
	}			
}


// global class
var drawMath = {
	
	cos: function(angle) {
		return Math.cos(drawMath.deg_to_rad(angle));
	},
	sin: function(angle) {
		return Math.sin(drawMath.deg_to_rad(angle));
	},
	deg_to_rad: function(angle) {
		return angle*(Math.PI/180.0);
	},
	random: function (min, max) {
		return min + Math.floor(Math.random()*(max+1-min));
	}	
}



function drawLine(x1, y1, x2, y2) {
	
	ctx.strokeStyle = '#' + Tree.hex;		
	ctx.lineWidth = Tree.branchThickness;
	
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.closePath();
	
	ctx.stroke();
	ctx.save();
}



// color picker slider
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

	Tree.hex = hex; // sets hex to current slider swatch value
	
	Tree.draw(0); // draw tree with new color

	// sets swatch backbround to user selected color 
	$( "#swatch" ).css( "background-color", "#" + hex );

}

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

//end color picker slider


// branch thickness slider
$("#thickSlider").slider({max: 10, min: 1, value: 3});
$("#thickSlider").on("slide", function(event, ui) {
	Tree.branchThickness = ui.value;
	Tree.draw(0); // draw tree with new branch thickness
});


// depth slider
$("#depthSlider").slider({max: 12, min: 5, value: 9});
$("#depthSlider").on("slide", function(event, ui) {
	Tree.depth = ui.value;
	Tree.draw(0); // draw tree with new depth
});


// branch angle slider
$("#angleSlider").slider({max: 360, min: -360, value: 10});
$("#angleSlider").on("slide", function(event, ui) {
	Tree.branchAngle = ui.value;
	Tree.draw(0); // draw tree with new angles
});



// draw tree on mouse click with delay so it appears to grow
var clicked = false;

$("#canvas").on("click", function(event) {
	
	clicked = !clicked;
	if (clicked) {

		Tree.depth = 9;
		Tree.branchAngle = 18;
		Tree.branchThickness = 3;
		Tree.branchLength = 12; 
		Tree.branchWidth = 20;
		
		Tree.draw(1); 
		console.log("Tree obj inside of 'clicked':", Tree);
	
		// draw tree on mousemove with no delay, so it appears to change immediately with mouse movement
		$("#canvas" ).mousemove(function(event) {
			
			if (Date.now() % 5 == 0){
				var xCord = event.clientX;
			 	var yCord = event.clientY;
			
			 	Tree.branchWidth = xCord/30;
			 	Tree.branchLength = yCord/45;

			 	Tree.draw(0);
			}
		});
	}

	// turn off mouse movement
	if (!clicked) {
		$( "#canvas").unbind( "mousemove" );
	}

});



// clear canvas on mouse click 
$("#clearCanvas").on("click", function(event) {
	ctx.clearRect(0, 0, 700, 600);
	$( "#canvas").unbind( "mousemove" );
});



// save image to gallery
$("#save").on("click", function(event){
		
		var canvas = document.getElementById('canvas');
		var dataURL = canvas.toDataURL(); // save image as base64 string
		
		// submit POST request to '/save' route in controller.py
		$.post('/save', {'data': dataURL}, function(d){
			alert("Saved!"); // alert user image has saved
			});
});


























// Things I may use later:

// // branch length slider
// $(function() {
// 	$("#slider").slider({max: 16, min: 0, value: 8});
// 	$("#slider").on("slide", function(event, ui) {
// 		branchLength = ui.value;
// 	});
// });
// // end branch length slider


// Tree with random branch length
// function drawTree(context, x1, y1, angle, depth, delay){
// 	var BRANCH_LENGTH = random(0, 18);
// 	if (depth != 0){
// 		var x2 = x1 + (cos(angle) * depth * BRANCH_LENGTH);
// 		var y2 = y1 + (sin(angle) * depth * BRANCH_LENGTH);
// 		window.setTimeout(function(){
// 			drawLine(context, x1, y1, x2, y2, depth, hex);
// 		}, 100 * delay);
// 		drawTree(context, x2, y2, angle - random(15, 20), depth - 1, delay * 1.2);
// 		drawTree(context, x2, y2, angle + random(15, 20), depth - 1, delay * 1.2);	
// 	}
// }


// If I have multiple trees:
// draw: function () {
// 	this.branchWidth ..
// },

// drawBranch: function () {
// 	this.draw
// }



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