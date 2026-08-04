from sqlalchemy import func
from sqlalchemy.orm import Session

from models.budget import Budget
from models.category import Category
from models.transaction import Transaction


class BudgetRepository:
    """
    Handles database operations for budgets.
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
        budget: Budget,
    ) -> Budget:
        db.add(budget)
        db.commit()
        db.refresh(budget)
        return budget

    @staticmethod
    def get_by_id(
        db: Session,
        budget_id: int,
        user_id: int,
    ) -> Budget | None:
        return (
            db.query(Budget)
            .filter(
                Budget.id == budget_id,
                Budget.user_id == user_id,
            )
            .first()
        )

    @staticmethod
    def get_existing_budget(
        db: Session,
        user_id: int,
        category_id: int,
        month: int,
        year: int,
    ) -> Budget | None:
        return (
            db.query(Budget)
            .filter(
                Budget.user_id == user_id,
                Budget.category_id == category_id,
                Budget.month == month,
                Budget.year == year,
            )
            .first()
        )

    @staticmethod
    def get_all(
        db: Session,
        user_id: int,
    ) -> list[Budget]:
        return (
            db.query(Budget)
            .filter(
                Budget.user_id == user_id,
            )
            .order_by(
                Budget.year.desc(),
                Budget.month.desc(),
            )
            .all()
        )

    @staticmethod
    def get_spent_amount(
        db: Session,
        user_id: int,
        category_id: int,
        month: int,
        year: int,
    ) -> float:
        """
        Returns the total expense amount for a
        category in the specified month and year.
        """

        spent = (
            db.query(
                func.coalesce(
                    func.sum(Transaction.amount),
                    0,
                )
            )
            .filter(
                Transaction.user_id == user_id,
                Transaction.category_id == category_id,
                Transaction.type == "EXPENSE",
                func.extract(
                    "month",
                    Transaction.transaction_date,
                ) == month,
                func.extract(
                    "year",
                    Transaction.transaction_date,
                ) == year,
            )
            .scalar()
        )

        return float(spent or 0)

    @staticmethod
    def update(
        db: Session,
        budget: Budget,
    ) -> Budget:
        db.commit()
        db.refresh(budget)
        return budget

    @staticmethod
    def delete(
        db: Session,
        budget: Budget,
    ) -> None:
        db.delete(budget)
        db.commit()