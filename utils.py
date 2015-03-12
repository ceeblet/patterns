# This file contains utility functions

import base64


def decode_img(img):
	'''decode a base64 data string ensuring the length is a multiple of 4 bytes'''
	
	decoded_img = base64.urlsafe_b64decode(img + '=' * (4 - len(img) % 4))

	return decoded_img



# def send_email(subject, sender, recipients, text_body, html_body):
#     msg = Message(subject, sender=sender, recipients=recipients)
#     msg.body = text_body
#     msg.html = html_body
#     mail.send(msg)