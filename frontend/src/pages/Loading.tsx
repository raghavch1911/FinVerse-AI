import { motion } from "framer-motion";
import { Loader2, Landmark } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">

      {/* Background Glow */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[150px]" />

        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[150px]" />

      </div>

      {/* Loading Card */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.4,
        }}
        className="relative flex w-[340px] flex-col items-center rounded-3xl border border-white/10 bg-white/5 px-10 py-10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(6,182,212,0.18)]"
      >

        <div className="mb-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 p-4 shadow-lg">

          <Landmark
            size={36}
            className="text-white"
          />

        </div>

        <Loader2
          size={34}
          className="mb-5 animate-spin text-cyan-400"
        />

        <h2 className="text-xl font-bold text-white">
          FinVerse AI
        </h2>

        <p className="mt-2 text-center text-sm text-slate-400">
          Preparing your financial workspace...
        </p>

        <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-slate-800">

          <motion.div
            initial={{
              x: "-100%",
            }}
            animate={{
              x: "100%",
            }}
            transition={{
              repeat: Infinity,
              duration: 1.3,
              ease: "linear",
            }}
            className="h-full w-1/3 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
          />

        </div>

      </motion.div>

    </div>
  );
}