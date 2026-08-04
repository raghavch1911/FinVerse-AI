import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

interface Budget {
  id: number;
  category: string;
  amount: number;
  spent: number;
  remaining: number;
  utilization_percentage: number;
  status: string;
}

interface Props {
  budgets: Budget[];
}

export default function BudgetPerformance({
  budgets,
}: Props) {
  return (
    <div>

      <h2 className="mb-6 text-2xl font-bold text-white">
        Budget Performance
      </h2>

      <div className="space-y-5">

        {budgets.map((budget, index) => (

          <motion.div
            key={budget.id}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
            className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl"
          >

            <div className="mb-5 flex items-center justify-between">

              <div>

                <h3 className="text-lg font-semibold text-white">
                  {budget.category}
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  ₹{budget.spent.toLocaleString("en-IN")} spent of ₹
                  {budget.amount.toLocaleString("en-IN")}
                </p>

              </div>

              {budget.status === "SAFE" && (
                <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-green-400">
                  <CheckCircle2 size={18} />
                  SAFE
                </div>
              )}

              {budget.status === "WARNING" && (
                <div className="flex items-center gap-2 rounded-full bg-yellow-500/10 px-4 py-2 text-yellow-400">
                  <AlertTriangle size={18} />
                  WARNING
                </div>
              )}

              {budget.status === "OVER_BUDGET" && (
                <div className="flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-2 text-red-400">
                  <XCircle size={18} />
                  OVER BUDGET
                </div>
              )}

              {budget.status === "NORMAL" && (
                <div className="rounded-full bg-indigo-500/10 px-4 py-2 text-indigo-400">
                  NORMAL
                </div>
              )}

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-800">

              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${Math.min(
                    budget.utilization_percentage,
                    100
                  )}%`,
                }}
                transition={{
                  duration: 1,
                }}
                className={`h-full rounded-full ${
                  budget.status === "SAFE"
                    ? "bg-green-500"
                    : budget.status === "WARNING"
                    ? "bg-yellow-500"
                    : budget.status === "OVER_BUDGET"
                    ? "bg-red-500"
                    : "bg-indigo-500"
                }`}
              />

            </div>

            <div className="mt-4 flex justify-between text-sm">

              <span className="text-slate-400">
                Utilization
              </span>

              <span className="font-semibold text-white">
                {budget.utilization_percentage.toFixed(1)}%
              </span>

            </div>

            <div className="mt-2 flex justify-between text-sm">

              <span className="text-slate-400">
                Remaining
              </span>

              <span className="font-semibold text-green-400">
                ₹{budget.remaining.toLocaleString("en-IN")}
              </span>

            </div>

          </motion.div>

        ))}

      </div>

    </div>
  );
}