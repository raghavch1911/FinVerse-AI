import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4">
        <Bot
          size={18}
          className="text-cyan-400"
        />

        <div className="flex gap-1">
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              className="h-2 w-2 rounded-full bg-cyan-400"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                delay: dot * 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}