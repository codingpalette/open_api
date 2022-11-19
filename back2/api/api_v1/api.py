from fastapi import APIRouter

from api.api_v1.endpoints import users, posts

api_router = APIRouter()

api_router.include_router(users.router, prefix="/users", tags=["유저"])
api_router.include_router(posts.router, prefix="/posts", tags=["포스트"])

