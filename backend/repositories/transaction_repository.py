from datetime import date

from sqlalchemy import case, func
from sqlalchemy.orm import Session

from models.category import Category
from models.transaction import Transaction
from repositories.transaction_query import TransactionQueryBuilder


class TransactionRepository:
    """
    Handles database operations for financial transactions.
    """

    @staticmethod
    def get_category(
        db: Session,
        category_id: int,
        user_id: int,
    ) -> Category | None:
        return (
            db.query(Category)
            .filter(
                Category.id == category_id,
                Category.user_id == user_id,
            )
            .first()
        )

    @staticmethod
    def create(
        db: Session,
        transaction: Transaction,
    ) -> Transaction:
        db.add(transaction)
        db.commit()
        db.refresh(transaction)
        return transaction

    @staticmethod
    def bulk_create(
        db: Session,
        transactions: list[Transaction],
    ) -> list[Transaction]:
        """
        Inserts multiple transactions efficiently.
        Used for importing bank statements.
        """
    
        db.add_all(transactions)
    
        db.commit()

        for transaction in transactions:
            db.refresh(transaction)
    
        return transactions

    @staticmethod
    def get_all(
        db: Session,
        user_id: int,
        page: int = 1,
        page_size: int = 10,
        search: str | None = None,
        category: str | None = None,
        transaction_type: str | None = None,
        start_date: date | None = None,
        end_date: date | None = None,
        min_amount: float | None = None,
        max_amount: float | None = None,
        sort_by: str = "transaction_date",
        order: str = "desc",
    ) -> dict:

        query = db.query(Transaction)

        query = TransactionQueryBuilder.base_query(
            query,
            user_id,
        )

        query = TransactionQueryBuilder.apply_search(
            query,
            search,
        )

        query = TransactionQueryBuilder.apply_category(
            query,
            category,
        )

        query = TransactionQueryBuilder.apply_transaction_type(
            query,
            transaction_type,
        )

        query = TransactionQueryBuilder.apply_date_range(
            query,
            start_date,
            end_date,
        )

        query = TransactionQueryBuilder.apply_amount_range(
            query,
            min_amount,
            max_amount,
        )

        total_records = query.count()

        summary = (
            query.with_entities(
                func.coalesce(
                    func.sum(
                        case(
                            (Transaction.type == "INCOME", Transaction.amount),
                            else_=0,
                        )
                    ),
                    0,
                ).label("income"),
                func.coalesce(
                    func.sum(
                        case(
                            (Transaction.type == "EXPENSE", Transaction.amount),
                            else_=0,
                        )
                    ),
                    0,
                ).label("expense"),
            )
            .first()
        )

        query = TransactionQueryBuilder.apply_sorting(
            query,
            sort_by,
            order,
        )

        transactions = (
            query.offset((page - 1) * page_size)
            .limit(page_size)
            .all()
        )

        result = {
            "transactions": transactions,
            "total_records": total_records,
            "total_income": float(summary.income or 0),
            "total_expense": float(summary.expense or 0),
        }

        return result

    @staticmethod
    def get_by_id(
        db: Session,
        transaction_id: int,
        user_id: int,
    ) -> Transaction | None:
        return (
            db.query(Transaction)
            .filter(
                Transaction.id == transaction_id,
                Transaction.user_id == user_id,
            )
            .first()
        )

    @staticmethod
    def update(
        db: Session,
        transaction: Transaction,
    ) -> Transaction:
        db.commit()
        db.refresh(transaction)
        return transaction

    @staticmethod
    def delete(
        db: Session,
        transaction: Transaction,
    ) -> None:
        db.delete(transaction)
        db.commit()