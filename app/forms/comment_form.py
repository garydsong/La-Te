from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

from app.models import Comment

def valid_comment(form, field):
  comment = field.data
  if len(comment) < 1 or len(comment) > 3000:
    raise ValidationError("Comment must be between 1 and 1000 characters")

class CommentForm(FlaskForm):
  comment = StringField('Comment', validators=[DataRequired(), valid_comment])
