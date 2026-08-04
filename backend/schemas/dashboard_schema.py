from pydantic import BaseModel, ConfigDict


class DashboardSummary(BaseModel):
    total_income: float
    total_expense: float
    current_balance: float
    total_transactions: int


class CategoryExpense(BaseModel):
    category: str
    amount: float


class MonthlySummary(BaseModel):
    month: str
    income: float
    expense: float


class RecentTransaction(BaseModel):
    id: int
    title: str
    category: str
    type: str
    amount: float
    transaction_date: str


class DashboardResponse(BaseModel):
    summary: DashboardSummary
    category_expenses: list[CategoryExpense]
    monthly_summary: list[MonthlySummary]
    recent_transactions: list[RecentTransaction]

    model_config = ConfigDict(
        from_attributes=True,
    )