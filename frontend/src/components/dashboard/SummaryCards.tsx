import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from "lucide-react";

import dashboardService from "../../services/dashboardService";
import type { DashboardSummary } from "../../services/dashboardService";

export default function SummaryCards() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await dashboardService.getSummary();
        setSummary(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-44 animate-pulse rounded-3xl bg-slate-800"
          />
        ))}
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-400">
        {error || "Unable to load dashboard."}
      </div>
    );
  }

  const savings =
    summary.total_income - summary.total_expense;

  const cards = [
    {
      title: "Total Balance",
      value: summary.current_balance,
      change: "",
      positive: true,
      icon: Wallet,
      color: "from-indigo-600 to-blue-500",
    },
    {
      title: "Income",
      value: summary.total_income,
      change: "",
      positive: true,
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Expenses",
      value: summary.total_expense,
      change: "",
      positive: false,
      icon: TrendingDown,
      color: "from-rose-500 to-red-500",
    },
    {
      title: "Savings",
      value: savings,
      change: "",
      positive: savings >= 0,
      icon: PiggyBank,
      color: "from-cyan-500 to-sky-500",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
            whileHover={{
              y: -6,
            }}
            className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl transition-all"
          >
            <div className="flex items-center justify-between">
              <div
                className={`rounded-2xl bg-gradient-to-r ${card.color} p-3`}
              >
                <Icon
                  size={24}
                  className="text-white"
                />
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  card.positive
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {card.positive ? "Positive" : "Negative"}
              </span>
            </div>

            <p className="mt-6 text-sm text-slate-400">
              {card.title}
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              ₹{card.value.toLocaleString("en-IN")}
            </h2>
          </motion.div>
        );
      })}
    </div>
  );
}