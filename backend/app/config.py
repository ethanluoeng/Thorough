# app/config.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Default to localhost if nothing is provided
    allow_origins: list = [
        "http://192.168.10.116:5173",
    ]

settings = Settings()