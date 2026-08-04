from datetime import datetime

from pydantic import BaseModel


class FinancialReportResponse(BaseModel):
    """
    AI-generated financial report response.
    """

    generated_at: datetime

    summary: dict

    budgets: list

    top_expenses: list

    ai_report: str