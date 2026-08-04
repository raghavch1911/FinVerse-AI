import { motion } from "framer-motion";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Wallet,
  Receipt,
} from "lucide-react";

interface Props {
  summary: {
    total_income: number;
    total_expense: number;
    current_balance: number;
    total_transactions: number;
  };
}

const cards = (
  summary: Props["summary"]
) => [
  {
    title: "Total Income",
    value: `₹${summary.total_income.toLocaleString("en-IN")}`,
    icon: ArrowUpCircle,
    color: "text-green-400",
    bg: "from-green-500/20 to-green-500/5",
  },
  {
    title: "Total Expense",
    value: `₹${summary.total_expense.toLocaleString("en-IN")}`,
    icon: ArrowDownCircle,
    color: "text-red-400",
    bg: "from-red-500/20 to-red-500/5",
  },
  {
    title: "Current Balance",
    value: `₹${summary.current_balance.toLocaleString("en-IN")}`,
    icon: Wallet,
    color: "text-indigo-400",
    bg: "from-indigo-500/20 to-indigo-500/5",
  },
  {
    title: "Transactions",
    value: summary.total_transactions,
    icon: Receipt,
    color: "text-cyan-400",
    bg: "from-cyan-500/20 to-cyan-500/5",
  },
];

export default function ReportSummaryCards({
  summary,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards(summary).map(
        (card, index) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.title}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
              className={`rounded-3xl border border-white/10 bg-gradient-to-br ${card.bg} p-6 backdrop-blur-xl`}
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-400">
                    {card.title}
                  </p>

                  <h2 className="mt-3 text-3xl font-black text-white">
                    {card.value}
                  </h2>

                </div>

                <div className="rounded-2xl bg-slate-900/60 p-4">

                  <Icon
                    size={28}
                    className={card.color}
                  />

                </div>

              </div>

            </motion.div>
          );
        }
      )}

    </div>
  );
}