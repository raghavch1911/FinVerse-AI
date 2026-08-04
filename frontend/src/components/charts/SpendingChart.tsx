import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

import dashboardService from "../../services/dashboardService";
import type { MonthlySummary } from "../../services/dashboardService";

export default function SpendingChart() {
  const [data, setData] = useState<MonthlySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response =
          await dashboardService.getMonthlySummary();
        setData(response);
      } catch (err) {
        console.error(err);
        setError("Failed to load chart.");
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  if (loading) {
    return (
      <div className="h-64 w-full animate-pulse rounded-3xl bg-slate-800" />
    );
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center rounded-3xl border border-red-500/30 bg-red-500/10 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">
          Monthly Income vs Expenses
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Track your monthly financial performance
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="incomeGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#22c55e"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#22c55e"
                  stopOpacity={0}
                />
              </linearGradient>

              <linearGradient
                id="expenseGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#6366f1"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#6366f1"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#334155"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
              stroke="#94a3b8"
            />

            <YAxis stroke="#94a3b8" />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Legend />

            <Area
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              fill="url(#incomeGradient)"
              strokeWidth={3}
              name="Income"
            />

            <Area
              type="monotone"
              dataKey="expense"
              stroke="#6366f1"
              fill="url(#expenseGradient)"
              strokeWidth={3}
              name="Expense"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}