import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { Toaster } from "react-hot-toast";

import "./index.css";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

const queryClient = new QueryClient();

createRoot(
  document.getElementById("root")!
).render(
  <StrictMode>

    <QueryClientProvider client={queryClient}>

      <ThemeProvider>

        <AuthProvider>

          <App />

          <Toaster
            position="top-right"
            reverseOrder={false}
          />

        </AuthProvider>

      </ThemeProvider>

    </QueryClientProvider>

  </StrictMode>
);