import { motion } from "framer-motion";
import {
  Users,
  IndianRupee,
  ShieldCheck,
  Bot,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "10K+",
    title: "Active Users",
    description: "Growing community managing finances smarter.",
  },
  {
    icon: IndianRupee,
    value: "₹50M+",
    title: "Transactions Tracked",
    description: "Expenses, budgets and investments analyzed.",
  },
  {
    icon: ShieldCheck,
    value: "99.9%",
    title: "Secure Platform",
    description: "Protected using JWT authentication and encrypted APIs.",
  },
  {
    icon: Bot,
    value: "24/7",
    title: "AI Availability",
    description: "Financial guidance whenever you need it.",
  },
];

export default function Stats() {
  return (
    <section className="bg-slate-950 py-28">
      <div className="mx-auto max-w-7xl px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl font-black">
            Trusted Financial Intelligence
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
            FinVerse AI combines intelligent analytics, secure financial
            management and conversational AI into one seamless experience.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: .5,
                }}
                viewport={{ once: true }}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl hover:border-indigo-500/40 transition"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
                  <Icon size={30} />
                </div>

                <h3 className="text-4xl font-black text-white">
                  {stat.value}
                </h3>

                <p className="mt-3 text-xl font-semibold">
                  {stat.title}
                </p>

                <p className="mt-4 text-slate-400 leading-7">
                  {stat.description}
                </p>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}