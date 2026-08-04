import { useEffect, useState } from "react";
import { X } from "lucide-react";

import categoryService from "../../services/categoryService";
import transactionService from "../../services/transactionService";

import type { Category } from "../../types/category";
import type { Transaction } from "../../types/transaction";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  transaction: Transaction | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditTransactionModal({
  open,
  transaction,
  onClose,
  onSuccess,
}: Props) {
  const [categories, setCategories] = useState<Category[]>([]);

  const [loadingCategories, setLoadingCategories] =
    useState(false);

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    category_id: 0,
    type: "EXPENSE" as "INCOME" | "EXPENSE",
    title: "",
    description: "",
    amount: "",
    transaction_date: "",
  });

  useEffect(() => {
    if (!open) return;

    loadCategories();
  }, [open]);

  useEffect(() => {
    if (!open || !transaction) return;

    setForm({
      category_id: transaction.category_id,
      type: transaction.type,
      title: transaction.title,
      description: transaction.description ?? "",
      amount: transaction.amount.toString(),
      transaction_date:
        transaction.transaction_date.split("T")[0],
    });
  }, [open, transaction]);

  async function loadCategories() {
    try {
      setLoadingCategories(true);

      const data =
        await categoryService.getCategories();

      setCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCategories(false);
    }
  }

  function updateField(
    key: string,
    value: string | number
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSubmit() {
    if (!transaction) return;

    if (!form.category_id) {
      toast.error("Please select a category.");
      return;
    }

    if (!form.title.trim()) {
      toast.error("Please enter a title.");
      return;
    }

    if (!form.amount || Number(form.amount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    try {
      setSaving(true);

      await transactionService.updateTransaction(
        transaction.id,
        {
          category_id: form.category_id,
          type: form.type,
          title: form.title,
          description: form.description,
          amount: Number(form.amount),
          transaction_date:
            form.transaction_date,
        }
      );
      toast.success("Transaction updated successfully!");

      onSuccess();

      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update transaction.");
    } finally {
      setSaving(false);
    }
  }

  if (!open || !transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <h2 className="text-2xl font-bold text-white">
            Edit Transaction
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X />
          </button>
        </div>

        {/* Body */}

        <div className="space-y-5 p-6">
          {loadingCategories ? (
            <p className="text-slate-400">
              Loading categories...
            </p>
          ) : (
            <>
              {/* Type */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Transaction Type
                </label>

                <select
                  value={form.type}
                  onChange={(e) => {
  updateField("type", e.target.value);
  updateField("category_id", 0);
}}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                >
                  <option value="EXPENSE">
                    Expense
                  </option>

                  <option value="INCOME">
                    Income
                  </option>
                </select>
              </div>

              {/* Category */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Category
                </label>

                <select
                  value={form.category_id}
                  onChange={(e) =>
                    updateField(
                      "category_id",
                      Number(e.target.value)
                    )
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                >
                  <option value={0}>
                    Select Category
                  </option>

                  {categories
                    .filter(
                      (category) =>
                        category.type === form.type
                    )
                    .map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Title */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Title
                </label>

                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    updateField(
                      "title",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                />
              </div>

              {/* Description */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Description
                </label>

                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    updateField(
                      "description",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                />
              </div>

              {/* Amount */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Amount
                </label>

                <input
                  type="number"
                  value={form.amount}
                  onChange={(e) =>
                    updateField(
                      "amount",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                />
              </div>

              {/* Date */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Transaction Date
                </label>

                <input
                  type="date"
                  value={form.transaction_date}
                  onChange={(e) =>
                    updateField(
                      "transaction_date",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                />
              </div>
            </>
          )}
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-white/10 px-6 py-5">

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-5 py-3 text-slate-300 transition hover:bg-slate-800"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Updating..."
              : "Update Transaction"}
          </button>

        </div>

      </div>
    </div>
  );
}