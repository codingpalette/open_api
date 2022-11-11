from typing import Union
from fastapi import Depends, FastAPI, HTTPException, status, APIRouter
from core.config import settings
from crud import crud_user
import schemas
from functions.token import functions

router = APIRouter()


fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "fakehashedsecret",
        "disabled": False,
    },
    "alice": {
        "username": "alice",
        "full_name": "Alice Wonderson",
        "email": "alice@example.com",
        "hashed_password": "fakehashedsecret2",
        "disabled": True,
    },
}

@router.get('')
async def get_test():

    print(settings.TOKEN_KEY)
    await crud_user.user.crud_test()
    return True

@router.post('/login')
async def user_login(post_data: schemas.user.UserLogin):
    print(post_data)
    functions.create_token()
    return True