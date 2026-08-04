from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.connection import get_db
from models.user import User
from schemas.profile_schema import (
    ProfileCreate,
    ProfileResponse,
    ProfileUpdate,
)
from services.auth_service import AuthService
from services.profile_service import ProfileService

router = APIRouter(
    prefix="/profile",
    tags=["Profile"],
)


@router.post(
    "",
    response_model=ProfileResponse,
)
def create_profile(
    profile: ProfileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        AuthService.get_current_user,
    ),
) -> ProfileResponse:

    try:
        return ProfileService.create_profile(
            db,
            current_user,
            profile,
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        ) from exc


@router.get(
    "",
    response_model=ProfileResponse,
)
def get_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        AuthService.get_current_user,
    ),
) -> ProfileResponse:

    try:
        return ProfileService.get_profile(
            db,
            current_user,
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=404,
            detail=str(exc),
        ) from exc


@router.put(
    "",
    response_model=ProfileResponse,
)
def update_profile(
    profile: ProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        AuthService.get_current_user,
    ),
) -> ProfileResponse:

    try:
        return ProfileService.update_profile(
            db,
            current_user,
            profile,
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=404,
            detail=str(exc),
        ) from exc