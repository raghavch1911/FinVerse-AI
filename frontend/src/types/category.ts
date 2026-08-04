export interface Category {
  id: number;
  user_id: number;

  name: string;

  type: "INCOME" | "EXPENSE";

  created_at: string;
}