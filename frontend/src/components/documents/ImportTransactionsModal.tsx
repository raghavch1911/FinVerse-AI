import type { TransactionPreview } from "../../types/document";

interface ImportTransactionsModalProps {
  open: boolean;

  loading: boolean;

  documentId: number;

  transactions: TransactionPreview[];

  onClose: () => void;

  onImport: () => void;
}

export default function ImportTransactionsModal({
  open,
  loading,
  transactions,
  onClose,
  onImport,
}: ImportTransactionsModalProps) {
  if (!open) return null;

  const total = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">

      <div className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl">

        {/* Header */}

        <div className="border-b border-zinc-800 p-6">

          <h2 className="text-2xl font-bold text-white">
            Bank Statement Detected
          </h2>

          <p className="mt-2 text-zinc-400">
            {transactions.length} transactions were detected.
            Review them before importing.
          </p>

        </div>

        {/* Table */}

        <div className="max-h-[450px] overflow-auto">

          <table className="w-full">

            <thead className="sticky top-0 bg-zinc-950">

              <tr className="border-b border-zinc-800">

                <th className="px-5 py-4 text-left text-sm text-zinc-400">
                  Date
                </th>

                <th className="px-5 py-4 text-left text-sm text-zinc-400">
                  Description
                </th>

                <th className="px-5 py-4 text-left text-sm text-zinc-400">
                  Category
                </th>

                <th className="px-5 py-4 text-left text-sm text-zinc-400">
                  Type
                </th>

                <th className="px-5 py-4 text-right text-sm text-zinc-400">
                  Amount
                </th>

              </tr>

            </thead>

            <tbody>

              {transactions.map((transaction, index) => (

                <tr
                  key={index}
                  className="border-b border-zinc-800 hover:bg-zinc-800/40"
                >

                  <td className="px-5 py-4 text-zinc-300">
                    {transaction.date}
                  </td>

                  <td className="px-5 py-4 text-white">
                    {transaction.title}
                  </td>

                  <td className="px-5 py-4 text-cyan-400">
                    {transaction.category}
                  </td>

                  <td
                    className={`px-5 py-4 font-semibold ${
                      transaction.type === "INCOME"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {transaction.type}
                  </td>

                  <td className="px-5 py-4 text-right font-semibold text-white">
                    ₹{transaction.amount.toLocaleString("en-IN")}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Footer */}

        <div className="flex items-center justify-between border-t border-zinc-800 p-6">

          <div>

            <p className="text-sm text-zinc-400">
              Total Transactions
            </p>

            <p className="text-2xl font-bold text-cyan-400">
              {transactions.length}
            </p>

          </div>

          <div>

            <p className="text-sm text-zinc-400">
              Total Amount
            </p>

            <p className="text-2xl font-bold text-white">
              ₹{total.toLocaleString("en-IN")}
            </p>

          </div>

          <div className="flex gap-3">

            <button
              onClick={onClose}
              className="rounded-xl border border-zinc-700 px-5 py-3 text-white transition hover:bg-zinc-800"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              onClick={onImport}
              className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:opacity-50"
            >
              {loading
                ? "Importing..."
                : `Import ${transactions.length} Transactions`}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}