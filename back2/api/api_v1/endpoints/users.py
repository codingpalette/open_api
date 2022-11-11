from typing import Union

from fastapi import Depends, FastAPI, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from core.config import settings
from crud import crud_user


router = APIRouter()

@router.get('')
async def get_test():

    print(settings.TOKEN_KEY)
    await crud_user.user.crud_test()
    return True