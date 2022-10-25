from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, NumberRange

from app.models import Latte

def valid_comment(form, field):
  comment = field.data
  if len(comment) < 1 or len(comment) > 1000:
    raise ValidationError("Comment must be between 1 and 1000 characters")

class LatteForm(FlaskForm):
  comment = StringField('Comment', validators=[DataRequired(), valid_comment])
  latte = IntegerField('Latte', validators=[DataRequired(), NumberRange(min=1, max=500, message="Donated latte must be between 1 and 500")])
