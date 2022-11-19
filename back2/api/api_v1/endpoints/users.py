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


@router.get('/me')
async def user_me(request: Request):
    return request.state.user


@router.get('/query')
async def user_query(text: Optional[str] = ''):
    return JSONResponse(status_code=200, content={"result": "success", "data": text})


@router.get('/check')
async def user_check():
    return True


@router.post('/create', summary="유저 회원가입")
async def user_create(post_data: schemas.user.UserJoin):
    # 유저 검색
    user_info = await user_service.user_find_one(post_data.user_login_id)
    # 유저가 있다면 회원가입 실패
    if user_info:
        return JSONResponse(status_code=401, content={"result": "fail", "data": "이미 가입된 아이디 입니다."})

    hashed_password = bcrypt.hashpw(post_data.user_password.encode('utf-8'), bcrypt.gensalt())
    save_password = hashed_password.decode('utf-8')
    await user_service.user_create(post_data.user_login_id, save_password)

    return {"result": "success", "message": "회원가입 성공", }


@router.post('/login', summary="유저 로그인")
async def user_login(post_data: schemas.user.UserLogin):
    # 아이디가 있는지 검사
    user_info = await user_service.user_find_one(post_data.user_login_id)
    if not user_info:
        return JSONResponse(status_code=401, content={"result": "fail", "message": "존재하지 않는 아이디 입니다"})
    # 비밀번호 체크
    password_check = bcrypt.checkpw(post_data.user_password.encode('utf-8'), user_info['user_password'].encode('utf-8'))
    if not password_check:
        return JSONResponse(status_code=401, content={"result": "fail", "message": "비밀번호가 틀립니다"})

    del(user_info["user_password"])
    access_token = token.create_token("access_token", user_info)
    refresh_token = token.create_token('refresh_token')
    # print('access_token', access_token)
    # print('refresh_token', refresh_token)
    # 리프레시 토큰 업데이트
    token_update = await user_service.user_refresh_token_update(user_info["user_login_id"], refresh_token)
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
