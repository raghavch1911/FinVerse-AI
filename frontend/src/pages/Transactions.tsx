import {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
  Pencil,
  Trash2,
} from "lucide-react";

import transactionService from "../services/transactionService";

import type {
  Transaction,
  TransactionListResponse,
} from "../types/transaction";

import AddTransactionModal from "../components/finance/AddTransactionModal";
import EditTransactionModal from "../components/finance/EditTransactionModal";
import DeleteTransactionModal from "../components/finance/DeleteTransactionModal";
import toast from "react-hot-toast";

import categoryService from "../services/categoryService";

import TransactionFilters from "../components/finance/TransactionFilters";

import type { Category } from "../types/category";
import type { TransactionFilters as TransactionFiltersType } from "../types/transaction";

export default function Transactions() {
  const [data, setData] =
    useState<TransactionListResponse | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);
    const [showDeleteModal, setShowDeleteModal] =
  useState(false);

const [deleting, setDeleting] =
  useState(false);

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

    const [categories, setCategories] = useState<Category[]>([]);

const defaultFilters: TransactionFiltersType = {
  page: 1,
  page_size: 100,
};

const [filters, setFilters] =
  useState<TransactionFiltersType>(defaultFilters);

const [draftFilters, setDraftFilters] =
  useState<TransactionFiltersType>(defaultFilters);

  const loadTransactions = useCallback(async () => {
  try {
    setLoading(true);

    const response =
      await transactionService.getTransactions(filters);

    setData(response);
  } catch (err) {
    console.error(err);
    setError("Unable to load transactions.");
  } finally {
    setLoading(false);
  }
}, [filters]);

useEffect(() => {
  loadTransactions();
  loadCategories();
}, [loadTransactions]);

  async function handleDelete() {
  if (!selectedTransaction) return;

  try {
    setDeleting(true);

    await transactionService.deleteTransaction(
      selectedTransaction.id
    );
    toast.success("Transaction deleted successfully!");

    setShowDeleteModal(false);
    setSelectedTransaction(null);

    await loadTransactions();
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete transaction.");
  } finally {
    setDeleting(false);
  }
}
async function loadCategories() {
  try {
    const response =
      await categoryService.getCategories();

    setCategories(response);
  } catch (err) {
    console.error(err);
  }
}

  if (loading) {
    return (
      <div className="p-6 text-white">
        Loading transactions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-400">
        {error}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-8 p-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-white">
            Transactions
          </h1>

          <p className="text-slate-400">
            Manage all your income and expenses
          </p>

        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-500"
        >
          <Plus size={18} />

          Add Transaction
        </button>

      </div>

      {/* Summary */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">

          <ArrowUpRight
            size={30}
            className="mb-4 text-green-400"
          />

          <p className="text-slate-400">
            Income
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            ₹
            {data.summary.total_income.toLocaleString(
              "en-IN"
            )}
          </h2>

        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">

          <ArrowDownLeft
            size={30}
            className="mb-4 text-red-400"
          />

          <p className="text-slate-400">
            Expense
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            ₹
            {data.summary.total_expense.toLocaleString(
              "en-IN"
            )}
          </h2>

        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">

          <Wallet
            size={30}
            className="mb-4 text-indigo-400"
          />

          <p className="text-slate-400">
            Balance
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            ₹
            {data.summary.balance.toLocaleString(
              "en-IN"
            )}
          </h2>

        </div>

      </div>

      <TransactionFilters
  filters={draftFilters}
  categories={categories}
  onDraftChange={setDraftFilters}
  onApply={() =>
    setFilters({
      ...draftFilters,
      page: 1,
    })
  }
  onClear={() => {
    setDraftFilters(defaultFilters);
    setFilters(defaultFilters);
  }}
/>

      {/* Transactions Table */}

      <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60">

        <table className="w-full">

          <thead className="border-b border-white/10">

            <tr className="text-left text-slate-400">

              <th className="p-5">
                Title
              </th>

              <th className="p-5">
                Type
              </th>

              <th className="p-5">
                Amount
              </th>

              <th className="p-5">
                Date
              </th>

              <th className="p-5 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {data.items.map((transaction) => (

              <tr
                key={transaction.id}
                className="border-b border-white/5 hover:bg-slate-800/30"
              >

                <td className="p-5">

                  <div>

                    <p className="font-medium text-white">
                      {transaction.title}
                    </p>

                    <p className="text-sm text-slate-400">
                      {transaction.description ||
                        "No description"}
                    </p>

                  </div>

                </td>

                <td className="p-5">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      transaction.type === "INCOME"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {transaction.type}
                  </span>

                </td>

                <td className="p-5 font-semibold text-white">

                  ₹
                  {transaction.amount.toLocaleString(
                    "en-IN"
                  )}

                </td>

                <td className="p-5 text-slate-400">

                  {new Date(
                    transaction.transaction_date
                  ).toLocaleDateString("en-IN")}

                </td>

                <td className="p-5">

                  <div className="flex items-center justify-center gap-3">

                    <button
                      onClick={() => {
                        setSelectedTransaction(
                          transaction
                        );
                        setShowEditModal(true);
                      }}
                      className="rounded-lg p-2 text-blue-400 transition hover:bg-blue-500/10"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
  onClick={() => {
    setSelectedTransaction(transaction);
    setShowDeleteModal(true);
  }}
  className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10"
>
  <Trash2 size={18} />
</button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <AddTransactionModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={loadTransactions}
      />

      <EditTransactionModal
        open={showEditModal}
        transaction={selectedTransaction}
        onClose={() => {
          setShowEditModal(false);
          setSelectedTransaction(null);
        }}
        onSuccess={() => {
          loadTransactions();
          setShowEditModal(false);
          setSelectedTransaction(null);
        }}
      />
      <DeleteTransactionModal
  open={showDeleteModal}
  loading={deleting}
  title={selectedTransaction?.title}
  onClose={() => {
    setShowDeleteModal(false);
    setSelectedTransaction(null);
  }}
  onConfirm={handleDelete}
/>


    </div>
  );
}