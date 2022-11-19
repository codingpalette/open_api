from fastapi import APIRouter

from .endpoints._table import user_table

table_api_router = APIRouter()

table_api_router.include_router(user_table.user_table_router, prefix="/user_table", tags=["유저 테이블"])