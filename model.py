# This file contains server code that handles data and database information. 

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import sessionmaker, scoped_session


ENGINE = create_engine("sqlite:///fractal_art.db", echo=True)
session = scoped_session(sessionmaker(bind=ENGINE, autocommit = False, autoflush = False))

Base = declarative_base()
Base.query = session.query_property()


# TODO: Standards for how long first_name and last_name strings be?
class User(Base):
    __tablename__= "users"
    id = Column(Integer, primary_key = True)
    first_name = Column(String(30), nullable = True)
    last_name = Column(String(30), nullable = True)
    email = Column(String(64), nullable = True)

    def __repr__(self):
        return "<User: id=%r first name=%s last name=%d email=%s" % (self.id, self.first_name, self.last_name, self.email)


# TODO: Create class 'Image' to store images. Import Foreign Key and backref to link images in Image class to users in User.


if __name__ == "__main__":
    main()