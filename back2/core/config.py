import os
from dotenv import load_dotenv
from typing import Any, Dict, List, Optional, Union

from pydantic import AnyHttpUrl, BaseSettings, EmailStr, HttpUrl, PostgresDsn, validator

ROOT_DIR = os.path.dirname(os.path.abspath('.env'))
load_dotenv(ROOT_DIR+"/.env")

class Settings(BaseSettings):

    API_V1_STR: str = "/api/v1"
    TOKEN_KEY: str = os.getenv('TOKEN_KEY')
    ACCESS_TOKEN_TIME = 1
    REFRESH_TOKEN_TIME = 14



settings = Settings()