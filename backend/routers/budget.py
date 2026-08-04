from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from database.connection import get_db
from models.user import User
from schemas.budget_schema import (
    BudgetCreate,
    BudgetListResponse,
    BudgetResponse,
    BudgetUpdate,
)
from services.auth_service import AuthService
from services.budget_service import BudgetService

router = APIRouter(
    prefix="/budgets",
    tags=["Budget"],
)


@router.post(
    "",
    response_model=BudgetResponse,
)
def create_budget(
    budget: BudgetCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        AuthService.get_current_user,
    ),
) -> BudgetResponse:
    return BudgetService.create_budget(
        db,
        current_user,
        budget,
    )


@router.get(
    "",
    response_model=BudgetListResponse,
)
def get_budgets(
    page: int = Query(
        default=1,
        ge=1,
        description="Page number.",
    ),
    page_size: int = Query(
        default=10,
        ge=1,
        le=100,
        description="Records per page.",
    ),
    db: Session = Depends(get_db),
    current_user: User = Depends(
        AuthService.get_current_user,
    ),
) -> BudgetListResponse:
    return BudgetService.get_budgets(
        db,
        current_user,
        page,
        page_size,
    )


@router.get(
    "/{budget_id}",
    response_model=BudgetResponse,
)
def get_budget(
    budget_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        AuthService.get_current_user,
    ),
) -> BudgetResponse:
    return BudgetService.get_budget(
        db,
        current_user,
        budget_id,
    )


@router.put(
    "/{budget_id}",
    response_model=BudgetResponse,
)
def update_budget(
    budget_id: int,
    budget: BudgetUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        AuthService.get_current_user,
    ),
) -> BudgetResponse:
    return BudgetService.update_budget(
        db,
        current_user,
        budget_id,
        budget,
    )


@router.delete(
    "/{budget_id}",
)
def delete_budget(
    budget_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        AuthService.get_current_user,
    ),
) -> dict:
    return BudgetService.delete_budget(
        db,
        current_user,
        budget_id,
    )