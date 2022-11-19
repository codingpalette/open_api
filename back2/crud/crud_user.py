from typing import Any, Dict, Optional, Union
from fastapi import HTTPException
from core.database import DB
import pymysql

class CRUDUser():

    # 유저 조회
    async def user_find_one(self, user_login_id):
        try:
            conn = await DB.basic()
            curs = conn.cursor(pymysql.cursors.DictCursor)
            sql = f'SELECT * FROM user WHERE user_login_id="{user_login_id}"'
            curs.execute(sql)
            user_data = curs.fetchone()
            conn.close()
            return user_data
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail={"result": "fail", "message": "서버에 문제가 발생했습니다."})

    # 유저 생성
    async def user_create(self, user_login_id, user_password):
        try:
            conn = await DB.basic()
            curs = conn.cursor(pymysql.cursors.DictCursor)
            sql = f'''
                INSERT INTO user (user_login_id, user_password) VALUES (%s, %s)
            '''
            curs.execute(sql, (
                user_login_id,
                user_password
            ))
            conn.commit()
            # print(curs.lastrowid)
            conn.close()
            return True
        except Exception as e:
            # print(e)
            raise HTTPException(status_code=500, detail={"result": "fail", "message": "서버에 문제가 발생했습니다."})

    # 유저 리프레시 토큰 업데이트
    async def user_refresh_token_update(self, user_login_id, refresh_token):
        try:
            conn = await DB.basic()
            curs = conn.cursor(pymysql.cursors.DictCursor)

            sql = f'''
                UPDATE user SET
                user_refresh_token = %s
                WHERE user_login_id = %s
            '''
            curs.execute(sql, (
                refresh_token,
                user_login_id
            ))
            conn.commit()
            conn.close()
            return True
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500,  detail={"result": "fail", "message": "서버에 문제가 발생했습니다"})

    # 유저 로그아웃
    async def user_logout(self, user_login_id):
        try:
            conn = await DB.basic()
            curs = conn.cursor(pymysql.cursors.DictCursor)

            sql = f'''
                UPDATE user SET user_refresh_token = %s 
                WHERE user_login_id = %s
            '''

            curs.execute(sql, (
                '',
                user_login_id
            ))
            conn.commit()
            conn.close()
            return True

        except Exception as e:
            print(e)
            raise HTTPException(status_code=500,  detail={"result": "fail", "message": "서버에 문제가 발생했습니다"})

user_service = CRUDUser()
