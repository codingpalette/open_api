from fastapi import APIRouter
from crud.table.crud_user_table import user_table_service

user_table_router = APIRouter()

@user_table_router.get('/')
async def test():
    return True


@user_table_router.post('/create', summary="유저 테이블 생성")
async def user_table_create():
    await user_table_service.create_table()
    return True