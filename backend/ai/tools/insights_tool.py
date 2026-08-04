from typing import Any

from sqlalchemy.orm import Session

from models.user import User
from services.insights_service import InsightsService
from repositories.transaction_repository import TransactionRepository


class InsightsTool:
    """
    AI tool for retrieving and formatting financial insights.

    Acts as the bridge between AI agents and the service layer,
    exposing only the information required by the LLM.
    """

    @staticmethod
    def execute(
        db: Session,
        current_user: User,
    ) -> dict[str, Any]:
        """
        Retrieve financial insights for the authenticated user.

        Args:
            db: Active database session.
            current_user: Authenticated user.

        Returns:
            A dictionary containing the financial summary,
            budget insights, top expense categories,
            recommendations, and financial health score.
        """
        insights = InsightsService.get_insights(
            db=db,
            current_user=current_user,
        )
        transactions = TransactionRepository.get_all(
            db=db,
            user_id=current_user.id,
            page=1,
            page_size=100,
            sort_by="transaction_date",
            order="desc",
        )

        recent_transactions = []

        for t in transactions["transactions"]:

            recent_transactions.append(
                {
                    "date": str(t.transaction_date),
                    "title": t.title,
                    "category": t.category.name,
                    "type": t.type,
                    "amount": t.amount,
                }
            )

        return {

    "financial_summary": insights.summary,

    "budget_insights": insights.budgets,

    "top_expense_categories": insights.top_expenses,

    "recommendations": insights.recommendations,

    "financial_health_score": insights.financial_health_score,

    "recent_transactions": recent_transactions,

}