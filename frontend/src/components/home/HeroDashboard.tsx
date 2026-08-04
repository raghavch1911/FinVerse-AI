import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Wallet,
  TrendingUp,
  PiggyBank,
  Brain,
} from "lucide-react";

export default function HeroDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="relative hidden lg:flex items-center justify-center"
    >

      {/* Floating Savings Card */}

      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="absolute -left-24 top-8 z-30 rounded-2xl border border-cyan-500/20 bg-slate-900/90 px-5 py-4 shadow-[0_15px_40px_rgba(34,211,238,.15)] backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">

          <PiggyBank
            size={24}
            className="text-cyan-400"
          />

          <div>

            <p className="text-[11px] uppercase tracking-wider text-slate-400">
              Savings
            </p>

            <h3 className="text-xl font-bold">
              ₹82,000
            </h3>

            <p className="mt-1 text-[11px] text-green-400">
              ↑ 12% this month
            </p>

          </div>

        </div>
      </motion.div>

      {/* Floating AI Card */}

      <motion.div
        animate={{ y: [8, -8, 8] }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="absolute -right-20 bottom-16 z-30 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950 to-slate-900 px-5 py-4 shadow-[0_0_40px_rgba(99,102,241,.35)] backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">

          <Brain
            size={24}
            className="text-indigo-400"
          />

          <div>

            <p className="text-[11px] uppercase tracking-wider text-slate-400">
              AI Insight
            </p>

            <h3 className="text-lg font-semibold">
              Saved ₹2,430
            </h3>

          </div>

        </div>
      </motion.div>

      {/* Dashboard */}

      <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 shadow-[0_25px_80px_rgba(79,70,229,.18)] backdrop-blur-xl">

        {/* Glow */}

        <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-indigo-500/15 via-transparent to-cyan-500/10" />

        <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-indigo-500/10 blur-[120px]" />

        <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-cyan-500/10 blur-[120px]" />

        {/* AI Badge */}

        <div className="absolute right-8 top-8 rounded-full bg-indigo-500/15 px-4 py-2 text-xs font-semibold text-indigo-300">

          AI Powered

        </div>

        <div className="relative w-[500px]">

          {/* Window Controls */}

          <div className="mb-6 flex items-center gap-2">

            <div className="h-3 w-3 rounded-full bg-red-400" />

            <div className="h-3 w-3 rounded-full bg-yellow-400" />

            <div className="h-3 w-3 rounded-full bg-green-400" />

          </div>

          {/* Summary Cards */}

          <div className="grid grid-cols-3 gap-5">

            {/* Balance */}

            <div className="rounded-2xl bg-slate-800/90 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-700 hover:shadow-lg hover:shadow-indigo-500/10">

              <Wallet
                className="mb-4 text-indigo-400"
                size={26}
              />

              <p className="text-sm text-slate-400">
                Balance
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                ₹1.24L
              </h2>

              <p className="mt-2 text-xs text-green-400">
                ↑ 8.2% this month
              </p>

            </div>

            {/* Investment */}

            <div className="rounded-2xl bg-slate-800/90 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-700 hover:shadow-lg hover:shadow-green-500/10">

              <TrendingUp
                className="mb-4 text-green-400"
                size={26}
              />

              <p className="text-sm text-slate-400">
                Investments
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                ₹4.8L
              </h2>

              <p className="mt-2 text-xs text-green-400">
                ↑ 18.5% yearly
              </p>

            </div>

            {/* Budget */}

            <div className="rounded-2xl bg-slate-800/90 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-700 hover:shadow-lg hover:shadow-cyan-500/10">

              <PiggyBank
                className="mb-4 text-cyan-400"
                size={26}
              />

              <p className="text-sm text-slate-400">
                Budget Used
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                82%
              </h2>

              <p className="mt-2 text-xs text-yellow-400">
                ₹18,000 remaining
              </p>

            </div>

          </div>

          {/* Monthly Spending */}

          <div className="relative mt-8 rounded-2xl bg-slate-800/90 p-6">

            <div className="mb-6 flex items-center justify-between">

              <h3 className="text-xl font-semibold">
                Monthly Spending
              </h3>

              <span className="rounded-full bg-green-500/10 px-4 py-1 text-sm font-medium text-green-400">
                +12%
              </span>

            </div>
                        <div className="relative h-44">

              {/* Baseline */}

              <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-700" />

              <div className="flex h-full items-end gap-4">

                {[38, 72, 48, 95, 60, 120, 82].map(
                  (height, index) => (
                    <motion.div
                      key={index}
                      animate={{
                        height: [
                          height - 10,
                          height,
                          height - 10,
                        ],
                      }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "mirror",
                        duration: 2,
                        delay: index * 0.15,
                      }}
                      className="flex-1 rounded-full bg-gradient-to-t from-indigo-600 via-indigo-500 to-indigo-300 shadow-[0_0_25px_rgba(99,102,241,.35)]"
                    />
                  )
                )}

              </div>

            </div>

          </div>

          {/* Recent Transaction */}

          <div className="mt-8 rounded-2xl bg-slate-800/90 p-5 transition-all duration-300 hover:bg-slate-700">

            <div className="mb-5 flex items-center justify-between">

              <h3 className="text-lg font-semibold">
                Recent Transaction
              </h3>

              <span className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300">
                Today
              </span>

            </div>

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div className="rounded-2xl bg-green-500/10 p-3">

                  <ArrowUpRight
                    size={24}
                    className="text-green-400"
                  />

                </div>

                <div>

                  <p className="text-lg font-semibold">
                    Salary Received
                  </p>

                  <p className="text-sm text-slate-400">
                    Today • HDFC Bank
                  </p>

                </div>

              </div>

              <div className="text-right">

                <h3 className="text-2xl font-bold text-green-400">
                  +₹75,000
                </h3>

                <p className="text-xs text-slate-400">
                  Successfully credited
                </p>

              </div>

            </div>

          </div>

          {/* AI Recommendation */}

          <div className="mt-6 rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 via-slate-800 to-slate-800 p-5">

            <div className="flex items-start gap-4">

              <div className="rounded-xl bg-indigo-500/20 p-3">

                <Brain
                  size={24}
                  className="text-indigo-400"
                />

              </div>

              <div>

                <h3 className="font-semibold text-white">
                  AI Recommendation
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  You're on track to save
                  <span className="font-semibold text-green-400">
                    {" "}
                    ₹18,500
                  </span>
                  {" "}this month. Consider investing
                  your surplus into an index fund for
                  better long-term growth.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </motion.div>
  );
}