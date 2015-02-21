# This file will contain server code that responds to user interaction, communicates with the model, and updates the view.

from flask import Flask, render_template, request, url_for, redirect, flash
from flask import session as flask_session
import model


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
   
@app.route('/save')
def save_img():
	# gets the DATAURL from draw_to_canvas.js
	img = request.form.get("data")
	#Goal: Create a file with the img in it, following this idea (but not this syntax)
		# f = open('some_unique_name.png', "a")
		# f.write(img)
		# f.close()



if __name__ == '__main__':
    app.run(debug=True)