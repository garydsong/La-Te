from .db import db
from sqlalchemy.sql import func

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.current_timestamp())
    updated_at = db.Column(db.DateTime(timezone=True),
                           onupdate=func.current_timestamp())
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)


    users = db.relationship("User", back_populates="comments")
    post = db.relationship("Post", back_populates="comments")
    reactions = db.relationship("Reaction", foreign_keys='Reaction.comment_id', back_populates="comments")

    def to_dict(self):
        return {
            'id': self.id,
            'comment': self.comment,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user_id': self.user_id,
            'post_id': self.post_id,
        }
