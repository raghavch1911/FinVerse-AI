import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import AuthService from "../services/authService";
import type {
  AuthContextType,
  User,
} from "../types/auth";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  const [token, setToken] = useState<string | null>(
    AuthService.getToken()
  );

  // ---------------------------------
  // Load Current User
  // ---------------------------------

  useEffect(() => {
    const loadUser = async () => {
      if (!AuthService.isAuthenticated()) {
        setLoading(false);
        return;
      }

      try {
        const currentUser =
          await AuthService.getCurrentUser();

        setUser(currentUser);
      } catch (error) {
        console.error(error);

        AuthService.logout();

        setUser(null);

        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // ---------------------------------
  // Login
  // ---------------------------------

  const login = async (
    email: string,
    password: string
  ) => {
    await AuthService.login({
      email,
      password,
    });

    const currentUser =
      await AuthService.getCurrentUser();

    setUser(currentUser);

    setToken(AuthService.getToken());
  };

  // ---------------------------------
  // Register
  // ---------------------------------

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    await AuthService.register({
      username,
      email,
      password,
    });
  };

  // ---------------------------------
  // Logout
  // ---------------------------------

  const logout = () => {
    AuthService.logout();

    setUser(null);

    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}