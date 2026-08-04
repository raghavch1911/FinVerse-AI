export interface Profile {
  id: number;
  user_id: number;

  phone: string | null;

  date_of_birth: string | null;

  currency: string;

  monthly_income: number;

  financial_goal: string | null;

  created_at: string;
  updated_at: string;
}

export interface ProfileRequest {
  phone?: string;

  date_of_birth?: string;

  currency?: string;

  monthly_income?: number;

  financial_goal?: string;
}