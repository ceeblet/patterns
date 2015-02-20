function draw(){
	var canvas = document.getElementById('canvas');
	if (canvas.getContext){
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, 500, 500); // clear canvas
		drawTree(ctx, 250, 500, -90, 9, 1); // initiate chain of recursive calls
	}else{
		alert("HTML5 Canvas isn't supported by your browser!");
	}
}

function drawTree(context, x1, y1, angle, depth, delay){

	var BRANCH_LENGTH = random(0, 16);

	if (depth != 0){
		var x2 = x1 + (cos(angle) * depth * BRANCH_LENGTH);
		var y2 = y1 + (sin(angle) * depth * BRANCH_LENGTH);
	
		window.setTimeout(function(){
			drawLine(context, x1, y1, x2, y2, depth);
		}, 100 * delay);

		drawTree(context, x2, y2, angle - random(15, 20), depth - 1, delay * 1.2);
		drawTree(context, x2, y2, angle + random(15, 20), depth - 1, delay * 1.2);
	}
}

function drawLine(context, x1, y1, x2, y2, thickness){
	context.fillStyle   = '#000';
	context.strokeStyle = 'rgb(120, 80, 54)'; // brown		

	context.lineWidth = thickness;
	context.beginPath();

	context.moveTo(x1, y1);
	context.lineTo(x2, y2);

	context.closePath();
	context.stroke();
	context.save();
}

// TODO: Return to this
function cos (angle) {
	return Math.cos(deg_to_rad(angle));
}

function sin (angle) {
	return Math.sin(deg_to_rad(angle));
}

//TODO: Change to camelCase
function deg_to_rad(angle){
	return angle*(Math.PI/180.0);
}

function random(min, max){
	return min + Math.floor(Math.random()*(max+1-min));
}

// draw tree on mouse click
$("#canvas").on("click", draw);

// save canvas image as data url (png format by default)
function saveImgLocally() {
	var canvas = document.getElementById('canvas');
	var dataURL = canvas.toDataURL();
	// set canvasImg image src to dataURL so it can be saved as an image
	document.getElementById('canvasImg').src = dataURL;
}

// alerts user that their image has been saved 
// FIXME: duplicates flash in commented out function save_img()
$("#save").on("click", 
	function(evt){
		evt.preventDefault();
		alert("Saved!");
	});

