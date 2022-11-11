from fastapi import FastAPI, Depends, HTTPException, status
from typing import Optional
import uvicorn
from api.api_v1.api import api_router
from core.config import settings


def create_app():
    app = FastAPI(title="기본api")

    @app.get("/")
    def read_root():
        return {"Hello": "World"}

    @app.get("/items/{item_id}")
    def read_item(item_id: int, q: Optional[str] = None):
        return {"item_id": item_id, "q": q}


    app.include_router(api_router, prefix=settings.API_V1_STR)  # 인증

    return app


app = create_app()

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8000, reload=True, workers=4)
