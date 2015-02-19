# This file contains server code that handles data and database information. 

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Binary, ForeignKey
from sqlalchemy.orm import sessionmaker, scoped_session, relationship, backref


ENGINE = create_engine("sqlite:///fractal_art.db", echo=True)
session = scoped_session(sessionmaker(bind=ENGINE, autocommit = False, autoflush = False))

Base = declarative_base()
Base.query = session.query_property()


# TODO: Standards for how long first_name and last_name strings be?
# TODO: Revisit whether these should or should not be nullable.
# TODO: Use a newer version for SQLAlchemy?

class User(Base):
    __tablename__= "users"
    id = Column(Integer, primary_key = True)
    first_name = Column(String(30), nullable = True)
    last_name = Column(String(30), nullable = True)
    email = Column(String(64), nullable = True)

    def __repr__(self):
        return "<User: id=%r first name=%s last name=%d email=%s" % (self.id, self.first_name, self.last_name, self.email)


class Image(Base):
    __tablename__="images"
    id = Column(Integer, primary_key = True)
    user_id = Column(Integer, ForeignKey('users.id'))
    #image = Column(Binary, nullable = False)


    user = relationship("User", backref=backref('images', order_by=id))

    def __repr__(self):
        return "<Image: id=%r user_id=%d" % (self.id, self.user_id)



if __name__ == "__main__":
    main()