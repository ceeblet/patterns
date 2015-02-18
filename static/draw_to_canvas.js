function draw(){
	var canvas = document.getElementById('canvas');
	if (canvas.getContext){
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0,0,500,500); // clear canvas
		//window.requestAnimationFrame(draw);
		drawTree(ctx,250,500,-90,8); 
	}else{
		alert("HTML5 Canvas isn't supported by your browser!");
	}
}

function drawTree(context, x1, y1, angle, depth){

	var BRANCH_LENGTH = random(0, 16);

	if (depth != 0){
		var x2 = x1 + (cos(angle) * depth * BRANCH_LENGTH);
		var y2 = y1 + (sin(angle) * depth * BRANCH_LENGTH);

		drawLine(context, x1, y1, x2, y2, depth);
		drawTree(context, x2, y2, angle - random(15,20), depth - 1);
		drawTree(context, x2, y2, angle + random(15,20), depth - 1);
	}
}

function drawLine(context, x1, y1, x2, y2, thickness){
	context.fillStyle   = '#000';
	context.strokeStyle = 'rgb(120, 80, 54)'; // brown		

	context.lineWidth = thickness;
	context.beginPath();

	context.moveTo(x1,y1);
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

function deg_to_rad(angle){
	return angle*(Math.PI/180.0);
}

function random(min, max){
	return min + Math.floor(Math.random()*(max+1-min));
}


// draw tree on mouse click
$("#canvas").on("click", draw);




