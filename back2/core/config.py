import os
from dotenv import load_dotenv
from typing import Any, Dict, List, Optional, Union

from pydantic import AnyHttpUrl, BaseSettings, EmailStr, HttpUrl, PostgresDsn, validator

ROOT_DIR = os.path.dirname(os.path.abspath('.env'))
load_dotenv(ROOT_DIR+"/.env")

class Settings(BaseSettings):

    API_V1_STR: str = "/api/v1"
    TOKEN_KEY: str = os.getenv('TOKEN_KEY')
    ALG: str = "HS256"
    ACCESS_TOKEN_TIME = 1
    REFRESH_TOKEN_TIME = 14

    DB_HOST: str = os.getenv('DB_HOST')
    DB_USERNAME: str = os.getenv('DB_USERNAME')
    DB_PASSWORD: str = os.getenv('DB_PASSWORD')
    DB_DATABASE: str = os.getenv('DB_DATABASE')

    TEST_TEXT = os.getenv('TEST')




settings = Settings()