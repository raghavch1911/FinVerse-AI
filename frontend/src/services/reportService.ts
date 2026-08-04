import API from "./api";

export interface ReportSummary {
  total_income: number;
  total_expense: number;
  current_balance: number;
  total_transactions: number;
}

export interface ReportBudget {
  id: number;
  category_id: number;
  category: string;
  amount: number;
  month: number;
  year: number;
  alert_percentage: number;
  is_active: boolean;
  spent: number;
  remaining: number;
  utilization_percentage: number;
  status: string;
}

export interface TopExpense {
  category: string;
  amount: number;
}

export interface FinancialReport {
  generated_at: string;
  summary: ReportSummary;
  budgets: ReportBudget[];
  top_expenses: TopExpense[];
  ai_report: string;
}

class ReportService {
  async getFinancialReport(): Promise<FinancialReport> {
    const response = await API.get(
      "/reports/financial-summary"
    );

    return response.data;
  }
}

export default new ReportService();