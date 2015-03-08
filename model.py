# This file contains server code that handles data and database information. 

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import sessionmaker, scoped_session, relationship, backref


ENGINE = create_engine('sqlite:///fractal_art.db', echo=True)
db_session = scoped_session(sessionmaker(bind=ENGINE, autocommit = False, autoflush = False))

Base = declarative_base()
Base.query = db_session.query_property()


def create_db():
    '''Creates a new database when called'''
    Base.metadata.create_all(ENGINE)


# def connect():
#     global ENGINE
#     global Session

#     ENGINE = create_engine('sqlite:///fractal_art.db', echo=True)
#     Session = sessionmaker(bind=ENGINE)

#     return Session()


class User(Base):
    __tablename__= 'users'
    id = Column(Integer, primary_key = True)
    name = Column(String(65), nullable = True)
    company = Column(String(65), nullable = True)
    email = Column(String(65), nullable = True)

    def save(self):
        db_session.add(self)
        db_session.commit()

    def __repr__(self):
        return '<User: id=%r name=%s company=%s email=%s>' % (self.id, self.name, self.company, self.email)


class Image(Base):
    __tablename__= 'images'
    id = Column(Integer, primary_key = True)
    user_id = Column(Integer, ForeignKey('users.id'))
    filepath = Column(String(200), nullable = False) # a url
    filename = Column(String(100), nullable = True)
    created_at = Column(DateTime, nullable = True)

    user = relationship('User', backref = backref('images', order_by = id))

    def __init__(self, filepath, filename):
        self.filepath = filepath
        self.filename = filename

    def save(self):
        db_session.add(self)
        db_session.commit()

    def __repr__(self):
        return '<Image: id=%r user_id=%r filepath=%s filename=%s created_at=%s>' % (self.id, self.user_id, self.filepath, self.filename, self.created_at)


# def main():
#     connect()


if __name__ == '__main__':
    main()