# This file will contain server code that responds to user interaction, communicates with the model, and updates the view.

from flask import Flask, render_template, request, url_for, redirect, flash
from flask import session as flask_session
import model
import base64


app = Flask(__name__)

#TODO: Hide this.  
app.secret_key = 'fU0Og5yop7EddZQOGUE$FMENpdw1'

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/gallery')
def gallery():
    return render_template('gallery.html')
   
@app.route('/save', methods=['POST'])
def save_img():
	# get DATAURL from draw_to_canvas.js and convert from unicode to string
	img = str(request.form.get("data"))
	print type(img)
	print img[-10:]
	b64img = base64.urlsafe_b64decode(img)
	fractal_img = open("test.png", "w")
	for line in b64img:
		fractal_img.write(line)
	return "I made a file"

	#Goal: Create a file with the img in it, following this idea (but not this syntax)
		# f = open('some_unique_name.png', "a")
		# f.write(img)
		# f.close()
	



if __name__ == '__main__':
    app.run(debug=True)