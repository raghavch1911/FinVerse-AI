import API from "./api";

import type {
  Budget,
  BudgetListResponse,
  CreateBudgetRequest,
  UpdateBudgetRequest,
} from "../types/budget";

class BudgetService {
  async getBudgets(
    page = 1,
    pageSize = 10
  ): Promise<BudgetListResponse> {
    const response = await API.get("/budgets", {
      params: {
        page,
        page_size: pageSize,
      },
    });

    return response.data;
  }

  async getBudget(id: number): Promise<Budget> {
    const response = await API.get(`/budgets/${id}`);

    return response.data;
  }

  async createBudget(
    data: CreateBudgetRequest
  ): Promise<Budget> {
    const response = await API.post("/budgets", data);

    return response.data;
  }

  async updateBudget(
    id: number,
    data: UpdateBudgetRequest
  ): Promise<Budget> {
    const response = await API.put(
      `/budgets/${id}`,
      data
    );

    return response.data;
  }

  async deleteBudget(id: number): Promise<void> {
    await API.delete(`/budgets/${id}`);
  }
}

export default new BudgetService();