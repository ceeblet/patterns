
var ctx; // global variable


// global variable
var canvas = document.getElementById('canvas');


function setCanvasContext() {
	if (canvas.getContext) {
		ctx = canvas.getContext('2d');
	} else {
		alert("Oh no! HTML5 Canvas isn't supported by your browser.");
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
		ctx.clearRect(0, 0, 1000, 700); // clear canvas
		Tree.drawTree(500, 475, Tree.orientation, Tree.depth, delay); // initiate chain of recursive calls
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
	},
	getRandomInt: function(min, max) {
  		return Math.floor(Math.random() * (max - min)) + min;
	}
}



function drawLine(x1, y1, x2, y2) {
	
	ctx.strokeStyle = '#' + Tree.hex;	
	ctx.lineJoin = 'bevel';	
	ctx.lineWidth = Tree.branchThickness;
	
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.closePath();
	
	ctx.stroke();
	ctx.save();
}


// branch thickness slider
$("#thickSlider").slider({max: 5, min: 1, value: 3});
$("#thickSlider").on("slide", function(event, ui) {
	Tree.branchThickness = ui.value;
	Tree.draw(0); // draw tree with new branch thickness
});

// branch length slider
$("#lengthSlider").slider({max: 30, min: 6, value: 18});
$("#lengthSlider").on("slide", function(event, ui) {
	Tree.branchLength = ui.value;
	Tree.draw(0); // draw tree with new branch length
});


// depth slider
$("#depthSlider").slider({max: 12, min: 4, value: 8});
$("#depthSlider").on("slide", function(event, ui) {
	Tree.depth = ui.value;
	Tree.draw(0); // draw tree with new depth
});


// branch angle slider
$("#angleSlider").slider({max: 360, min: -360, value: 0});
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
$("#orientationSlider").slider({max: 180, min: -180, value: 0});
$("#orientationSlider").on("slide", function(event, ui) {
	Tree.orientation = ui.value;
	Tree.draw(0); // draw tree with new orientation
});

// draw in red
$("#red-swatch").on("click", function(event) {
	hex = "B80000";
	Tree.hex = hex; 
	Tree.draw(0); 

});

// draw in yellow
$("#yellow-swatch").on("click", function(event) {
	hex = "CCFF33";
	Tree.hex = hex; 
	Tree.draw(0); 

});

// draw in pink
$("#forest-green-swatch").on("click", function(event) {
	hex = "009601";
	Tree.hex = hex; 
	Tree.draw(0); 

});

// draw in green
$("#green-swatch").on("click", function(event) {
	hex = "4AD900";
	Tree.hex = hex; 
	Tree.draw(0); 

});

// draw in blue
$("#blue-swatch").on("click", function(event) {
	hex = "33CCFF";
	Tree.hex = hex; 
	Tree.draw(0); 

});

// draw in orange
$("#orange-swatch").on("click", function(event) {
	hex = "CC3300";
	Tree.hex = hex; 
	Tree.draw(0); 

});

// draw in purple
$("#purple-swatch").on("click", function(event) {
	hex = "8904b1";
	Tree.hex = hex; 
	Tree.draw(0); 
});

// draw in dark blue
$("#dark-blue-swatch").on("click", function(event) {
	hex = "1833BF";
	Tree.hex = hex; 
	Tree.draw(0); 
});

// draw in dark purple
$("#dark-purple-swatch").on("click", function(event) {
	hex = "59137C";
	Tree.hex = hex; 
	Tree.draw(0); 
});

// draw in pale turquoise 
$("#pale-turquoise-swatch").on("click", function(event) {
	hex = "AEEEEE";
	Tree.hex = hex; 
	Tree.draw(0); 
});

// draw in pale purple
$("#pale-purple-swatch").on("click", function(event) {
	hex = "DFB0E7";
	Tree.hex = hex; 
	Tree.draw(0); 
});

// draw in gold
$("#gold-swatch").on("click", function(event) {
	hex = "ffa700;";
	Tree.hex = hex; 
	Tree.draw(0); 
});



// set flag
var clicked = false;

$("#canvas").on("click", function(event) {
	
	clicked = !clicked;
	
	if (clicked) {
		// draw tree on mousemove with no delay, so it appears to change immediately with mouse movement
		$("#canvas" ).mousemove(function(event) {
			
			if (Date.now() % 5 == 0) {
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
	Tree.depth = 11;
	Tree.orientation = -90;
	Tree.hex = "CCFF33"; 
	Tree.tilt = 0;
	Tree.branchAngle = 18;
	Tree.branchThickness = 1;
	Tree.branchLength = 6; 

	Tree.draw(1);
});


// clear canvas on click 
$("#clearCanvas").on("click", function(event) {
	ctx.clearRect(0, 0, 1000, 700);
	$("#canvas").unbind("mousemove");
	
	// resent values
	Tree.hex = undefined;
	Tree.depth = true;
	Tree.orientation = undefined;
	Tree.tilt = undefined;
	Tree.branchAngle = undefined;
	Tree.branchLength = undefined;
	Tree.branchThickness = undefined;
});


// activate add to gallery modal
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').focus()
  })


// hide success notification
$("#addToGallery").on("click", function(event){
	$("#savedAlert").hide();
})


// save image to gallery and save user information in database
$("#saveToGallery").on("click", function(event){

	var dataURL = canvas.toDataURL(); // save image as base64 string

	var formData = $("#save-form").serializeArray()

	data = {'imgData': dataURL}

	for (var i=0; i<formData.length; i++){
		data[formData[i].name] = formData[i].value

	}
	// submit POST request to '/save' route in controller.py
	$.post('/save', data, function(d){
	
		// display a success notification, then remove it
		$("#savedAlert").show();
		$('#savedAlert').delay(1000).fadeOut();

		// redirect to gallery
		window.location.replace("http://localhost:5000/gallery");
	});
});


// activate 'Start' button tooltip
$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})



// start unique animation on each page load 
window.onload = function() {
	
	var colorArray = ["b3001e", "CCFF33", "CC0099", "00FF00", "33CCFF", "CC3300", "8904B1", "2E2EFE"];

	Tree.depth = drawMath.getRandomInt(10, 12);
	Tree.orientation = drawMath.getRandomInt(-90, -180);
	Tree.hex = colorArray[drawMath.getRandomInt(0, 8)];
	Tree.tilt = -90;
	Tree.branchAngle = drawMath.getRandomInt(-360, 360);
	Tree.branchThickness = drawMath.getRandomInt(1, 3);
	Tree.branchLength = drawMath.getRandomInt(10, 15);
	Tree.draw(1);
};




