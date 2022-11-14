from typing import Union
from fastapi import Depends, FastAPI, HTTPException, status, APIRouter
from fastapi.responses import JSONResponse
from core.config import settings
from crud import crud_user
from starlette.requests import Request
import schemas
from functions.token import token
import datetime

router = APIRouter()


@router.get('/me')
async def user_me(request: Request):
    return request.state.user

@router.get('/check')
async def user_check():
    return True

@router.post('/test')
async def user_test():

    return True

@router.post('/login')
async def user_login(post_data: schemas.user.UserLogin):
    user_info = await crud_user.user.user_login(post_data)
    access_token = token.create_token("access_token", user_info)
    refresh_token = token.create_token('refresh_token')
    print('access_token', access_token)
    print('refresh_token', refresh_token)
    token_update = await crud_user.user.user_refresh_token_update(user_info, refresh_token)
    if token_update:
        access_token_time = datetime.datetime.utcnow() + datetime.timedelta(days=settings.ACCESS_TOKEN_TIME)
        refresh_token_time = datetime.datetime.utcnow() + datetime.timedelta(days=settings.REFRESH_TOKEN_TIME)
        content = {"result": "success", "message": "로그인 성공"}
        response = JSONResponse(content=content)
        response.set_cookie(
            key="access_token",
            value=access_token,
            secure=True,
            httponly=True,
            expires=access_token_time.strftime("%a, %d %b %Y %H:%M:%S GMT"),
        )
        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            secure=True,
            httponly=True,
            expires=refresh_token_time.strftime("%a, %d %b %Y %H:%M:%S GMT"),
        )
        return response
    else:
        raise HTTPException(status_code=401, detail={"result": "fail", "message": "로그인에 실패했습니다."})
