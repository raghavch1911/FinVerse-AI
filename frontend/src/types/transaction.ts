export interface Transaction {
  id: number;
  user_id: number;
  category_id: number;

  type: "INCOME" | "EXPENSE";

  title: string;
  description?: string;

  amount: number;

  transaction_date: string;

  created_at: string;
  updated_at: string;
}

export interface TransactionSummary {
  total_income: number;
  total_expense: number;
  balance: number;
}

export interface TransactionListResponse {
  items: Transaction[];

  page: number;
  page_size: number;

  total_records: number;
  total_pages: number;

  has_next: boolean;
  has_previous: boolean;

  summary: TransactionSummary;
}

export interface TransactionFilters {
  page?: number;
  page_size?: number;

  search?: string;
  category?: string;

  transaction_type?: "INCOME" | "EXPENSE";

  start_date?: string;
  end_date?: string;

  min_amount?: number;
  max_amount?: number;

  sort_by?: string;
  order?: "asc" | "desc";
}

export interface CreateTransactionRequest {
  category_id: number;

  type: "INCOME" | "EXPENSE";

  title: string;
  description?: string;

  amount: number;

  transaction_date: string;
}

export interface UpdateTransactionRequest {
  category_id?: number;

  type?: "INCOME" | "EXPENSE";

  title?: string;
  description?: string;

  amount?: number;

  transaction_date?: string;
}