import { useEffect, useState } from "react";

import insightsService from "../services/insightsService";

import type { FinancialInsightsResponse } from "../types/insights";

import HealthScoreCard from "../components/insights/HealthScoreCard";
import SummaryCards from "../components/insights/SummaryCards";
import BudgetCard from "../components/insights/BudgetCard";
import ExpensePieChart from "../components/insights/ExpensePieChart";
import RecommendationsCard from "../components/insights/RecommendationsCard";

export default function Insights() {
  const [insights, setInsights] =
    useState<FinancialInsightsResponse | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    try {
      setLoading(true);

      const data =
        await insightsService.getInsights();

      setInsights(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-zinc-400">
        Loading financial insights...
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="py-24 text-center text-zinc-400">
        Unable to load financial insights.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-white">
          Financial Insights
        </h1>

        <p className="mt-2 text-zinc-400">
          AI-powered analysis of your
          financial health.
        </p>

      </div>

      {/* Health */}

      <HealthScoreCard
        score={
          insights.financial_health_score
        }
      />

      {/* Summary */}

      <SummaryCards
        summary={insights.summary}
      />

      {/* Charts */}

      <div className="grid gap-6 lg:grid-cols-2">

        <ExpensePieChart
          data={insights.top_expenses}
        />

        <RecommendationsCard
          recommendations={
            insights.recommendations
          }
        />

      </div>

      {/* Budgets */}

      <div>

        <h2 className="mb-5 text-2xl font-bold text-white">
          Budget Performance
        </h2>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {insights.budgets.map(
            (budget) => (
              <BudgetCard
                key={budget.category}
                budget={budget}
              />
            )
          )}

        </div>

      </div>

    </div>
  );
}