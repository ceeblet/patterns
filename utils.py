import base64


def decode_img(img):
	'''decode a base64 data string ensuring the length is a multiple of 4 bytes'''
	
	decoded_img = base64.urlsafe_b64decode(img + '=' * (4 - len(img) % 4))

	return decoded_img



