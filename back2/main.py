from fastapi import FastAPI, Depends, HTTPException, status
from typing import Optional
import uvicorn
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.middleware.cors import CORSMiddleware
from api.api_v1.api import api_router
from api.api_v1.table_api import table_api_router
from core.config import settings
from middlewares.user_middlewares import user_middlewares



description = f"""
<div>
    -------------------------------<br>
    <a href="/docs">[ 기본api ]</a><br>
    <a href="{settings.API_V1_STR}/table/docs">[ 테이블api ]</a><br>
    -------------------------------
</div>
"""

def create_app():
    app = FastAPI(title="기본api", description=description)
    table_app = FastAPI(title="테이블api", description=description)

    origins = [
        'http://localhost:3000',
        'http://localhost:8000',
    ]

    access_control_middleware = user_middlewares.access_control
    not_logged_in_middleware = user_middlewares.not_logged_in
    logged_in_middleware = user_middlewares.logged_in
    app.add_middleware(BaseHTTPMiddleware, dispatch=access_control_middleware)
    app.add_middleware(BaseHTTPMiddleware, dispatch=not_logged_in_middleware)
    app.add_middleware(BaseHTTPMiddleware, dispatch=logged_in_middleware)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/")
    def read_root():
        text = settings.TEST_TEXT
        return {"Hello": f"World {text}"}

    @app.get("/items/{item_id}")
    def read_item(item_id: int, q: Optional[str] = None):
        return {"item_id": item_id, "q": q}


    app.include_router(api_router, prefix=settings.API_V1_STR)  # 인증


    # 테이블 관리
    table_app.include_router(table_api_router)
    app.mount(f"{settings.API_V1_STR}/table", table_app)

    return app


app = create_app()

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8000, reload=True, workers=4)
