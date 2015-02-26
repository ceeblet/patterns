# This file contains utility functions

import base64

import twitter, os


def decode_img(img):
	'''decode a base64 data string ensuring the length is a multiple of 4 bytes'''
	
	decoded_img = base64.urlsafe_b64decode(img + '=' * (4 - len(img) % 4))

	return decoded_img


def tweet():
   # Access secret keys
    TWITTER_CONSUMER_KEY = os.environ['TWITTER_CONSUMER_KEY']
    TWITTER_CONSUMER_SECRET = os.environ['TWITTER_CONSUMER_SECRET']
    TWITTER_ACCESS_TOKEN = os.environ['TWITTER_ACCESS_TOKEN']
    TWITTER_ACCESS_TOKEN_SECRET = os.environ['TWITTER_ACCESS_TOKEN_SECRET']

    api = twitter.Api(
        consumer_key=TWITTER_CONSUMER_KEY,
        consumer_secret=TWITTER_CONSUMER_SECRET,
        access_token_key=TWITTER_ACCESS_TOKEN,
        access_token_secret=TWITTER_ACCESS_TOKEN_SECRET
    )

    # Post to Twitter
    media_status = api.PostMedia(status="Test tweet please ignore.", media='/Users/sarafalkoff/fractal-art/static/img_uploads/fb97b23c-80be-4ec6-b17f-69505d024a65.png', possibly_sensitive=None, in_reply_to_status_id=None, latitude=None, longitude=None, place_id=None, display_coordinates=False)
	
	