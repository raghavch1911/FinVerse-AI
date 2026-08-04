import API from "./api";

export interface DashboardSummary {
  total_income: number;
  total_expense: number;
  current_balance: number;
  total_transactions: number;
}

export interface CategoryExpense {
  category: string;
  amount: number;
}

export interface MonthlySummary {
  month: string;
  income: number;
  expense: number;
}

export interface RecentTransaction {
  id: number;
  title: string;
  category: string;
  type: string;
  amount: number;
  transaction_date: string;
}

class DashboardService {
  async getSummary(): Promise<DashboardSummary> {
    const response = await API.get("/dashboard/summary");
    return response.data;
  }

  async getCategoryExpenses(): Promise<CategoryExpense[]> {
    const response = await API.get("/dashboard/category-expenses");
    return response.data;
  }

  async getMonthlySummary(): Promise<MonthlySummary[]> {
    const response = await API.get("/dashboard/monthly-summary");
    return response.data;
  }

  async getRecentTransactions(): Promise<RecentTransaction[]> {
    const response = await API.get(
      "/dashboard/recent-transactions"
    );
    return response.data;
  }
}

export default new DashboardService();