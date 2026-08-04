import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Car,
  Utensils,
  Film,
  Wallet,
  Landmark,
  CreditCard,
  CircleDollarSign,
} from "lucide-react";

import dashboardService from "../../services/dashboardService";
import type { RecentTransaction } from "../../services/dashboardService";

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState<
    RecentTransaction[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data =
          await dashboardService.getRecentTransactions();
        setTransactions(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load recent transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "shopping":
        return ShoppingBag;
      case "transport":
        return Car;
      case "food":
        return Utensils;
      case "entertainment":
        return Film;
      case "salary":
        return Landmark;
      case "investment":
        return CircleDollarSign;
      case "bank":
        return CreditCard;
      default:
        return Wallet;
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
        <h2 className="mb-6 text-xl font-bold text-white">
          Recent Transactions
        </h2>

        <div className="space-y-5">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-16 animate-pulse rounded-xl bg-slate-800"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-400">
        {error}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl"
    >
      <h2 className="mb-6 text-xl font-bold text-white">
        Recent Transactions
      </h2>

      <div className="space-y-5">
        {transactions.length === 0 ? (
          <p className="text-center text-slate-400">
            No transactions found.
          </p>
        ) : (
          transactions.map((item) => {
            const Icon = getIcon(item.category);

            const isIncome =
              item.type.toLowerCase() === "income";

            return (
              <div
                key={item.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-slate-800 p-3">
                    <Icon
                      size={18}
                      className="text-indigo-400"
                    />
                  </div>

                  <div>
                    <p className="font-medium text-white">
                      {item.title}
                    </p>

                    <p className="text-sm text-slate-400">
                      {item.category} •{" "}
                      {formatDate(item.transaction_date)}
                    </p>
                  </div>
                </div>

                <span
                  className={`font-semibold ${
                    isIncome
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {isIncome ? "+" : "-"}₹
                  {item.amount.toLocaleString("en-IN")}
                </span>
              </div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}