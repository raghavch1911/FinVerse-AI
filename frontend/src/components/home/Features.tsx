import { motion } from "framer-motion";
import {
  Wallet,
  Bot,
 FileText,
  TrendingUp,
  GraduationCap,
  PieChart,
} from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Smart Budget Planner",
    description:
      "Track income and expenses with AI-powered budgeting insights.",
  },
  {
    icon: TrendingUp,
    title: "Investment Advisor",
    description:
      "Analyze portfolios and receive personalized investment suggestions.",
  },
  {
    icon: FileText,
    title: "Document Intelligence",
    description:
      "Upload bank statements and financial reports for instant AI analysis.",
  },
  {
    icon: Bot,
    title: "AI Financial Assistant",
    description:
      "Ask questions about your finances using natural language.",
  },
  {
    icon: PieChart,
    title: "Interactive Analytics",
    description:
      "Visualize spending habits, savings, and investment growth.",
  },
  {
    icon: GraduationCap,
    title: "Financial Learning",
    description:
      "Improve your financial knowledge with AI-guided learning.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-slate-950 py-28"
    >
      <div className="mx-auto max-w-7xl px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl font-black">
            Everything You Need
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
            One intelligent platform for budgeting, investing,
            learning, document analysis and AI-powered financial decisions.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.08,
                  duration: .5,
                }}
                viewport={{ once: true }}
                className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-indigo-500/40"
              >
                <div className="mb-6 inline-flex rounded-2xl bg-indigo-500/15 p-4 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition">
                  <Icon size={30} />
                </div>

                <h3 className="mb-4 text-2xl font-bold">
                  {feature.title}
                </h3>

                <p className="leading-8 text-slate-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}