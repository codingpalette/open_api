from fastapi import APIRouter

user_table_router = APIRouter()

@user_table_router.get('/')
async def test():
    return True