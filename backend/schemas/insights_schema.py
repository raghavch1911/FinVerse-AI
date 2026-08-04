from pydantic import BaseModel


class FinancialSummary(BaseModel):
    total_income: float
    total_expense: float
    balance: float


class BudgetInsight(BaseModel):
    category: str
    budget: float
    spent: float
    remaining: float
    utilization_percentage: float
    status: str


class CategoryInsight(BaseModel):
    category: str
    amount: float


class Recommendation(BaseModel):
    title: str
    description: str
    priority: str


class FinancialInsightsResponse(BaseModel):
    financial_health_score: int

    summary: FinancialSummary

    budgets: list[BudgetInsight]

    top_expenses: list[CategoryInsight]

    recommendations: list[Recommendation]