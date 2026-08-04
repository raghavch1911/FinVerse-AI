from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from core.security import (
    create_access_token,
    decode_access_token,
    hash_password,
    security,
    verify_password,
)
from database.connection import get_db
from exceptions.custom_exceptions import (
    DuplicateResourceException,
    UnauthorizedException,
)
from models.user import User
from repositories.auth_repository import AuthRepository
from schemas.user_schema import (
    ChangePassword,
    UserRegister,
    UserUpdate,
)
from services.default_category_service import (
    DefaultCategoryService,
)


class AuthService:
    """
    Handles authentication and authorization
    business logic.
    """

    @staticmethod
    def register_user(
        db: Session,
        user_data: UserRegister,
    ) -> User:

        existing_user = AuthRepository.get_by_email(
            db,
            user_data.email,
        )

        if existing_user:
            raise DuplicateResourceException(
                "Email already registered."
            )

        hashed_password = hash_password(
            user_data.password,
        )

        new_user = User(
            username=user_data.username,
            email=user_data.email,
            password_hash=hashed_password,
        )

        new_user = AuthRepository.create(
            db,
            new_user,
        )

        # ------------------------------------
        # Create Default Categories
        # ------------------------------------

        DefaultCategoryService.create_defaults(
            db=db,
            user_id=new_user.id,
        )

        return new_user

    @staticmethod
    def login_user(
        db: Session,
        email: str,
        password: str,
    ) -> dict:

        user = AuthRepository.get_by_email(
            db,
            email,
        )

        if not user:
            raise UnauthorizedException(
                "Invalid email or password."
            )

        if not verify_password(
            password,
            user.password_hash,
        ):
            raise UnauthorizedException(
                "Invalid email or password."
            )

        access_token = create_access_token(
            {
                "sub": str(user.id),
            }
        )

        return {
            "access_token": access_token,
            "token_type": "bearer",
        }

    @staticmethod
    def get_current_user(
        credentials: HTTPAuthorizationCredentials = Depends(
            security
        ),
        db: Session = Depends(get_db),
    ) -> User:

        token = credentials.credentials

        payload = decode_access_token(token)

        if payload is None:
            raise UnauthorizedException(
                "Invalid or expired token."
            )

        user_id = payload.get("sub")

        if user_id is None:
            raise UnauthorizedException(
                "Invalid token."
            )

        user = AuthRepository.get_by_id(
            db,
            int(user_id),
        )

        if user is None:
            raise UnauthorizedException(
                "User not found."
            )

        return user

    @staticmethod
    def update_user(
        db: Session,
        current_user: User,
        user_data: UserUpdate,
    ) -> User:

        existing = AuthRepository.get_by_email(
            db,
            user_data.email,
        )

        if (
            existing is not None
            and existing.id != current_user.id
        ):
            raise DuplicateResourceException(
                "Email already registered."
            )

        current_user.username = (
            user_data.username
        )

        current_user.email = (
            user_data.email
        )

        return AuthRepository.update(
            db,
            current_user,
        )

    @staticmethod
    def change_password(
        db: Session,
        current_user: User,
        password_data: ChangePassword,
    ) -> dict:

        if not verify_password(
            password_data.current_password,
            current_user.password_hash,
        ):
            raise UnauthorizedException(
                "Current password is incorrect."
            )

        current_user.password_hash = hash_password(
            password_data.new_password,
        )

        AuthRepository.update(
            db,
            current_user,
        )

        return {
            "message": "Password updated successfully."
        }