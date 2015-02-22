import model
from model import db_session

def add_image_to_db(session, filepath, filename):
    image = model.Image()
    image.filepath = filepath
    image.filename = filename
    image.save()
   