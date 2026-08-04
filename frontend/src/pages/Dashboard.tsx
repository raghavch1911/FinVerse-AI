import useAuth from "../hooks/useAuth";

import SummaryCards from "../components/dashboard/SummaryCards";
import SpendingChart from "../components/charts/SpendingChart";
import BudgetProgress from "../components/dashboard/BudgetProgress";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import AIInsights from "../components/dashboard/AIInsights";
import QuickActions from "../components/dashboard/QuickActions";

export default function Dashboard() {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <div className="space-y-8">

      {/* Welcome */}

      <div>

        <p className="text-sm text-slate-400">
          {today}
        </p>

        <h1 className="mt-2 text-4xl font-bold text-white">

          Welcome back,

          <span className="ml-3 text-indigo-400">
            {user?.username}
          </span>

        </h1>

        <p className="mt-2 text-slate-400">
          Here's an overview of your financial activity.
        </p>

      </div>

      <SummaryCards />

      <div className="grid gap-6 lg:grid-cols-3">

        <div className="lg:col-span-2">
          <SpendingChart />
        </div>

        <BudgetProgress />

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <RecentTransactions />

        <AIInsights />

      </div>

      <QuickActions />

    </div>
  );
}