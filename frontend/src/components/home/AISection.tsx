import { motion } from "framer-motion";
import {
  Bot,
  User,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AISection() {
  return (
    <section
      id="assistant"
      className="bg-slate-950 py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-16 px-8 lg:grid-cols-2">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
        >

          <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-indigo-300">
            AI Financial Assistant
          </span>

          <h2 className="mt-8 text-5xl font-black leading-tight">

            Talk To Your

            <span className="block text-indigo-400">

              Financial Data

            </span>

          </h2>

          <p className="mt-8 text-lg leading-9 text-slate-400">

            Ask natural language questions.

            Upload documents.

            Understand spending.

            Discover investment opportunities.

            All powered by LLMs and Retrieval-Augmented Generation.

          </p>

          <div className="mt-10">

            <Link
              to="/register"
              className="inline-flex items-center gap-3 rounded-2xl bg-indigo-600 px-8 py-4 text-lg font-semibold transition hover:bg-indigo-700"
            >
              Try AI Assistant

              <ArrowRight size={20} />

            </Link>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
        >

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

            {/* User */}

            <div className="mb-6 flex justify-end">

              <div className="flex max-w-md gap-3">

                <div className="rounded-2xl bg-indigo-600 p-5">

                  <p>

                    Can I save ₹10,000 every month?

                  </p>

                </div>

                <User className="mt-2" />

              </div>

            </div>

            {/* AI */}

            <div className="flex gap-4">

              <div className="rounded-full bg-indigo-600 p-3">

                <Bot size={22} />

              </div>

              <div className="max-w-lg rounded-3xl border border-white/10 bg-slate-900 p-6">

                <div className="mb-4 flex items-center gap-2 text-indigo-400">

                  <Sparkles size={18} />

                  FinVerse AI

                </div>

                <p className="leading-8 text-slate-300">

                  Based on your recent transactions,
                  reducing dining expenses by
                  <span className="font-semibold text-green-400">

                    {" "}18%

                  </span>

                  and increasing SIP contributions by
                  ₹3,000/month will comfortably help you
                  reach your savings goal within the next
                  6 months.

                </p>

              </div>

            </div>

            {/* Typing */}

            <div className="mt-8 flex items-center gap-3 text-slate-500">

              <div className="flex gap-2">

                <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500"></span>

                <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:.2s]"></span>

                <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:.4s]"></span>

              </div>

              AI is always ready...

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}