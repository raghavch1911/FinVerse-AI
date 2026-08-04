import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Bot, Sparkles } from "lucide-react";

interface Props {
  report: string;
}

export default function AIReportCard({
  report,
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="rounded-3xl border border-indigo-500/20 bg-slate-900/70 backdrop-blur-xl shadow-xl"
    >
      {/* Header */}

      <div className="flex items-center gap-4 border-b border-white/10 px-8 py-6">

        <div className="rounded-2xl bg-indigo-600/20 p-3">

          <Bot
            className="text-indigo-400"
            size={28}
          />

        </div>

        <div>

          <div className="flex items-center gap-2">

            <h2 className="text-2xl font-bold text-white">
              AI Financial Analysis
            </h2>

            <Sparkles
              size={18}
              className="text-indigo-400"
            />

          </div>

          <p className="mt-1 text-sm text-slate-400">
            Personalized report generated using
            FinVerse AI.
          </p>

        </div>

      </div>

      {/* Report */}

      <div className="prose prose-invert prose-slate max-w-none px-8 py-8">

        <ReactMarkdown>

          {report}

        </ReactMarkdown>

      </div>

    </motion.div>
  );
}