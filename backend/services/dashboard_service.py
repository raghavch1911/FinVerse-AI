from collections import defaultdict

from sqlalchemy.orm import Session

from models.user import User
from repositories.dashboard_repository import DashboardRepository


class DashboardService:
    """
    Handles dashboard-related business logic.
    """

    @staticmethod
    def get_summary(
        db: Session,
        current_user: User,
    ) -> dict:

        transactions = DashboardRepository.get_user_transactions(
            db,
            current_user.id,
        )

        total_income = sum(
            transaction.amount
            for transaction in transactions
            if transaction.type == "INCOME"
        )

        total_expense = sum(
            transaction.amount
            for transaction in transactions
            if transaction.type == "EXPENSE"
        )

        return {
            "total_income": total_income,
            "total_expense": total_expense,
            "current_balance": total_income - total_expense,
            "total_transactions": len(transactions),
        }

    @staticmethod
    def get_category_expenses(
        db: Session,
        current_user: User,
    ) -> list[dict]:

        transactions = DashboardRepository.get_expense_transactions(
            db,
            current_user.id,
        )

        expenses = defaultdict(float)

        for transaction in transactions:
            expenses[
                transaction.category.name
            ] += transaction.amount

        return [
            {
                "category": category,
                "amount": amount,
            }
            for category, amount in expenses.items()
        ]

    @staticmethod
    def get_monthly_summary(
        db: Session,
        current_user: User,
    ) -> list[dict]:

        transactions = DashboardRepository.get_user_transactions(
            db,
            current_user.id,
        )

        monthly = defaultdict(
            lambda: {
                "income": 0,
                "expense": 0,
            }
        )

        for transaction in transactions:

            month = transaction.transaction_date.strftime(
                "%Y-%m"
            )

            if transaction.type == "INCOME":
                monthly[month]["income"] += transaction.amount
            else:
                monthly[month]["expense"] += transaction.amount

        return [
            {
                "month": month,
                "income": data["income"],
                "expense": data["expense"],
            }
            for month, data in sorted(
                monthly.items()
            )
        ]

    @staticmethod
    def get_recent_transactions(
        db: Session,
        current_user: User,
    ) -> list[dict]:

        transactions = DashboardRepository.get_recent_transactions(
            db,
            current_user.id,
            limit=3,
        )

        return [
            {
                "id": transaction.id,
                "title": transaction.title,
                "category": transaction.category.name,
                "type": transaction.type,
                "amount": transaction.amount,
                "transaction_date": str(
                    transaction.transaction_date
                ),
            }
            for transaction in transactions
        ]