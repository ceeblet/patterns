# This file contains server code that responds to user interaction, communicates with the model, and updates the view.

from flask import Flask, render_template, request, url_for, redirect, flash
from flask import session as flask_session
from model import User, Image
from utils import decode_img

import base64, os, uuid, boto


app = Flask(__name__)


# TODO: hide this  
app.secret_key = 'fU0Og5yop7EddZQOGUE$FMENpdw1'


@app.route('/home')
def home():
    
    return render_template('home.html')


@app.route('/about')
def about():
    
    return render_template('about.html')


@app.route('/gallery')
def gallery():

	images = Image.query.order_by(Image.id.desc()).limit(24).all() # a list of image objects
	
	return render_template('gallery.html', images = images)



@app.route('/save', methods=['POST'])
def save_img():
	
	'''Saves user information to database and saves user created image to database and s3'''

	# step1: get user information and save it to database:
	name = request.form.get('name')

	company = request.form.get('company')

	email = request.form.get('email')

	new_user = User(name=name, company=company, email=email)

	new_user.save()


	# step 2: get user created image and save it to database:
	
	boto.set_stream_logger('boto')

	# create a connection to s3Connection object
	s3 = boto.connect_s3()

	# access secret keys
	AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
	AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']

	# create new bucket if named bucket does not exist and return exisiting bucket if it already exists
	bucket = s3.create_bucket('fractal-art')

	# get dataURL from draw_to_canvas.js and convert from unicode to string
	# split dataURL and ignore leading 'data:image/png;base64'
	_, b64data = str(request.form.get('imgData')).split(',')

	# decode base64 data string ensuring the length is a multiple of 4 bytes
	decoded_img = decode_img(b64data)

	path = 'https://s3.amazonaws.com/fractal-art/'

	# create unique file name for user image
	filename = str(uuid.uuid4()) + '.png'

	# create full filepath (a url) for user image
	fullpath = os.path.join(path, filename)

	# create a new s3 key/value pair
	key = bucket.new_key(filename)
	key.set_contents_from_string(decoded_img)

	# set access so image will be available for public display
	key.set_acl('public-read-write')

	# instantiate instance of Image class
	img = Image(fullpath, filename)
	
	# save image details to database
	img.save()

	return 'successful upload'








if __name__ == '__main__':
    app.run(debug=True)
 




	