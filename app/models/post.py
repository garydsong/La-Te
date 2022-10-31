from .db import db
from sqlalchemy.sql import func

class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    post = db.Column(db.String(3000), nullable=False)
    post_img = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.current_timestamp())
    updated_at = db.Column(db.DateTime(timezone=True),
                           onupdate=func.current_timestamp())
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    users = db.relationship("User", back_populates="posts")
    comments = db.relationship("Comment", back_populates="post", cascade='all, delete')
    reactions = db.relationship("Reaction", back_populates="posts", cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'post': self.post,
            'post_img': self.post_img,
            'created_at': self.created_at,
            'update_at': self.updated_at,
            'user_id': self.user_id
        }
