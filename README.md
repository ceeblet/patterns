#Patterns

Patterns is a space to create, share, and admire abstract art inspired by fractal patterns found in nature. Create a tree on your canvas, and watch it transform into surprising and unexpected shapes with the movement of your mouse. Save your masterpiece to a public gallery, and see other users' creations.


####Technology Stack
JavaScript, jQuery, HTML, CSS, AJAX, Python, Flask, Jinja, SQLAlchemy, SQLite, AWS S3 API, Boto

![image](/static/images/home.png) 


#### Creating Patterns

Every pattern is composed of a series of lines drawn to the HTML5 canvas element. When a user clicks <kbd>Start</kbd>,
`window.setTimeout()` is used to execute a recursive line drawing function over a period of time. This makes a tree appear to grow on the screen. Every pattern a user creates originates from this tree.

<p align="center">
  <img align="center" src="/static/images/create-pattern.gif" alt="Home-Page">
</p>


The following code snippet from <kbd>static/draw_to_canvas.js</kbd> shows the class, Tree, from which each unique pattern is instantiated. The value of an attribute is set when a user makes an action that corresponds to that attribute. Possible actions include: moving a slider to the left or right, clicking a color button, and moving the mouse anywhere inside the canvas element. The values of each Tree attribute are used in the drawTree() method; different combinations result in a diverse collection of patterns.


When a user makes an action that changes the value(s) of any one or more Tree attributes, the entire pattern is redrawn by calling Tree.draw() with no delay. This animation gives users the ability to have dynamic interactions with the patterns they create.


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
		ctx.clearRect(0, 0, 1000, 700); 
		Tree.drawTree(500, 475, Tree.orientation, Tree.depth, delay); 
	},
	
	drawTree: function(x1, y1, angle, depth, delay) {
		if (depth != 0){
			var x2 = x1 + (drawMath.cos(angle) * depth * Tree.branchLength);
			var y2 = y1 + (drawMath.sin(angle) * depth * Tree.branchLength);
			
			window.setTimeout(function() {drawLine(x1, y1, x2, y2);}, 100 * delay);

			Tree.drawTree(x2, y2, angle + Tree.branchAngle + Tree.tilt, depth - 1, delay * 1.2);
			Tree.drawTree(x2, y2, angle - Tree.branchAngle + Tree.tilt, depth - 1, delay * 1.2);
		}
	}			
}

```
Here are a few examples of patterns a user might create:

![image](/static/images/blue.png) 
![image](/static/images/yellow.png) 
![image](/static/images/purple.png) 

#### Saving & Sharing Patterns

Users can save the patterns they create to a public art gallery. When a user clicks <kbd>Save</kbd>, the pattern they created is assigned a UUID file name and securely saved to the AWS S3 cloud storage platform. The pattern file path (a url reference to its location on S3) is saved to an SQLite database. A query for a list of the most recently saved pattern urls is used to retrieve the pattern images and populate the gallery. Here is a sneak peek of the gallery page -- users can click on any image in the gallery to view it full screen or begin scrolling through the gallery pattern by pattern.

<p align="center">
  <img align="center" src="/static/images/gallery.gif" alt="Gallery-Page">
</p>



##Get Patterns Running on Your Machine

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

Get your own secret keys for [AWS S3] (http://aws.amazon.com/s3/) and save them to a file <kbd>keys.sh</kbd>. You should also set your own secret key for Flask. Your file should look something like this:

```
export AWS_ACCESS_KEY_ID='YOURSECRETKEYIDHERE'
export AWS_SECRET_ACCESS_KEY='YOURSECRETACCESSKEYHERE'
export FLASK_SECRET_KEY='YOURFLASKSECRECTKEY'

```
	
Source your secret keys:

```
source keys.sh

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



