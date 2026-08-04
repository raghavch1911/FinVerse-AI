import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import ProtectedRoute from "../components/common/ProtectedRoute";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Dashboard from "../pages/Dashboard";
import Insights from "../pages/Insights";
import Transactions from "../pages/Transactions";
import Budgets from "../pages/Budgets";
import Documents from "../pages/Documents";
import AIAssistant from "../pages/AIAssistant";
import Settings from "../pages/Settings";
import Reports from "../pages/Reports";
import DocumentDetails from "../pages/DocumentDetails";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==========================
            PUBLIC
        ========================== */}

        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={<Home />}
          />
        </Route>

        {/* ==========================
            AUTH
        ========================== */}

        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />
        </Route>

        {/* ==========================
            PROTECTED
        ========================== */}

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
  path="/reports"
  element={<Reports />}
/>

          <Route
            path="/insights"
            element={<Insights />}
          />

          <Route
            path="/transactions"
            element={<Transactions />}
          />

          <Route
            path="/budgets"
            element={<Budgets />}
          />

          <Route
            path="/documents"
            element={<Documents />}
          />

          <Route
  path="/documents/:id"
  element={<DocumentDetails />}
/>

          <Route
            path="/assistant"
            element={<AIAssistant />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />
        </Route>

        {/* ==========================
            REDIRECT
        ========================== */}

        <Route
          path="/home"
          element={<Navigate to="/" replace />}
        />

        {/* ==========================
            404
        ========================== */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}