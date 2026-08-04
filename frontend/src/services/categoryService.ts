import API from "./api";
import type { Category } from "../types/category";

class CategoryService {
  async getCategories(): Promise<Category[]> {
    const response = await API.get("/categories");

    return response.data;
  }
}

export default new CategoryService();