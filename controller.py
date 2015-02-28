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


# WIP: Make this route to save image url to s3
@app.route('/save', methods=['POST'])
def save_img():
	boto.set_stream_logger('boto')

	s3 = boto.connect_s3()

	# Access secret keys
	AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
	AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']

	# Q: should I not be doing this every time?
	# Create a new bucket
	bucket = s3.create_bucket('fractal-art')

	fp = '/Users/sarafalkoff/fractal-art/static/img_uploads/9ba91c79-312a-4f58-b040-2f92b34a1615.png'

	file_1 = open(fp)
	img_1 = file_1.read()


	# Create a new key/value pair
	key = bucket.new_key("Test_Img.png")
	key.set_contents_from_string(img_1)
	# key.set_contents_from_file

	# Retrieve the contents of 'mykey'
	print key.get_contents_as_string()
	return 'successful upload'


# import boto
# import cStringIO
# import urllib
# import Image

# #Retrieve our source image from a URL
# fp = urllib.urlopen('http://example.com/test.png')

# #Load the URL data into an image
# img = cStringIO.StringIO(fp.read())
# im = Image.open(img)

# #Resize the image
# im2 = im.resize((500, 100), Image.NEAREST)  

# #NOTE, we're saving the image into a cStringIO object to avoid writing to disk
# out_im2 = cStringIO.StringIO()
# #You MUST specify the file type because there is no file name to discern it from
# im2.save(out_im2, 'PNG')

# #Now we connect to our s3 bucket and upload from memory
# #credentials stored in environment AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
# conn = boto.connect_s3()

# #Connect to bucket and create key
# b = conn.get_bucket('example')
# k = b.new_key('example.png')

# #Note we're setting contents from the in-memory string provided by cStringIO
# k.set_contents_from_string(out_im2.getvalue())






 

# @app.route('/save', methods=['POST'])
# def tweet_img():
# pass

	



if __name__ == '__main__':
    app.run(debug=True)