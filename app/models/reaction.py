from .db import db

class Reaction(db.Model):
    __tablename__ = 'reactions'

    id = db.Column(db.Integer, primary_key=True)
    reaction = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey("comments.id"), nullable=False)

    users = db.relationship("User", back_populates="reactions")
    posts = db.relationship("Post", back_populates="reactions")
    comments = db.relationship("Comment", back_populates="reactions")

    def to_dict(self):
        return {
            "id":self.id,
            "reaction":self.reaction,
            "post_id":self.post_id,
            "user_id":self.user_id,
            "comment_id":self.comment_id
        }
