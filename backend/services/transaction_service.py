from datetime import date
from math import ceil
from typing import Optional

from sqlalchemy.orm import Session

from exceptions.custom_exceptions import (
    ResourceNotFoundException,
    ValidationException,
)
from models.transaction import Transaction
from models.user import User
from repositories.transaction_repository import TransactionRepository
from schemas.transaction_schema import (
    TransactionCreate,
    TransactionListResponse,
    TransactionSummary,
    TransactionUpdate,
)


class TransactionService:
    """
    Handles transaction-related business logic.
    """

    @staticmethod
    def create_transaction(
        db: Session,
        current_user: User,
        transaction_data: TransactionCreate,
    ) -> Transaction:

        category = TransactionRepository.get_category(
            db,
            transaction_data.category_id,
            current_user.id,
        )

        if category is None:
            raise ValidationException(
                "Invalid category."
            )

        transaction = Transaction(
            user_id=current_user.id,
            category_id=transaction_data.category_id,
            type=transaction_data.type,
            title=transaction_data.title,
            description=transaction_data.description,
            amount=transaction_data.amount,
            transaction_date=transaction_data.transaction_date,
        )

        return TransactionRepository.create(
            db,
            transaction,
        )

    @staticmethod
    def get_transactions(
        db: Session,
        current_user: User,
        page: int = 1,
        page_size: int = 10,
        search: Optional[str] = None,
        category: Optional[str] = None,
        transaction_type: Optional[str] = None,
        start_date: Optional[date] = None,
        end_date: Optional[date] = None,
        min_amount: Optional[float] = None,
        max_amount: Optional[float] = None,
        sort_by: str = "transaction_date",
        order: str = "desc",
    ) -> TransactionListResponse:

        result = TransactionRepository.get_all(
            db=db,
            user_id=current_user.id,
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

        total_records = result["total_records"]
        total_pages = max(1, ceil(total_records / page_size))

        return TransactionListResponse(
            items=result["transactions"],
            page=page,
            page_size=page_size,
            total_records=total_records,
            total_pages=total_pages,
            has_next=page < total_pages,
            has_previous=page > 1,
            summary=TransactionSummary(
                total_income=result["total_income"],
                total_expense=result["total_expense"],
                balance=result["total_income"] - result["total_expense"],
            ),
        )

    @staticmethod
    def get_transaction_by_id(
        db: Session,
        current_user: User,
        transaction_id: int,
    ) -> Transaction:

        transaction = TransactionRepository.get_by_id(
            db,
            transaction_id,
            current_user.id,
        )

        if transaction is None:
            raise ResourceNotFoundException(
                "Transaction not found."
            )

        return transaction

    @staticmethod
    def update_transaction(
        db: Session,
        current_user: User,
        transaction_id: int,
        transaction_data: TransactionUpdate,
    ) -> Transaction:

        transaction = TransactionRepository.get_by_id(
            db,
            transaction_id,
            current_user.id,
        )

        if transaction is None:
            raise ResourceNotFoundException(
                "Transaction not found."
            )

        data = transaction_data.model_dump(
            exclude_unset=True,
        )

        if "category_id" in data:

            category = TransactionRepository.get_category(
                db,
                data["category_id"],
                current_user.id,
            )

            if category is None:
                raise ValidationException(
                    "Invalid category."
                )

        for key, value in data.items():
            setattr(transaction, key, value)

        return TransactionRepository.update(
            db,
            transaction,
        )

    @staticmethod
    def delete_transaction(
        db: Session,
        current_user: User,
        transaction_id: int,
    ) -> dict:

        transaction = TransactionRepository.get_by_id(
            db,
            transaction_id,
            current_user.id,
        )

        if transaction is None:
            raise ResourceNotFoundException(
                "Transaction not found."
            )

        TransactionRepository.delete(
            db,
            transaction,
        )

        return {
            "message": "Transaction deleted successfully."
        }