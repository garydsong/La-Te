from .db import db


class Latte(db.Model):
    __tablename__ = 'lattes'

    id = db.Column(db.Integer, primary_key=True)
    latte = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(1000), nullable=False)
    donor_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    donatee_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    donor = db.relationship("User", back_populates="lattes")
    donatee = db.relationship("User", back_populates="lattes")

    def to_dict(self):
        return {
            'id': self.id,
            'latte': self.latte,
            'comment': self.comment,
            'donor_id': self.donor_id,
            'donatee_id': self.donatee_id
        }
