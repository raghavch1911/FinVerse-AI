from sqlalchemy import case, func
from sqlalchemy.orm import Session

from models.budget import Budget
from models.category import Category
from models.transaction import Transaction


class InsightsRepository:
    """
    Handles database queries required for
    financial insights and analytics.
    """

    @staticmethod
    def get_financial_summary(
        db: Session,
        user_id: int,
    ) -> dict:

        result = (
            db.query(
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
            .filter(Transaction.user_id == user_id)
            .first()
        )

        income = float(result.income or 0)
        expense = float(result.expense or 0)

        return {
            "income": income,
            "expense": expense,
            "balance": income - expense,
        }

    @staticmethod
    def get_top_expense_categories(
        db: Session,
        user_id: int,
        limit: int = 5,
    ) -> list:

        return (
            db.query(
                Category.name.label("category"),
                func.sum(Transaction.amount).label("amount"),
            )
            .join(
                Category,
                Category.id == Transaction.category_id,
            )
            .filter(
                Transaction.user_id == user_id,
                Transaction.type == "EXPENSE",
            )
            .group_by(Category.name)
            .order_by(func.sum(Transaction.amount).desc())
            .limit(limit)
            .all()
        )

    @staticmethod
    def get_budget_insights(
        db: Session,
        user_id: int,
    ) -> list[dict]:

        budgets = (
            db.query(
                Budget,
                Category.name.label("category_name"),
            )
            .join(
                Category,
                Budget.category_id == Category.id,
            )
            .filter(
                Budget.user_id == user_id,
                Budget.is_active.is_(True),
            )
            .all()
        )

        results = []

        for budget, category_name in budgets:

            spent = (
                db.query(
                    func.coalesce(
                        func.sum(Transaction.amount),
                        0,
                    )
                )
                .filter(
                    Transaction.user_id == user_id,
                    Transaction.category_id == budget.category_id,
                    Transaction.type == "EXPENSE",
                    func.extract(
                        "month",
                        Transaction.transaction_date,
                    ) == budget.month,
                    func.extract(
                        "year",
                        Transaction.transaction_date,
                    ) == budget.year,
                )
                .scalar()
            )

            spent = float(spent or 0)

            remaining = budget.amount - spent

            utilization = (
                spent / budget.amount * 100
                if budget.amount > 0
                else 0
            )

            if utilization < 50:
                status = "SAFE"
            elif utilization < 80:
                status = "NORMAL"
            elif utilization <= 100:
                status = "WARNING"
            else:
                status = "OVER_BUDGET"

            results.append(
                {
                    "category": category_name,
                    "budget": budget.amount,
                    "spent": spent,
                    "remaining": remaining,
                    "utilization_percentage": round(utilization, 2),
                    "status": status,
                }
            )

        return results