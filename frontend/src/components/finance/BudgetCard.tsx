import { Pencil, Trash2 } from "lucide-react";

import type { Budget } from "../../types/budget";
import type { Category } from "../../types/category";

interface BudgetCardProps {
  budget: Budget;
  categories: Category[];
  onEdit: (budget: Budget) => void;
  onDelete: (budget: Budget) => void;
}

export default function BudgetCard({
  budget,
  categories,
  onEdit,
  onDelete,
}: BudgetCardProps) {
  const category =
    categories.find(
      (c) => c.id === budget.category_id
    )?.name ?? "Unknown Category";

  const progress = Math.min(
    budget.utilization_percentage,
    100
  );

  const statusStyles = {
    SAFE: "bg-green-500/20 text-green-400",
    NORMAL: "bg-yellow-500/20 text-yellow-400",
    WARNING: "bg-orange-500/20 text-orange-400",
    OVER_BUDGET: "bg-red-500/20 text-red-400",
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">
            {category}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            {budget.month}/{budget.year}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(budget)}
            className="rounded-lg p-2 text-blue-400 transition hover:bg-blue-500/10"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(budget)}
            className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-700">
        <div
          className={`h-full rounded-full ${
            budget.status === "OVER_BUDGET"
              ? "bg-red-500"
              : budget.status === "WARNING"
              ? "bg-orange-500"
              : budget.status === "NORMAL"
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <div className="mt-3 flex justify-between text-sm">
        <span className="text-slate-400">
          {budget.utilization_percentage.toFixed(1)}%
        </span>

        <span className="font-medium text-white">
          ₹{budget.spent.toLocaleString("en-IN")} / ₹
          {budget.amount.toLocaleString("en-IN")}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div>
          {budget.remaining >= 0 ? (
            <p className="text-green-400">
              Remaining ₹
              {budget.remaining.toLocaleString("en-IN")}
            </p>
          ) : (
            <p className="text-red-400">
              Overspent ₹
              {Math.abs(budget.remaining).toLocaleString(
                "en-IN"
              )}
            </p>
          )}
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusStyles[budget.status]
          }`}
        >
          {budget.status.replace("_", " ")}
        </span>
      </div>
    </div>
  );
}