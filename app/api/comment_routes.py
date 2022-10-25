from crypt import methods
from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import Comment, db, User, Reaction
from flask_login import current_user
from app.forms.post_form import CommentForm
from app.forms.reaction_form import ReactionForm

def validation_form_errors(validation_errors):
  errors = []
  for field in validation_errors:
    for err in validation_errors[field]:
      errors.append(f'{field}:{err}')
  return errors

comment_routes = Blueprint('posts', __name__)


## GET ALL COMMENTS
@comment_routes.route("/", methods=["GET"])
def get_reviews():
  comments = Comment.query.order_by(Comment.created_at.desc()).all()
  comment_list = []

  for comment in comments:
    owner = (User.query.filter(User.id == comment.user_id).one()).to_dict()
    comments_dict = comment.to_dict()
    comments_dict['owner'] = owner
    comment_list.append(comments_dict)

  return {"comments": [comment for comment in comment_list]}


## GET COMMENTS OF CURRENT USER
@comment_routes.route("/current", methods=["GET"])
def get_comments_of_curr_user():
  comments = Comment.query.filter(current_user.id == Comment.user_id).all()
  return {"comments": [comment.to_dict() for comment in comments]}


## EDIT COMMENT
@comment_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_comment(id):

  comment = Comment.query.get(id)

  if not comment:
    return {"message":"Comment could not be found", "statusCode":404}

  if current_user.id != comment.user_id:
    return {"message":"Forbidden", "statusCode":403}

  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    comment.nope = form.nope.data
    comment.comment = form.comment.data

    db.session.commit()

    return comment.to_dict()
  return {"errors": validation_form_errors(form.errors), "statusCode":401}


## DELETE A COMMENT
@comment_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_comment(id):
  comment = Comment.query.get(id)

  if not comment:
    return {"message": "Comment couldn't be found", "statusCode":404}

  if current_user.id != comment.user_id:
    return {"message":"Forbidden", "statusCode":403}
  db.session.delete(comment)
  db.session.commit()

  return {"message":"Successfully deleted", "statusCode":200}


## GET COMMENT BY ID
@comment_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_singular_comment(id):
  comment = Comment.query.get(id)

  if not comment:
    return {"message": "Comment couldn't be found", "statusCode":404}
  if current_user.id != comment.user_id:
    return {"message":"Forbidden", "statusCode":403}

  comment_dict = comment.to_dict()
  owner = (User.query.filter(User.id == comment.user_id).one()).to_dict()
  comment_dict['Owner'] = owner

  return comment_dict

## ADD AN REACTION TO A COMMENT VIA ID
@comment_routes.route('/<int:id>/reactions', methods=["POST"])
@login_required
def add_reaction(id):
  comment = Comment.query.get(id)

  ## ERROR HANDLING NON-EXISTENT COMMENT
  if not comment:
    return {"message": "Comment coulnd't be found.", "statusCode": 404}

  form = ReactionForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    reaction = Reaction(
      comment_id = id,
      reaction = form.url.data,
      user_id = current_user.id
    )

    db.session.add(reaction)
    db.session.commit()

    return reaction.to_dict()
  return {"errors": validation_form_errors(form.errors), "statusCode": 401}
