from typing import Any, Dict, Optional, Union
from fastapi import HTTPException
from core.database import DB
import pymysql


fake_users_db = {
    "string": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "password": "password",
        "hashed_password": "fakehashedsecret",
        "disabled": False,
    },
    "alice": {
        "username": "alice",
        "full_name": "Alice Wonderson",
        "email": "alice@example.com",
        "hashed_password": "fakehashedsecret2",
        "disabled": True,
    },
}


class CRUDUser():
    async def crud_test(self):
        try:
            conn = await DB.basic()
            curs = conn.cursor(pymysql.cursors.DictCursor)

            sql = 'SELECT * FROM user'
            curs.execute(sql)
            user_list = curs.fetchall()
            conn.close()

            print('user_list', user_list)

            print('crud')
            return user_list
        except Exception as e:
            # print(e)
            raise HTTPException(status_code=500, detail={"result": "fail", "message": "서버에 문제가 발생했습니다."})

    async def user_login(self, post_data):
        print(post_data)
        return fake_users_db.get(post_data.username)

    async def user_refresh_token_update(self, user_info, refresh_token):
        try:
            return True
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500,  detail={"result": "fail", "message": "서버에 문제가 발생했습니다"})


user = CRUDUser()
