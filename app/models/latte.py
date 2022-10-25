from .db import db
from sqlalchemy.sql import func

class Latte(db.Model):
    __tablename__ = 'lattes'

    id = db.Column(db.Integer, primary_key=True)
    latte = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.current_timestamp())
    donor_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    donatee_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    donor = db.relationship("User", back_populates="sentlattes")
    donatee = db.relationship("User", back_populates="receivedlattes")

    def to_dict(self):
        return {
            'id': self.id,
            'latte': self.latte,
            'comment': self.comment,
            'created_at': self.created_at,
            'donor_id': self.donor_id,
            'donatee_id': self.donatee_id
        }
