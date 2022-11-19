from typing import Union, Optional
from fastapi import Depends, FastAPI, HTTPException, status, APIRouter
from fastapi.responses import JSONResponse
from core.config import settings
from crud.crud_user import user_service
from starlette.requests import Request
import schemas
from functions.token import token
import datetime
import bcrypt

router = APIRouter()


@router.get('')
async def test():
    print(test)
    return True