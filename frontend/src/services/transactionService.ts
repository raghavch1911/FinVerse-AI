import API from "./api";
import type {
  Transaction,
  TransactionFilters,
  TransactionListResponse,
  CreateTransactionRequest,
  UpdateTransactionRequest,
} from "../types/transaction";

class TransactionService {
  async getTransactions(
    filters: TransactionFilters = {}
  ): Promise<TransactionListResponse> {
    const response = await API.get("/transactions", {
      params: filters,
    });

    return response.data;
  }

  async getTransaction(
    id: number
  ): Promise<Transaction> {
    const response = await API.get(
      `/transactions/${id}`
    );

    return response.data;
  }

  async createTransaction(
    data: CreateTransactionRequest
  ): Promise<Transaction> {
    const response = await API.post(
      "/transactions",
      data
    );

    return response.data;
  }

  async updateTransaction(
    id: number,
    data: UpdateTransactionRequest
  ): Promise<Transaction> {
    const response = await API.put(
      `/transactions/${id}`,
      data
    );

    return response.data;
  }

  async deleteTransaction(id: number) {
    const response = await API.delete(
      `/transactions/${id}`
    );

    return response.data;
  }
}

export default new TransactionService();