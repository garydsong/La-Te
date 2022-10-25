from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

from app.models import Post

def valid_post(form, field):
  post = field.data
  if len(post) < 4 or len(post) > 3000:
    raise ValidationError("Post must be between 1 and 3000 characters")

class PostForm(FlaskForm):
  post = StringField('Post', validators=[DataRequired(), valid_post])
  post_img = StringField('Post Image')
