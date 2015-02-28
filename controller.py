# This file contains server code that responds to user interaction, communicates with the model, and updates the view.

from flask import Flask, render_template, request, url_for, redirect, flash
from flask import session as flask_session
from model import User, Image
from utils import decode_img

# Q: only import the specific methods used from these modules?
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
	# a list of image objects
	images = Image.query.limit(15).all()
	return render_template('gallery.html', images = images)


@app.route('/save', methods=['POST'])
def save_img():
	boto.set_stream_logger('boto')

	s3 = boto.connect_s3()

	# access secret keys
	AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
	AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']

	# Q: should I not be doing this every time?
	# create a new bucket
	bucket = s3.create_bucket('fractal-art')

	_, b64data = str(request.form.get('data')).split(',')

	decoded_img = decode_img(b64data)

	filename = str(uuid.uuid4()) + '.png'

	# create a new key/value pair
	key = bucket.new_key(filename)
	key.set_contents_from_string(decoded_img)

	return 'successful upload'

# saves images to file system on disk
# @app.route('/save', methods=['POST'])
# def save_img():
# 	# get dataURL from draw_to_canvas.js and convert from unicode to string
# 	# split dataURL and ignore leading 'data:image/png;base64'
# 	_, b64data = str(request.form.get('data')).split(',')

# 	# decode base64 data string ensuring the length is a multiple of 4 bytes
# 	decoded_img = decode_img(b64data)

# 	# TODO: UUID collision avoidence 
# 	# create random UUID, convert to string and add .png file extension
# 	filename = str(uuid.uuid4()) + '.png'

# 	path = '/Users/sarafalkoff/fractal-art/static/img_uploads'
# 	fullpath = os.path.join(path, filename)
	
# 	img_file = open(fullpath, 'wb')
	
# 	for line in decoded_img:
# 		img_file.write(line)
	
# 	img_file.close()

# 	img = Image(fullpath, filename)
	
# 	img.save()

# 	return "Image saved!"



# @app.route('/save', methods=['POST'])
# def tweet_img():
# pass

	



if __name__ == '__main__':
    app.run(debug=True)