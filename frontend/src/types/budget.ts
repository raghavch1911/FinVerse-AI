export interface Budget {
  id: number;

  category_id: number;

  amount: number;

  month: number;
  year: number;

  alert_percentage: number;

  is_active: boolean;

  created_at: string;
  updated_at: string;

  // Calculated by backend
  spent: number;
  remaining: number;
  utilization_percentage: number;

  status:
    | "SAFE"
    | "NORMAL"
    | "WARNING"
    | "OVER_BUDGET";
}

export interface BudgetListResponse {
  items: Budget[];

  page: number;
  page_size: number;

  total_records: number;
  total_pages: number;

  has_next: boolean;
  has_previous: boolean;
}

export interface CreateBudgetRequest {
  category_id: number;

  amount: number;

  month: number;
  year: number;

  alert_percentage: number;
}

export interface UpdateBudgetRequest {
  amount?: number;

  month?: number;

  year?: number;

  alert_percentage?: number;

  is_active?: boolean;
}