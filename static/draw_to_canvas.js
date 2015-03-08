
var ctx; // global variable


// global variable
var canvas = document.getElementById('canvas');


function setCanvasContext() {
	if (canvas.getContext) {
		ctx = canvas.getContext('2d');
	} else {
		alert("HTML5 Canvas isn't supported by your browser!");
	}
}

setCanvasContext();


// global class
var Tree = {
	
	hex: undefined,
	depth: true,
	orientation: undefined,
	tilt: undefined,
	branchAngle: undefined,
	branchLength: undefined,
	branchThickness: undefined,
	
	draw: function(delay) {
		ctx.clearRect(0, 0, 700, 600); // clear canvas
		Tree.drawTree(350, 600, Tree.orientation, Tree.depth, delay); // initiate chain of recursive calls
	},
	
	drawTree: function(x1, y1, angle, depth, delay) {
		if (depth != 0){
			var x2 = x1 + (drawMath.cos(angle) * depth * Tree.branchLength);
			var y2 = y1 + (drawMath.sin(angle) * depth * Tree.branchLength);
			
			window.setTimeout(function() {drawLine(x1, y1, x2, y2); }, 100 * delay);

			Tree.drawTree(x2, y2, angle + Tree.branchAngle + Tree.tilt, depth - 1, delay * 1.2);
			Tree.drawTree(x2, y2, angle - Tree.branchAngle + Tree.tilt, depth - 1, delay * 1.2);
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
	}
}



function drawLine(x1, y1, x2, y2) {
	
	ctx.strokeStyle = '#' + Tree.hex;	
	// ctx.strokeStyle = '#000000';	
	ctx.lineJoin = 'bevel';	
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
$("#thickSlider").slider({max: 5, min: 1, value: 3});
$("#thickSlider").on("slide", function(event, ui) {
	Tree.branchThickness = ui.value;
	Tree.draw(0); // draw tree with new branch thickness
});

// branch length slider
$("#lengthSlider").slider({max: 30, min: 5, value: 12});
$("#lengthSlider").on("slide", function(event, ui) {
	Tree.branchLength = ui.value;
	Tree.draw(0); // draw tree with new branch length
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

// tilt slider
$("#tiltSlider").slider({max: 90, min: -90, value: 0});
$("#tiltSlider").on("slide", function(event, ui) {
	Tree.tilt = ui.value;
	Tree.draw(0); // draw tree with new depth
});


// orientation slider
$("#orientationSlider").slider({max: -10, min: -180, value: -90});
$("#orientationSlider").on("slide", function(event, ui) {
	Tree.orientation = ui.value;
	Tree.draw(0); // draw tree with new orientation
});




var clicked = false;

$("#canvas").on("click", function(event) {
	
	clicked = !clicked;
	
	if (clicked) {
		// draw tree on mousemove with no delay, so it appears to change immediately with mouse movement
		$("#canvas" ).mousemove(function(event) {
			
			if (Date.now() % 5 == 0){
				var xCord = event.clientX;
			 	var yCord = event.clientY;
			
			 	Tree.branchAngle = xCord/30;
			 	Tree.branchLength = yCord/30;

			 	Tree.draw(0);
			}
		});
	}

	// turn off mouse movement
	if (!clicked) {
		$( "#canvas").unbind( "mousemove" );
	}

});

// cleate tree on click
$("#createImg").on("click", function(event) {

	// default values for image
	Tree.depth = 9;
	Tree.orientation = -90;
	Tree.hex = "fcee21"; 
	Tree.tilt = 0;
	Tree.branchAngle = 18;
	Tree.branchThickness = 3;
	Tree.branchLength = 12; 

	Tree.draw(1);
});


// clear canvas on click 
$("#clearCanvas").on("click", function(event) {
	ctx.clearRect(0, 0, 700, 600);
	$( "#canvas").unbind( "mousemove" );
});


// activate add to gallery modal
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').focus()
  })


// hide success notification
$("#addToGallery").on("click", function(event){
	$("#savedAlert").hide();
})

// save image to gallery
$("#saveToGallery").on("click", function(event){

		var dataURL = canvas.toDataURL(); // save image as base64 string
		
		// submit POST request to '/save' route in controller.py
		$.post('/save', {'data': dataURL}, function(d){
			
			// display a success notification, then remove it
			$("#savedAlert").show();
			$('#savedAlert').delay(1000).fadeOut();
		});

});






// Tree with random branch length:
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



