from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import User, db, Latte
from ..forms.signup_form import SignUpForm
from ..forms.latte_form import LatteForm
from ..forms.update_user_form import UpdateUserForm

def validation_form_errors(validation_errors):
  errors = []
  for field in validation_errors:
    for err in validation_errors[field]:
      errors.append(f'{field}:{err}')
  return errors

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


## EDIT A USER
@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_a_user(id):
  user = User.query.get(id)
  if not user:
    return {"message":"User couldn't be found", "statusCode":404}

  if user.id != current_user.id:
    return {"message":"Forbidden", "statusCode":403}

  form = UpdateUserForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  print('*********************user route hitting')
  if form.validate_on_submit():

    user.first_name = form.first_name.data
    user.last_name = form.last_name.data
    user.username = form.username.data
    user.email = form.email.data
    user.city = form.city.data
    user.state = form.state.data
    user.avatar = form.avatar.data
    user.bio = form.bio.data
    user.cover_img = form.cover_img.data
    user.website = form.website.data

    db.session.commit()

    updated_user = user.to_dict()

    return updated_user
  return {"errors": validation_form_errors(form.errors), "statusCode":401}


## CREATE A LATTE
@user_routes.route("/<int:id>/lattes", methods=["POST"])
@login_required
def create_latte(id):
  form = LatteForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():

    latte = Latte(
        donor_id = current_user.id,
        latte = form.latte.data,
        comment = form.comment.data,
        donatee_id = id
    )

    db.session.add(latte)
    db.session.commit()

    new_latte = latte.to_dict()
    return new_latte

  return {"errors": validation_form_errors(form.errors), "statusCode":401}

## GET A LATTE BASED ON USER ID
@user_routes.route('/<int:id>/lattes', methods=["GET"])
def get_latte_by_user(id):

  ##ERROR HANDLING NON-EXISTING USER
  user = User.query.get(id)
  if not user:
    return {"message": "User couldn't be found.", "statusCode":404}

  ## FILTERING LATTES BY USER ID
  lattes_lst = []
  lattes = Latte.query.filter(Latte.donor_id == id).order_by(Latte.created_at.desc()).all()
  print('\n\n\n\n\n\n ----lattes----', lattes)
  for latte in lattes:
    latte_dict = latte.to_dict()

    ## FINDING THE OWNER OF EACH LATTE BY USER ID
    owner = (User.query.filter(User.id == latte.donor_id).one()).to_dict()
    latte_dict['Owner'] = owner

    lattes_lst.append(latte_dict)
  return jsonify(lattes_lst)
