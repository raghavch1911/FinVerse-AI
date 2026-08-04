interface Props {
  score: number;
}

export default function HealthScoreCard({
  score,
}: Props) {
  const color =
    score >= 80
      ? "text-green-400"
      : score >= 60
      ? "text-yellow-400"
      : "text-red-400";

  const status =
    score >= 80
      ? "Excellent"
      : score >= 60
      ? "Good"
      : "Needs Attention";

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <p className="text-zinc-400">
        Financial Health
      </p>

      <h1
        className={`mt-4 text-6xl font-bold ${color}`}
      >
        {score}
      </h1>

      <p className="mt-2 text-lg text-white">
        {status}
      </p>

    </div>
  );
}