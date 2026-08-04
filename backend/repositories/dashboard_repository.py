from sqlalchemy.orm import Session

from models.category import Category
from models.transaction import Transaction


class DashboardRepository:
    """
    Handles database operations required
    for the dashboard.
    """

    @staticmethod
    def get_user_transactions(
        db: Session,
        user_id: int,
    ) -> list[Transaction]:
        return (
            db.query(Transaction)
            .filter(Transaction.user_id == user_id)
            .all()
        )

    @staticmethod
    def get_expense_transactions(
        db: Session,
        user_id: int,
    ) -> list[Transaction]:
        return (
            db.query(Transaction)
            .join(Category)
            .filter(
                Transaction.user_id == user_id,
                Transaction.type == "EXPENSE",
            )
            .all()
        )

    @staticmethod
    def get_recent_transactions(
        db: Session,
        user_id: int,
        limit: int = 3,
    ) -> list[Transaction]:
        return (
            db.query(Transaction)
            .filter(
                Transaction.user_id == user_id,
            )
            .order_by(
                Transaction.transaction_date.desc(),
                Transaction.created_at.desc(),
            )
            .limit(limit)
            .all()
        )