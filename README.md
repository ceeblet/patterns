#Patterns

Patterns is a space to create, share, and admire abstract art inspired by fractal patterns found in nature. Begin with a tree on your canvas, and watch it transform into surprising and unexpected shapes with the movement of your mouse. Save your masterpieces to a public art gallery, and while you’re there, be sure to take a look around.

**Technology Stack:** 
JavaScript, jQuery, HTML, CSS, Python, Flask, SQLAlchemy, SQLite, AWS S3 API, Boto

## What It Does & How It Works

#### Creating Patterns

Patterns are composed of a series of lines drawn to the HTML5 canvas element. When a user clicks `start`,
`window.setTimeout()` is used to execute a line drawing function over a period of time. This makes a tree appear to grow on their screen. Every pattern a user creates originates from this tree.

![image](/static/images/home.png) 

The following code snippet shows the Tree class along with it's attributes and methods. 

```javascript

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

```

##Getting Started

Clone or fork this repo: 

```
https://github.com/sfalkoff/patterns.git

```

Create and activate a virtual environment inside your project directory: 

```

virtualenv env

source env/bin/activate

```

Install the requirements:

```
pip install -r requirements.txt

```

Get your own secrect keys for [AWS S3] (http://aws.amazon.com/s3/) and save them to a file `s3_keys.sh`. Your file should look something like this:

```
export AWS_ACCESS_KEY_ID='YOURSECRETKEYIDHERE'
export AWS_SECRET_ACCESS_KEY='YOURSECRETACCESSKEYHERE'

```
	
Source your secret keys:

```
source s3_keys.sh

```

Run the app:

```
python controller.py

```
Navigate to `localhost:5000/home` to create your own patterns!

##Future Plans

Check out the [issues log for this project] (https://github.com/sfalkoff/patterns/issues) to see what's up next.

##About Sara

Sara came to Hackbright with a background in project management, marketing, and customer service for startups. She's currently looking for full-stack software engineering positions where she can be a part of an awesome team. Check out her [LinkedIn profile] (https://www.linkedin.com/in/sarafalkoff) to learn more. Thanks for stopping by!



