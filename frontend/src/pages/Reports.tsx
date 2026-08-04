import { useEffect, useState } from "react";

import reportService from "../services/reportService";

import type { FinancialReport } from "../services/reportService";

import ReportHeader from "../components/reports/ReportHeader";
import ReportSummaryCards from "../components/reports/ReportSummaryCards";
import BudgetPerformance from "../components/reports/BudgetPerformance";
import TopExpenses from "../components/reports/TopExpenses";
import AIReportCard from "../components/reports/AIReportCard";

export default function Reports() {
  const [report, setReport] =
    useState<FinancialReport | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      setLoading(true);

      const data =
        await reportService.getFinancialReport();

      setReport(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-32 text-center text-slate-400">
        Generating your AI Financial Report...
      </div>
    );
  }

  if (!report) {
    return (
      <div className="py-32 text-center text-red-400">
        Unable to generate report.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <ReportHeader
        generatedAt={report.generated_at}
      />

      <ReportSummaryCards
        summary={report.summary}
      />

      <div className="grid gap-8 xl:grid-cols-2">

        <BudgetPerformance
          budgets={report.budgets}
        />

        <TopExpenses
          expenses={report.top_expenses}
        />

      </div>

      <AIReportCard
        report={report.ai_report}
      />

    </div>
  );
}