from typing import Optional
from pydantic import BaseModel


class UserLogin(BaseModel):
    user_login_id: str
    user_password: str


class UserJoin(BaseModel):
    user_login_id: str
    user_password: str
