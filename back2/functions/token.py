from jose import JWTError, jwt
from core.config import settings
import datetime


class Functions():
    def create_token(self, type, user_info=None):
        alg = 'HS256'

        if type == "access_token":
            to_encode = user_info.copy()
            to_encode.update({"exp": datetime.datetime.utcnow() + datetime.timedelta(days=settings.ACCESS_TOKEN_TIME)})
        else:
            to_encode = {'exp': datetime.datetime.utcnow() + datetime.timedelta(days=settings.REFRESH_TOKEN_TIME)}

        return jwt.encode(to_encode, settings.TOKEN_KEY, algorithm=alg)


functions = Functions()