import type { BudgetInsight } from "../../types/insights";

interface Props {
  budget: BudgetInsight;
}

export default function BudgetCard({
  budget,
}: Props) {
  const percentage = Math.min(
    budget.utilization_percentage,
    100
  );

  const color =
    percentage >= 90
      ? "bg-red-500"
      : percentage >= 70
      ? "bg-yellow-500"
      : "bg-green-500";

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

      <div className="flex items-center justify-between">

        <h3 className="font-semibold text-white">
          {budget.category}
        </h3>

        <span className="text-sm text-zinc-400">
          {percentage.toFixed(0)}%
        </span>

      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-800">

        <div
          className={`${color} h-full transition-all`}
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">

        <div>
          <p className="text-zinc-500">
            Budget
          </p>

          <p className="font-semibold text-white">
            ₹{budget.budget.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-zinc-500">
            Spent
          </p>

          <p className="font-semibold text-white">
            ₹{budget.spent.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-zinc-500">
            Remaining
          </p>

          <p className="font-semibold text-white">
            ₹{budget.remaining.toLocaleString()}
          </p>
        </div>

      </div>

    </div>
  );
}