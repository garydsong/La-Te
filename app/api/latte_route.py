from crypt import methods
from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import Latte, db, User
from flask_login import current_user
from app.forms.latte_form import LatteForm

def validation_form_errors(validation_errors):
  errors = []
  for field in validation_errors:
    for err in validation_errors[field]:
      errors.append(f'{field}:{err}')
  return errors

latte_routes = Blueprint('lattes', __name__)

## GET ALL LATTES
@latte_routes.route("/", methods=["GET"])
def get_lattes():
  lattes = Latte.query.all()
  latte_list = []

  for latte in lattes:
    owner = (User.query.filter(User.id == latte.donor_id).one()).to_dict()
    lattes_dict = latte.to_dict()
    lattes_dict['owner'] = owner
    latte_list.append(lattes_dict)

  return {"lattes": [latte for latte in latte_list]}

## GET LATTES OF CURRENT USER
@latte_routes.route("/current", methods=["GET"])
def get_lattes_of_curr_user():
  latte_list = []
  lattes = Latte.query.filter(current_user.id == Latte.donatee_id).all()
  # lattes_dict = {"latte": [latte.to_dict() for latte in lattes]}
  for latte in lattes:
    owner = (User.query.filter(User.id == latte.donor_id).one()).to_dict()
    lattes_dict = latte.to_dict()
    lattes_dict['owner'] = owner
    latte_list.append(lattes_dict)

  return {"latte": [latte for latte in latte_list]}


## GET LATTE BY ID
@latte_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_singular_latte(id):
  latte = Latte.query.get(id)

  if not latte:
    return {"message": "Latte couldn't be found", "statusCode":404}
  if current_user.id != latte.user_id:
    return {"message":"Forbidden", "statusCode":403}

  latte_dict = latte.to_dict()
  owner = (User.query.filter(User.id == latte.user_id).one()).to_dict()
  latte_dict['Owner'] = owner

  return latte_dict
