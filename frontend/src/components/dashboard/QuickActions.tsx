import {
  ArrowRight,
  Brain,
  FileText,
  PlusCircle,
  Wallet,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const actions = [
  {
    title: "Add Transaction",
    description: "Record a new income or expense",
    icon: PlusCircle,
    path: "/transactions",
  },
  {
    title: "Create Budget",
    description: "Set spending limits by category",
    icon: Wallet,
    path: "/budgets",
  },
  {
    title: "Ask AI",
    description: "Get personalized financial insights",
    icon: Brain,
    path: "/assistant",
  },
  {
    title: "Analyze Document",
    description: "Upload and analyze financial files",
    icon: FileText,
    path: "/documents",
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-white">
        Quick Actions
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => navigate(action.path)}
              className="group rounded-3xl border border-white/10 bg-slate-900 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500 hover:bg-slate-800"
            >
              <div className="mb-6 flex items-center justify-between">

                <div className="rounded-2xl bg-indigo-500/15 p-3">

                  <Icon
                    size={26}
                    className="text-indigo-400"
                  />

                </div>

                <ArrowRight
                  size={18}
                  className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-indigo-400"
                />

              </div>

              <h3 className="text-lg font-semibold text-white">
                {action.title}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {action.description}
              </p>

            </button>
          );
        })}
      </div>
    </div>
  );
}