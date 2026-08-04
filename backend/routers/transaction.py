from datetime import date

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from database.connection import get_db
from models.user import User
from schemas.transaction_schema import (
    TransactionCreate,
    TransactionListResponse,
    TransactionResponse,
    TransactionUpdate,
)
from services.auth_service import AuthService
from services.transaction_service import TransactionService

router = APIRouter(
    prefix="/transactions",
    tags=["Transactions"],
)


@router.post(
    "",
    response_model=TransactionResponse,
)
def create_transaction(
    transaction: TransactionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        AuthService.get_current_user,
    ),
) -> TransactionResponse:
    return TransactionService.create_transaction(
        db,
        current_user,
        transaction,
    )


@router.get(
    "",
    response_model=TransactionListResponse,
)
def get_transactions(
    page: int = Query(
        default=1,
        ge=1,
        description="Page number",
    ),
    page_size: int = Query(
        default=10,
        ge=1,
        le=100,
        description="Records per page",
    ),
    search: str | None = Query(
        default=None,
        description="Search by title, description, or category.",
    ),
    category: str | None = Query(
        default=None,
        description="Category name.",
    ),
    transaction_type: str | None = Query(
        default=None,
        pattern="^(INCOME|EXPENSE)$",
        description="Transaction type.",
    ),
    start_date: date | None = Query(
        default=None,
    ),
    end_date: date | None = Query(
        default=None,
    ),
    min_amount: float | None = Query(
        default=None,
        ge=0,
    ),
    max_amount: float | None = Query(
        default=None,
        ge=0,
    ),
    sort_by: str = Query(
        default="transaction_date",
        description="transaction_date, amount, title, created_at",
    ),
    order: str = Query(
        default="desc",
        pattern="^(asc|desc)$",
    ),
    db: Session = Depends(get_db),
    current_user: User = Depends(
        AuthService.get_current_user,
    ),
) -> TransactionListResponse:

    return TransactionService.get_transactions(
        db=db,
        current_user=current_user,
        page=page,
        page_size=page_size,
        search=search,
        category=category,
        transaction_type=transaction_type,
        start_date=start_date,
        end_date=end_date,
        min_amount=min_amount,
        max_amount=max_amount,
        sort_by=sort_by,
        order=order,
    )


@router.get(
    "/{transaction_id}",
    response_model=TransactionResponse,
)
def get_transaction(
    transaction_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        AuthService.get_current_user,
    ),
) -> TransactionResponse:
    return TransactionService.get_transaction_by_id(
        db,
        current_user,
        transaction_id,
    )


@router.put(
    "/{transaction_id}",
    response_model=TransactionResponse,
)
def update_transaction(
    transaction_id: int,
    transaction: TransactionUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        AuthService.get_current_user,
    ),
) -> TransactionResponse:
    return TransactionService.update_transaction(
        db,
        current_user,
        transaction_id,
        transaction,
    )


@router.delete(
    "/{transaction_id}",
)
def delete_transaction(
    transaction_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        AuthService.get_current_user,
    ),
) -> dict:
    return TransactionService.delete_transaction(
        db,
        current_user,
        transaction_id,
    )