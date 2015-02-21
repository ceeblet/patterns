# This file contains server code that handles data and database information. 

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, BLOB, ForeignKey
from sqlalchemy.orm import sessionmaker, scoped_session, relationship, backref


ENGINE = create_engine('sqlite:///fractal_art.db', echo=True)
db_session = scoped_session(sessionmaker(bind=ENGINE, autocommit = False, autoflush = False))

Base = declarative_base()
Base.query = db_session.query_property()


def create_db():
    '''Creates a new database when called'''
    Base.metadata.create_all(ENGINE)

# Q: Remove?
def connect():
    global ENGINE
    global Session

    ENGINE = create_engine('sqlite:///fractal_art.db', echo=True)
    Session = sessionmaker(bind=ENGINE)

    return Session()


# TODO: Standards for how long first_name and last_name strings be?
# TODO: Revisit whether these should or should not be nullable.
class User(Base):
    __tablename__= 'users'
    id = Column(Integer, primary_key = True)
    first_name = Column(String(30), nullable = True)
    last_name = Column(String(30), nullable = True)
    email = Column(String(65), nullable = True)

    def save(self):
        db_session.add(self)
        db_session.commit()

    def __repr__(self):
        return '<User: id=%r first name=%s last name=%s email=%s' % (self.id, self.first_name, self.last_name, self.email)


# FIXME: This class needs to be updated. Will pass image to DB as reference to file. Potentially user for a filename. 
class Image(Base):
    __tablename__= 'images'
    id = Column(Integer, primary_key = True)
    user_id = Column(Integer, ForeignKey('users.id'))
    filename = Column(String(50), nullable = False)
    title = Column(String(100), nullable = True)

    user = relationship('User', backref = backref('images', order_by = id))

    def save(self):
        db_session.add(self)
        db_session.commit()

    def __repr__(self):
        return '<Image: id=%r user_id=%r filename=%s title=%s' % (self.id, self.user_id, self.filename, self.title)


# Q: Remove once DB established?
def main():
    connect()
    pass 


if __name__ == '__main__':
    main()