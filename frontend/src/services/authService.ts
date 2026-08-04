import API from "./api";

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from "../types/auth";

class AuthService {
  // -----------------------------
  // Register
  // -----------------------------
  async register(
    data: RegisterRequest
  ): Promise<User> {
    const response = await API.post<User>(
      "/auth/register",
      data
    );

    return response.data;
  }

  // -----------------------------
  // Login
  // -----------------------------
  async login(
    data: LoginRequest
  ): Promise<LoginResponse> {
    const response =
      await API.post<LoginResponse>(
        "/auth/login",
        data
      );

    localStorage.setItem(
      "access_token",
      response.data.access_token
    );

    return response.data;
  }

  // -----------------------------
  // Current User
  // -----------------------------
  async getCurrentUser(): Promise<User> {
    const response =
      await API.get<User>("/auth/me");

    return response.data;
  }

  // -----------------------------
  // Update User
  // -----------------------------
  async updateCurrentUser(data: {
    username: string;
    email: string;
  }): Promise<User> {
    const response =
      await API.put<User>(
        "/auth/me",
        data
      );

    return response.data;
  }

  // -----------------------------
  // Change Password
  // -----------------------------
  async changePassword(data: {
    current_password: string;
    new_password: string;
  }): Promise<{ message: string }> {
    const response =
      await API.put(
        "/auth/change-password",
        data
      );

    return response.data;
  }

  // -----------------------------
  // Logout
  // -----------------------------
  logout() {
    localStorage.removeItem(
      "access_token"
    );
  }

  // -----------------------------
  // Authentication Status
  // -----------------------------
  isAuthenticated(): boolean {
    return !!localStorage.getItem(
      "access_token"
    );
  }

  getToken(): string | null {
    return localStorage.getItem(
      "access_token"
    );
  }
}

export default new AuthService();