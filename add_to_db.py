import model
from model import db_session

def add_image_to_db(session, filename, title):
    image = model.Image()
    image.filename = filename
    image.title = title
    image.save
   