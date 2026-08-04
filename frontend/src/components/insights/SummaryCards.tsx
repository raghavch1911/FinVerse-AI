import type { FinancialSummary } from "../../types/insights";

interface Props {
  summary: FinancialSummary;
}

export default function SummaryCards({
  summary,
}: Props) {
  const cards = [
    {
      title: "Income",
      value: summary.total_income,
    },
    {
      title: "Expense",
      value: summary.total_expense,
    },
    {
      title: "Balance",
      value: summary.balance,
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-3">

      {cards.map((card) => (

        <div
          key={card.title}
          className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
        >

          <p className="text-zinc-400">
            {card.title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            ₹{card.value.toLocaleString()}
          </h2>

        </div>

      ))}

    </div>
  );
}