import {
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const data = [
  { month: "Jan", value: 28 },
  { month: "Feb", value: 40 },
  { month: "Mar", value: 35 },
  { month: "Apr", value: 55 },
  { month: "May", value: 42 },
  { month: "Jun", value: 68 },
  { month: "Jul", value: 58 },
];

export default function HeroChart() {
  return (
    <ResponsiveContainer
      width="100%"
      height={180}
    >
      <AreaChart data={data}>

        <defs>

          <linearGradient
            id="heroGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >

            <stop
              offset="0%"
              stopColor="#6366f1"
              stopOpacity={0.9}
            />

            <stop
              offset="100%"
              stopColor="#6366f1"
              stopOpacity={0}
            />

          </linearGradient>

        </defs>

        <Area
          type="monotone"
          dataKey="value"
          stroke="#818cf8"
          strokeWidth={4}
          fill="url(#heroGradient)"
        />

      </AreaChart>
    </ResponsiveContainer>
  );
}