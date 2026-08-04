import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  TrendingUp,
  PiggyBank,
} from "lucide-react";
import HeroChart from "./HeroChart";

const transactions = [
  {
    title: "Netflix",
    amount: "- ₹649",
    color: "text-red-400",
  },
  {
    title: "Salary",
    amount: "+ ₹75,000",
    color: "text-green-400",
  },
  {
    title: "Amazon",
    amount: "- ₹2,349",
    color: "text-red-400",
  },
  {
    title: "Mutual Fund",
    amount: "+ ₹4,200",
    color: "text-green-400",
  },
];

export default function DashboardPreview() {
  return (
    <section
      id="dashboard"
      className="bg-slate-950 py-32"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-8 lg:flex-row">

        {/* Left Side */}

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-indigo-300">
            Dashboard Preview
          </span>

          <h2 className="mt-8 text-5xl font-black leading-tight">
            Everything in
            <span className="block text-indigo-400">
              One Place
            </span>
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-9 text-slate-400">
            Track spending, monitor investments,
            analyze budgets and receive AI-powered
            recommendations through a beautiful dashboard.
          </p>
        </motion.div>

        {/* Right Side */}

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1 w-full"
        >
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">

            {/* Summary Cards */}

            <div className="grid grid-cols-3 gap-5">

              <div className="rounded-2xl bg-slate-900 p-5">
                <Wallet className="mb-4 text-indigo-400" />

                <p className="text-sm text-slate-400">
                  Balance
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  ₹1,24,500
                </h3>
              </div>

              <div className="rounded-2xl bg-slate-900 p-5">
                <TrendingUp className="mb-4 text-green-400" />

                <p className="text-sm text-slate-400">
                  Investments
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  ₹4.8L
                </h3>
              </div>

              <div className="rounded-2xl bg-slate-900 p-5">
                <PiggyBank className="mb-4 text-cyan-400" />

                <p className="text-sm text-slate-400">
                  Savings
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  ₹82K
                </h3>
              </div>

            </div>

            {/* Spending Chart */}

            <div className="mt-8 rounded-2xl bg-slate-900 p-6">

              <div className="mb-6 flex items-center justify-between">

                <h3 className="font-bold text-lg">
                  Monthly Spending
                </h3>

                <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-400">
                  +12%
                </span>

              </div>

              <HeroChart />

            </div>

            {/* Transactions */}

            <div className="mt-8 rounded-2xl bg-slate-900 p-6">

              <h3 className="mb-5 text-lg font-bold">
                Recent Transactions
              </h3>

              <div className="space-y-4">

                {transactions.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-xl px-2 py-2 transition hover:bg-slate-800"
                  >
                    <div className="flex items-center gap-4">

                      {item.amount.startsWith("+") ? (
                        <ArrowUpRight className="text-green-400" />
                      ) : (
                        <ArrowDownRight className="text-red-400" />
                      )}

                      <span>{item.title}</span>

                    </div>

                    <span className={`${item.color} font-semibold`}>
                      {item.amount}
                    </span>

                  </div>
                ))}

              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}