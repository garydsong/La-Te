# from .db import db

# class Follower(db.Model):
#     __tablename__ = 'followers'

#     id = db.Column(db.Integer, primary_key=True)
#     follower_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
#     followed_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

#     follower = db.relationship("User", back_populates="followers")
#     followed = db.relationship("User", back_populates="followeds")

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'follower_id': self.follower_id,
#             'followed_id': self.followed_id
#         }
