from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.connection import get_db
from models.user import User
from schemas.dashboard_schema import (
    CategoryExpense,
    DashboardSummary,
    MonthlySummary,
    RecentTransaction,
)
from services.auth_service import AuthService
from services.dashboard_service import DashboardService

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get(
    "/summary",
    response_model=DashboardSummary,
)
def get_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        AuthService.get_current_user,
    ),
) -> DashboardSummary:
    return DashboardService.get_summary(
        db,
        current_user,
    )


@router.get(
    "/category-expenses",
    response_model=list[CategoryExpense],
)
def get_category_expenses(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        AuthService.get_current_user,
    ),
) -> list[CategoryExpense]:
    return DashboardService.get_category_expenses(
        db,
        current_user,
    )


@router.get(
    "/monthly-summary",
    response_model=list[MonthlySummary],
)
def get_monthly_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        AuthService.get_current_user,
    ),
) -> list[MonthlySummary]:
    return DashboardService.get_monthly_summary(
        db,
        current_user,
    )


@router.get(
    "/recent-transactions",
    response_model=list[RecentTransaction],
)
def get_recent_transactions(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        AuthService.get_current_user,
    ),
) -> list[RecentTransaction]:
    return DashboardService.get_recent_transactions(
        db,
        current_user,
    )