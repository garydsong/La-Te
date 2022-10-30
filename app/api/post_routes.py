from crypt import methods
from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import Post, db, User, Reaction, Comment
from flask_login import current_user
from app.forms.post_form import PostForm
from app.forms.reaction_form import ReactionForm
from app.forms.comment_form import CommentForm

def validation_form_errors(validation_errors):
  errors = []
  for field in validation_errors:
    for err in validation_errors[field]:
      errors.append(f'{field}:{err}')
  return errors

post_routes = Blueprint('posts', __name__)


## GET ALL POSTS
@post_routes.route("/", methods=["GET"])
def get_reviews():
  posts = Post.query.order_by(Post.created_at.desc()).all()
  post_list = []

  for post in posts:
    owner = (User.query.filter(User.id == post.user_id).one()).to_dict()
    posts_dict = post.to_dict()
    posts_dict['owner'] = owner
    post_list.append(posts_dict)

  return {"posts": [post for post in post_list]}


## GET POSTS OF CURRENT USER
@post_routes.route("/current", methods=["GET"])
def get_posts_of_curr_user():
  posts = Post.query.filter(current_user.id == Post.user_id).all()
  return {"posts": [post.to_dict() for post in posts]}


## EDIT POST
@post_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_post(id):

  post= Post.query.get(id)

  if not post:
    return {"message":"Post could not be found", "statusCode":404}

  if current_user.id != post.user_id:
    return {"message":"Forbidden", "statusCode":403}

  form = PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    post.post_img = form.post_img.data
    post.post = form.post.data

    db.session.commit()

    return post.to_dict()
  return {"errors": validation_form_errors(form.errors), "statusCode":401}


## DELETE A POST
@post_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_post(id):
  post = Post.query.get(id)

  if not post:
    return {"message": "Post couldn't be found", "statusCode":404}

  if current_user.id != post.user_id:
    return {"message":"Forbidden", "statusCode":403}
  db.session.delete(post)
  db.session.commit()

  return {"message":"Successfully deleted", "statusCode":200}


## GET POST BY ID
@post_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_singular_post(id):
  post = Post.query.get(id)

  if not post:
    return {"message": "Post couldn't be found", "statusCode":404}
  if current_user.id != post.user_id:
    return {"message":"Forbidden", "statusCode":403}

  post_dict = post.to_dict()
  owner = (User.query.filter(User.id == post.user_id).one()).to_dict()
  post_dict['Owner'] = owner

  return post_dict


## ADD AN REACTION TO A POST VIA ID
@post_routes.route('/<int:id>/reactions', methods=["POST"])
@login_required
def add_reaction(id):
  post = Post.query.get(id)

  ## ERROR HANDLING NON-EXISTENT POST
  if not post:
    return {"message": "Post coulnd't be found.", "statusCode": 404}

  form = ReactionForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    reaction = Reaction(
      post_id = id,
      reaction = form.url.data,
      user_id = current_user.id
    )

    db.session.add(reaction)
    db.session.commit()

    return reaction.to_dict()
  return {"errors": validation_form_errors(form.errors), "statusCode": 401}


## CREATE A COMMENT FOR POST VIA ID
@post_routes.route('/<int:id>/comments', methods=["POST"])
@login_required ## must be logged in to leave a review
def create_review(id):
  post = Post.query.get(id)

  ##ERROR HANDLING NON-EXISTING POST
  if not post:
    return {"message": "post couldn't be found.", "statusCode":404}

  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():

    comment = Comment(
      user_id = current_user.id,
      post_id = id,
      comment = form.comment.data
    )

    db.session.add(comment)
    db.session.commit()

    return comment.to_dict()
  return {"errors": validation_form_errors(form.errors), "statusCode":401}

## CREATE A POST
@post_routes.route("/", methods=["POST"])
@login_required
def create_post():
  form = PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():

    post = Post(
      post = form.post.data,
      post_img = form.post_img.data,
      user_id = current_user.id
    )
    db.session.add(post)
    db.session.commit()

    new_post = post.to_dict()
    return new_post

  return {"errors": validation_form_errors(form.errors), "statusCode":401}
