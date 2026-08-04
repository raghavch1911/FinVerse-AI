import type { Recommendation } from "../../types/insights";

interface Props {
  recommendations: Recommendation[];
}

export default function RecommendationsCard({
  recommendations,
}: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-white">
        AI Recommendations
      </h2>

      <div className="space-y-5">

        {recommendations.map((item, index) => {

          const color =
            item.priority === "HIGH"
              ? "bg-red-500"
              : item.priority === "MEDIUM"
              ? "bg-yellow-500"
              : "bg-green-500";

          return (
            <div
              key={index}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
            >

              <div className="flex items-center justify-between">

                <h3 className="font-semibold text-white">
                  {item.title}
                </h3>

                <span
                  className={`${color} rounded-full px-3 py-1 text-xs font-bold text-white`}
                >
                  {item.priority}
                </span>

              </div>

              <p className="mt-3 text-zinc-400">
                {item.description}
              </p>

            </div>
          );
        })}

      </div>

    </div>
  );
}