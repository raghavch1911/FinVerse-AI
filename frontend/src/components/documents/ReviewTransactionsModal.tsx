import { X, CheckCircle } from "lucide-react";

interface Transaction {
  date: string;
  title: string;
  amount: number;
  type: string;
  category: string;
}

interface Props {
  open: boolean;
  loading: boolean;
  transactions: Transaction[];
  onClose: () => void;
  onImport: () => void;
}

export default function ReviewTransactionsModal({
  open,
  loading,
  transactions,
  onClose,
  onImport,
}: Props) {
  if (!open) return null;

  const income = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((a, b) => a + b.amount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="w-[900px] max-h-[90vh] overflow-hidden rounded-3xl bg-zinc-900">

        <div className="flex items-center justify-between border-b border-zinc-800 p-6">

          <div>
            <h2 className="text-2xl font-bold text-white">
              Review Transactions
            </h2>

            <p className="text-zinc-400">
              FinVerse AI detected {transactions.length} transactions.
            </p>
          </div>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <div className="grid grid-cols-3 gap-4 p-6">

          <div className="rounded-xl bg-green-500/10 p-4">

            <p className="text-sm text-zinc-400">
              Income
            </p>

            <h3 className="text-2xl font-bold text-green-400">
              ₹{income.toLocaleString("en-IN")}
            </h3>

          </div>

          <div className="rounded-xl bg-red-500/10 p-4">

            <p className="text-sm text-zinc-400">
              Expense
            </p>

            <h3 className="text-2xl font-bold text-red-400">
              ₹{expense.toLocaleString("en-IN")}
            </h3>

          </div>

          <div className="rounded-xl bg-cyan-500/10 p-4">

            <p className="text-sm text-zinc-400">
              Transactions
            </p>

            <h3 className="text-2xl font-bold text-cyan-400">
              {transactions.length}
            </h3>

          </div>

        </div>

        <div className="max-h-[400px] overflow-y-auto px-6">

          <table className="w-full">

            <thead>

              <tr className="text-left text-zinc-500">

                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th>Amount</th>

              </tr>

            </thead>

            <tbody>

              {transactions.map((transaction, index) => (

                <tr
                  key={index}
                  className="border-b border-zinc-800"
                >

                  <td>{transaction.date}</td>

                  <td>{transaction.title}</td>

                  <td>{transaction.category}</td>

                  <td>

                    <span
                      className={
                        transaction.type === "INCOME"
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {transaction.type}
                    </span>

                  </td>

                  <td>
                    ₹
                    {transaction.amount.toLocaleString("en-IN")}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <div className="flex justify-end gap-3 border-t border-zinc-800 p-6">

          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-700 px-5 py-3"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={onImport}
            className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black"
          >
            <CheckCircle size={18} />

            Import {transactions.length} Transactions
          </button>

        </div>

      </div>

    </div>
  );
}