export interface FinancialSummary {
  total_income: number;
  total_expense: number;
  balance: number;
}

export interface BudgetInsight {
  category: string;
  budget: number;
  spent: number;
  remaining: number;
  utilization_percentage: number;
  status: string;
}

export interface CategoryInsight {
  category: string;
  amount: number;
}

export interface Recommendation {
  title: string;
  description: string;
  priority: string;
}

export interface FinancialInsightsResponse {
  financial_health_score: number;

  summary: FinancialSummary;

  budgets: BudgetInsight[];

  top_expenses: CategoryInsight[];

  recommendations: Recommendation[];
}