from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.connection import get_db
from models.user import User
from schemas.user_schema import (
    ChangePassword,
    Token,
    UserLogin,
    UserRegister,
    UserResponse,
    UserUpdate,
)
from services.auth_service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=UserResponse,
)
def register(
    user: UserRegister,
    db: Session = Depends(get_db),
) -> UserResponse:
    return AuthService.register_user(
        db,
        user,
    )


@router.post(
    "/login",
    response_model=Token,
)
def login(
    user: UserLogin,
    db: Session = Depends(get_db),
) -> Token:
    return AuthService.login_user(
        db,
        user.email,
        user.password,
    )


@router.get(
    "/me",
    response_model=UserResponse,
)
def get_current_user(
    current_user: User = Depends(
        AuthService.get_current_user,
    ),
) -> UserResponse:
    return current_user


# ---------------------------------
# Update User
# ---------------------------------

@router.put(
    "/me",
    response_model=UserResponse,
)
def update_current_user(
    user: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        AuthService.get_current_user,
    ),
) -> UserResponse:
    return AuthService.update_user(
        db,
        current_user,
        user,
    )


# ---------------------------------
# Change Password
# ---------------------------------

@router.put(
    "/change-password",
)
def change_password(
    password: ChangePassword,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        AuthService.get_current_user,
    ),
) -> dict:
    return AuthService.change_password(
        db,
        current_user,
        password,
    )