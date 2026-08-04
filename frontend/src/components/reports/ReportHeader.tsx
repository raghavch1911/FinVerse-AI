import { motion } from "framer-motion";
import { FileBarChart2 } from "lucide-react";

interface Props {
  generatedAt: string;
}

export default function ReportHeader({
  generatedAt,
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="flex items-center justify-between"
    >
      <div>
        <div className="flex items-center gap-3">

          <div className="rounded-2xl bg-indigo-600/20 p-3">

            <FileBarChart2
              className="text-indigo-400"
              size={28}
            />

          </div>

          <div>

            <h1 className="text-4xl font-black text-white">
              Financial Reports
            </h1>

            <p className="mt-2 text-slate-400">
              AI-generated financial analysis and
              professional reporting.
            </p>

          </div>

        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/70 px-6 py-4">

        <p className="text-xs uppercase tracking-widest text-slate-500">
          Generated
        </p>

        <p className="mt-1 font-semibold text-white">
  {new Date(generatedAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}
</p>

      </div>
    </motion.div>
  );
}