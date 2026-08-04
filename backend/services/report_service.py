from datetime import datetime

from sqlalchemy.orm import Session

from ai.agents.report_agent import ReportAgent
from models.user import User
from schemas.report_schema import FinancialReportResponse
from services.budget_service import BudgetService
from services.dashboard_service import DashboardService


class ReportService:
    """
    Handles AI-powered financial report generation.
    """

    @staticmethod
    def generate_financial_report(
        db: Session,
        current_user: User,
    ) -> FinancialReportResponse:

        # -----------------------------
        # Existing Dashboard Summary
        # -----------------------------

        summary = DashboardService.get_summary(
            db,
            current_user,
        )

        # -----------------------------
        # Existing Category Expenses
        # -----------------------------

        category_expenses = (
            DashboardService.get_category_expenses(
                db,
                current_user,
            )
        )

        # Highest spending first

        top_expenses = sorted(
            category_expenses,
            key=lambda item: item["amount"],
            reverse=True,
        )[:5]

        # -----------------------------
        # Existing Budgets
        # -----------------------------

        budget_response = BudgetService.get_budgets(
            db,
            current_user,
            page=1,
            page_size=1000,
        )

        budgets = [
            budget.model_dump()
            for budget in budget_response.items
        ]

        # -----------------------------
        # AI Context
        # -----------------------------

        financial_context = {
            "summary": summary,
            "budgets": budgets,
            "top_expenses": top_expenses,
        }

        # -----------------------------
        # AI Report
        # -----------------------------

        agent = ReportAgent()

        ai_report = agent.run(
            financial_context,
        )

        # -----------------------------
        # Response
        # -----------------------------

        return FinancialReportResponse(
            generated_at=datetime.utcnow(),
            summary=summary,
            budgets=budgets,
            top_expenses=top_expenses,
            ai_report=ai_report,
        )