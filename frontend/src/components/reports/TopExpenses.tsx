import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface Expense {
  category: string;
  amount: number;
}

interface Props {
  expenses: Expense[];
}

export default function TopExpenses({
  expenses,
}: Props) {
  const maxAmount =
    Math.max(
      ...expenses.map(
        (item) => item.amount
      ),
      1
    );

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">

      <div className="mb-8 flex items-center gap-3">

        <TrendingUp
          className="text-red-400"
          size={26}
        />

        <h2 className="text-2xl font-bold text-white">
          Top Spending Categories
        </h2>

      </div>

      <div className="space-y-6">

        {expenses.map(
          (expense, index) => (

            <motion.div
              key={expense.category}
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
            >

              <div className="mb-2 flex justify-between">

                <span className="font-medium text-white">
                  {expense.category}
                </span>

                <span className="font-semibold text-red-400">
                  ₹{expense.amount.toLocaleString("en-IN")}
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-800">

                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: `${
                      (expense.amount /
                        maxAmount) *
                      100
                    }%`,
                  }}
                  transition={{
                    duration: 1,
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-400"
                />

              </div>

            </motion.div>

          )
        )}

      </div>

    </div>
  );
}