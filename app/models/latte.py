from .db import db
from sqlalchemy.sql import func

user_lattes = db.Table(
    "user_lattes",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column("latte_id", db.Integer, db.ForeignKey('lattes.id'), primary_key=True)
)

class Latte(db.Model):
    __tablename__ = 'lattes'

    id = db.Column(db.Integer, primary_key=True)
    latte = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.current_timestamp())
    donor_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    users = db.relationship("User", secondary=user_lattes, back_populates="lattes")


    def to_dict(self):
        return {
            'id': self.id,
            'latte': self.latte,
            'comment': self.comment,
            'created_at': self.created_at,
            'donor_id': self.donor_id,
        }
