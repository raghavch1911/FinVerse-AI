from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserRegister(BaseModel):
    username: str = Field(
        ...,
        min_length=3,
        max_length=100,
    )
    email: EmailStr
    password: str = Field(
        ...,
        min_length=6,
    )

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    username: str = Field(
        ...,
        min_length=3,
        max_length=100,
    )

    email: EmailStr

class ChangePassword(BaseModel):
    current_password: str

    new_password: str = Field(
        ...,
        min_length=6,
    )

class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )


class Token(BaseModel):
    access_token: str
    token_type: str