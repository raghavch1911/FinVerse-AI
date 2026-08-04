import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Target } from "lucide-react";

import budgetService from "../../services/budgetService";
import categoryService from "../../services/categoryService";

import type { Budget } from "../../types/budget";
import type { Category } from "../../types/category";

const colors = [
  "bg-indigo-500",
  "bg-cyan-500",
  "bg-emerald-500",
  "bg-pink-500",
  "bg-orange-500",
  "bg-violet-500",
];

export default function BudgetProgress() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const loadData = async () => {
    try {
      const [budgetResponse, categoryResponse] =
        await Promise.all([
          budgetService.getBudgets(),
          categoryService.getCategories(),
        ]);

      setBudgets(budgetResponse.items);
      setCategories(categoryResponse);
    } catch (err) {
      console.error(err);
      setError("Unable to load budgets.");
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, []);

  if (loading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
        <div className="mb-6 h-6 w-40 animate-pulse rounded bg-slate-700" />

        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-10 animate-pulse rounded bg-slate-800"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 25,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-indigo-600 p-2">
          <Target
            className="text-white"
            size={20}
          />
        </div>

        <h2 className="text-xl font-bold text-white">
          Budget Progress
        </h2>
      </div>

      {budgets.length === 0 ? (
        <p className="text-center text-slate-400">
          No budgets created yet.
        </p>
      ) : (
        <div className="space-y-6">
          {budgets.map((budget, index) => {
            const percentage = Math.min(
              budget.utilization_percentage,
              100
            );

            return (
              <div key={budget.id}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-300">
                    {
  categories.find(
    (category) => category.id === budget.category_id
  )?.name ?? `Category #${budget.category_id}`
}
                  </span>

                  <span className="text-slate-400">
                    ₹
                    {budget.spent.toLocaleString(
                      "en-IN"
                    )}{" "}
                    / ₹
                    {budget.amount.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

                <div className="mb-1 h-3 overflow-hidden rounded-full bg-slate-700">
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${percentage}%`,
                    }}
                    transition={{
                      duration: 1,
                    }}
                    className={`h-full rounded-full ${
                      colors[index % colors.length]
                    }`}
                  />
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">
                    {percentage.toFixed(1)}%
                  </span>

                  <span
                    className={`font-medium ${
                      budget.status === "SAFE"
                        ? "text-green-400"
                        : budget.status === "WARNING"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {budget.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}