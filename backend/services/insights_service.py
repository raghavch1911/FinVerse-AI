from sqlalchemy.orm import Session

from models.user import User
from repositories.insights_repository import InsightsRepository
from schemas.insights_schema import (
    BudgetInsight,
    CategoryInsight,
    FinancialInsightsResponse,
    FinancialSummary,
    Recommendation,
)


class InsightsService:
    """
    Handles financial insights and recommendation logic.
    """

    @staticmethod
    def _calculate_health_score(
        income: float,
        expense: float,
        budgets: list[dict],
    ) -> int:

        if income <= 0:
            return 0

        savings_ratio = max(
            0,
            (income - expense) / income,
        )

        score = 50 + savings_ratio * 50

        over_budget_count = sum(
            1
            for budget in budgets
            if budget["status"] == "OVER_BUDGET"
        )

        warning_count = sum(
            1
            for budget in budgets
            if budget["status"] == "WARNING"
        )

        score -= over_budget_count * 10
        score -= warning_count * 5

        return max(
            0,
            min(100, round(score)),
        )

    @staticmethod
    def _generate_recommendations(
        summary: dict,
        budgets: list[dict],
    ) -> list[Recommendation]:

        recommendations = []

        if summary["expense"] > summary["income"]:
            recommendations.append(
                Recommendation(
                    title="Expenses Exceed Income",
                    description=(
                        "Your total expenses are higher than your income. "
                        "Consider reducing discretionary spending."
                    ),
                    priority="HIGH",
                )
            )

        for budget in budgets:

            if budget["status"] == "OVER_BUDGET":

                recommendations.append(
                    Recommendation(
                        title=f"{budget['category']} Budget Exceeded",
                        description=(
                            f"You exceeded your {budget['category']} budget "
                            f"by ${abs(budget['remaining']):.2f}."
                        ),
                        priority="HIGH",
                    )
                )

            elif budget["status"] == "WARNING":

                recommendations.append(
                    Recommendation(
                        title=f"{budget['category']} Near Budget Limit",
                        description=(
                            f"You've used "
                            f"{budget['utilization_percentage']:.0f}% "
                            f"of your budget."
                        ),
                        priority="MEDIUM",
                    )
                )

        if summary["balance"] > 0:
            recommendations.append(
                Recommendation(
                    title="Build Savings",
                    description=(
                        "You have a positive balance this period. "
                        "Consider transferring part of it into savings."
                    ),
                    priority="LOW",
                )
            )

        return recommendations

    @staticmethod
    def get_insights(
        db: Session,
        current_user: User,
    ) -> FinancialInsightsResponse:

        summary = InsightsRepository.get_financial_summary(
            db,
            current_user.id,
        )

        budgets = InsightsRepository.get_budget_insights(
            db,
            current_user.id,
        )

        top_expenses = InsightsRepository.get_top_expense_categories(
            db,
            current_user.id,
        )

        score = InsightsService._calculate_health_score(
            summary["income"],
            summary["expense"],
            budgets,
        )

        recommendations = InsightsService._generate_recommendations(
            summary,
            budgets,
        )

        return FinancialInsightsResponse(
            financial_health_score=score,
            summary=FinancialSummary(
                total_income=summary["income"],
                total_expense=summary["expense"],
                balance=summary["balance"],
            ),
            budgets=[
                BudgetInsight(**budget)
                for budget in budgets
            ],
            top_expenses=[
                CategoryInsight(
                    category=item.category,
                    amount=float(item.amount),
                )
                for item in top_expenses
            ],
            recommendations=recommendations,
        )