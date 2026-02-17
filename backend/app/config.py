# app/config.py
import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Default to localhost if nothing is provided
    allow_origins: list = [
        "http://localhost:5173",
        os.getenv("FRONTEND_URL"),
    ]

    class Config:
        env_file = ".env"

settings = Settings()