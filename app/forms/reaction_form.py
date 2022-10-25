from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, NumberRange

from app.models import Reaction

class ReactionForm(FlaskForm):
  reaction = IntegerField('Reaction', validators=[DataRequired(), NumberRange(min=1, max=5, message="Must be a valid Reaction")])
