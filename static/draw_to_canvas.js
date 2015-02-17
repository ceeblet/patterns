function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
  } else {
  	return "Oh no! Your browser doesn't support HTML5 Canvas."
  }
    ctx.beginPath();
    ctx.moveTo(250,300);
    ctx.lineTo(250,200);
    ctx.lineTo(200,125);
    ctx.moveTo(250,200);
    ctx.lineTo(300,125);
    ctx.stroke();
 }

 $("#canvas").on("click", draw);

// Recursive Python Fractal Tree:
// def tree(branchLen,t):
//     if branchLen > 5:
//         t.forward(branchLen)
//         t.right(20)
//         tree(branchLen-15,t)
//         t.left(40)
//         tree(branchLen-15,t)
//         t.right(20)
//         t.backward(branchLen)


// }
