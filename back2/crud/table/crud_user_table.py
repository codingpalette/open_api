from typing import Any, Dict, Optional, Union
from fastapi import HTTPException
from core.database import DB
import pymysql



class CRUDUserTable():
    async def test(self):
        return True

    async def create_table(self):
        try:

            return True

        except Exception as e:
            print(e)
            raise HTTPException(status_code=500,  detail={"result": "fail", "message": "서버에 문제가 발생했습니다"})


user_table_service = CRUDUserTable()