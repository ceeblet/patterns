# This file contains server code that responds to user interaction, 
# communicates with the model, 
# and updates the view.

from flask import Flask, render_template, request, url_for, redirect, flash
from flask import session as flask_session

from model import User, Image
from utils import decode_img
#from flask.ext.sendmail import Mail, Message

import base64, os, uuid, boto


app = Flask(__name__)
#mail = Mail(app)


app.secret_key = os.environ['FLASK_SECRET_KEY']


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
	
	'''Saves user information to database; saves user created image to s3 and filepath url to database'''

	# Step1: get user information and save it to the database:
	
	name = request.form.get('name')

	company = request.form.get('company')

	email = request.form.get('email')

	user = User(name=name, company=company, email=email)

	user.save()

	# get current user's id (to use as foreign key in images table)
	user_id = user.id



	# Step 2: get user created image and save it:
	
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
	img = Image(fullpath, filename, user_id)
	
	# save image details to database
	img.save()


	# This feature has been removed because gmail has blocked the messages in an effort to prevent "unsolicited mail"
	# Step 3: send user an email with the image 
	# msg = Message("Great Meeting You at Hackbright Demo Day!",
 #                  sender="my.email@gmail.com",
 #                  recipients=[email])

	# msg.html = "<p>Hi " + name + "," + "<p> Thanks for chatting with me today! Here is the image we created with \
	# 	<a href = 'https://github.com/sfalkoff/patterns'> Patterns</a> during our conversation. \
	# 	I'm happy to answer any additional questions you may have for me! </p>" + "<img src=" + fullpath + ">" \
	# 	+ "<p> Thanks again! <br> Sara <br><br> </p>"
	# mail.send(msg)


	return 'successful upload'





if __name__ == '__main__':
    app.run(debug=True)
 




	