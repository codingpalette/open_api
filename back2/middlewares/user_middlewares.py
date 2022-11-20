from starlette.requests import Request
from fastapi.responses import JSONResponse
from functions.token import token


class UserMiddlewares:
    async def access_control(self, request: Request, call_next):
        url = request.url.path
        method = request.method
        cookies = request.cookies
        access_token = cookies.get("access_token")
        if method == "GET":
            check_list = ['/api/v1/users/me']
            if url in check_list:
                token_info = await token.token_check(access_token)
                if token_info:
                    request.state.user = token_info
                else:
                    return JSONResponse(status_code=401, content={"result": "fail", "message": "로그인 후 가능합니다."})

        response = await call_next(request)
        return response

    async def not_logged_in(self, request: Request, call_next):
        url = request.url.path
        method = request.method
        cookies = request.cookies
        access_token = cookies.get("access_token")

        if method == "POST":
            check_list = ['/api/v1/users/login', '/api/v1/user/create']
            if url in check_list:
                token_info = await token.token_check(access_token)
                if token_info:
                    return JSONResponse(status_code=401, content={"result": "fail", "message": "로그아웃 후 가능합니다."})

        response = await call_next(request)

        return response

    async def logged_in(self, request: Request, call_next):
        url = request.url.path
        method = request.method
        cookies = request.cookies
        access_token = cookies.get("access_token")

        if method == "POST":
            check_list = ['/api/v1/users/test', '/api/v1/users/logout']
            if url in check_list:
                token_info = await token.token_check(access_token)
                if token_info:
                    request.state.user = token_info
                else:
                    return JSONResponse(status_code=401, content={"result": "fail", "message": "로그인 후 가능합니다."})

        elif method == "GET":
            check_list = ['/api/v1/users/token_refresh']
            if url in check_list:
                token_info = await token.token_check(access_token)
                if token_info:
                    request.state.user = token_info
                else:
                    return JSONResponse(status_code=401, content={"result": "fail", "message": "로그인 후 가능합니다."})

        response = await call_next(request)

        return response


user_middlewares = UserMiddlewares()
