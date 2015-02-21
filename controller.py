# This file will contain server code that responds to user interaction, communicates with the model, and updates the view.

from flask import Flask, render_template, request, url_for, redirect, flash
from flask import session as flask_session
import model
import base64


app = Flask(__name__)

# TODO: Hide this.  
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
	# split DATAURL and ignore leading 'data:image/png;base64'
	_, b64data = str(request.form.get('data')).split(',')
	
	# decode base64 data string ensuring the length is a multiple of 4 bytes
	decoded_img = base64.urlsafe_b64decode(b64data + '=' * (4 - len(b64data) % 4))
	img_file = open('some_unique_name' + '.png', 'w')
	for line in decoded_img:
		img_file.write(line)
	img_file.close()

	return 'I made a file'


if __name__ == '__main__':
    app.run(debug=True)