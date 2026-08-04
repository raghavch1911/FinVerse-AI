from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.connection import get_db
from models.user import User
from schemas.category_schema import (
    CategoryCreate,
    CategoryResponse,
)
from services.auth_service import AuthService
from services.category_service import CategoryService

router = APIRouter(
    prefix="/categories",
    tags=["Categories"],
)


@router.post(
    "",
    response_model=CategoryResponse,
)
def create_category(
    category: CategoryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        AuthService.get_current_user,
    ),
) -> CategoryResponse:
    return CategoryService.create_category(
        db,
        current_user,
        category,
    )


@router.get(
    "",
    response_model=List[CategoryResponse],
)
def get_categories(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        AuthService.get_current_user,
    ),
) -> List[CategoryResponse]:
    return CategoryService.get_categories(
        db,
        current_user,
    )