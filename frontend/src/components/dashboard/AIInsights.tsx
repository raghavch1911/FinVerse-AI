import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AIInsights() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-900/40 to-cyan-900/20 p-6 backdrop-blur-xl"
    >
      <div className="mb-5 flex items-center gap-3">
        <Sparkles className="text-indigo-400" />

        <h2 className="text-xl font-bold text-white">
          AI Insight
        </h2>
      </div>

      <p className="leading-7 text-slate-300">
        Your food expenses increased by
        <span className="font-semibold text-indigo-400">
          {" "}
          14%
        </span>
        {" "}
        compared to last month.
        <br />
        <br />
        Consider setting a weekly spending limit to improve your monthly
        savings.
      </p>

      <button
        type="button"
        onClick={() => navigate("/insights")}
        className="mt-8 w-full rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition duration-200 hover:bg-indigo-500"
      >
        View Full Analysis
      </button>
    </motion.div>
  );
}