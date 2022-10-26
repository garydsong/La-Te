from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .latte import user_lattes


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(20), nullable=False)
    state = db.Column(db.String(15), nullable=False)
    avatar = db.Column(db.String(100), nullable=False)
    bio = db.Column(db.String(2000), nullable=False)
    cover_img = db.Column(db.String(100), nullable=False)
    website = db.Column(db.String(100), nullable=False)

    posts = db.relationship("Post", back_populates="users")
    comments = db.relationship("Comment", back_populates="users")
    # followers = db.relationship("Follower", back_populates="follower")
    # followeds = db.relationship("Follower", back_populates="followed")

    lattes = db.relationship("Latte", secondary=user_lattes, back_populates="users")
    reactions = db.relationship("Reaction", back_populates="users")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
            'city': self.city,
            'state': self.state,
            'avatar': self.avatar,
            'bio': self.bio,
            'cover_img': self.cover_img,
            'website': self.website
        }
