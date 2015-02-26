# This file contains server code that responds to user interaction, communicates with the model, and updates the view.

from flask import Flask, render_template, request, url_for, redirect, flash
from flask import session as flask_session
from model import User, Image
from utils import decode_img

# Q: only import the specific methods used from these modules?
import base64, os, uuid, twitter


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
	# get dataURL from draw_to_canvas.js and convert from unicode to string
	# split dataURL and ignore leading 'data:image/png;base64'
	_, b64data = str(request.form.get('data')).split(',')

	# decode base64 data string ensuring the length is a multiple of 4 bytes
	decoded_img = decode_img(b64data)

	# TODO: UUID collision avoidence 
	# create random UUID, convert to string and add .png file extension
	filename = str(uuid.uuid4()) + '.png'

	path = '/Users/sarafalkoff/fractal-art/static/img_uploads'
	fullpath = os.path.join(path, filename)
	
	img_file = open(fullpath, 'wb')
	
	for line in decoded_img:
		img_file.write(line)
	
	img_file.close()

	img = Image(fullpath, filename)
	
	img.save()

	return "Image saved!"

# @app.route('/save', methods=['POST'])
# def tweet_img():

# 	# access secret keys
# 	TWITTER_CONSUMER_KEY = os.environ['TWITTER_CONSUMER_KEY']
# 	TWITTER_CONSUMER_SECRET = os.environ['TWITTER_CONSUMER_SECRET']
# 	TWITTER_ACCESS_TOKEN = os.environ['TWITTER_ACCESS_TOKEN']
# 	TWITTER_ACCESS_TOKEN_SECRET = os.environ['TWITTER_ACCESS_TOKEN_SECRET']

# 	api = TwitterAPI(
# 	    consumer_key=TWITTER_CONSUMER_KEY,
# 	    consumer_secret=TWITTER_CONSUMER_SECRET,
# 	    access_token_key=TWITTER_ACCESS_TOKEN,
# 	    access_token_secret=TWITTER_ACCESS_TOKEN_SECRET
# 	)

# 	file = open('f0a15dea-eb53-42e5-9948-2c057b201f07.png', 'rb')
# 	data = file.read()

# 	r = api.request('statuses/update_with_media', {'status':'test tweet'}, {'media[]':data})
# 	print(r.status_code)

	



if __name__ == '__main__':
    app.run(debug=True)