import pymysql
from core.config import settings


class DB():

    async def basic(self):
        try:
            conn = pymysql.connect(
                host=settings.DB_HOST,
                user=settings.DB_USERNAME,
                password=settings.DB_PASSWORD,
                db=settings.DB_DATABASE,
                charset='utf8mb4',
                client_flag=pymysql.constants.CLIENT.MULTI_STATEMENTS
            )
            return conn
        except Exception as e:
            # print(e)
            return False


DB = DB()