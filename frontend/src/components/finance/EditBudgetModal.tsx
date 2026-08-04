import { useEffect, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

import budgetService from "../../services/budgetService";
import categoryService from "../../services/categoryService";

import type { Budget } from "../../types/budget";
import type { Category } from "../../types/category";

interface Props {
  open: boolean;
  budget: Budget | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditBudgetModal({
  open,
  budget,
  onClose,
  onSuccess,
}: Props) {
  const [categories, setCategories] =
    useState<Category[]>([]);

  const [loadingCategories, setLoadingCategories] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] = useState({
    category_id: 0,
    amount: "",
    month: 1,
    year: new Date().getFullYear(),
    alert_percentage: 80,
    is_active: true,
  });

  useEffect(() => {
    if (!open || !budget) return;

    setForm({
      category_id: budget.category_id,
      amount: budget.amount.toString(),
      month: budget.month,
      year: budget.year,
      alert_percentage: budget.alert_percentage,
      is_active: budget.is_active,
    });

    loadCategories();
  }, [open, budget]);

  async function loadCategories() {
    try {
      setLoadingCategories(true);

      const response =
        await categoryService.getCategories();

      setCategories(
        response.filter(
          (category) =>
            category.type === "EXPENSE"
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCategories(false);
    }
  }

  function updateField(
    key: string,
    value: string | number | boolean
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSubmit() {
    if (!budget) return;

    if (!form.amount || Number(form.amount) <= 0) {
      toast.error("Enter a valid amount.");
      return;
    }

    try {
      setSaving(true);

      await budgetService.updateBudget(
        budget.id,
        {
          amount: Number(form.amount),
          month: Number(form.month),
          year: Number(form.year),
          alert_percentage: Number(
            form.alert_percentage
          ),
          is_active: form.is_active,
        }
      );

      toast.success(
        "Budget updated successfully!"
      );

      onSuccess();

      onClose();
    } catch (err) {
      console.error(err);

      toast.error(
        "Failed to update budget."
      );
    } finally {
      setSaving(false);
    }
  }

  if (!open || !budget) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">

        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

          <h2 className="text-2xl font-bold text-white">
            Edit Budget
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X />
          </button>

        </div>

        <div className="space-y-5 p-6">
                      {loadingCategories ? (
            <p className="text-slate-400">
              Loading categories...
            </p>
          ) : (
            <>
              {/* Category */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Expense Category
                </label>

                <select
                  value={form.category_id}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-400"
                >
                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>

                <p className="mt-2 text-xs text-slate-500">
                  Category cannot be changed after creating a budget.
                </p>
              </div>

              {/* Amount */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Budget Amount
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

              {/* Month */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Month
                </label>

                <select
                  value={form.month}
                  onChange={(e) =>
                    updateField(
                      "month",
                      Number(e.target.value)
                    )
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                >
                  <option value={1}>January</option>
                  <option value={2}>February</option>
                  <option value={3}>March</option>
                  <option value={4}>April</option>
                  <option value={5}>May</option>
                  <option value={6}>June</option>
                  <option value={7}>July</option>
                  <option value={8}>August</option>
                  <option value={9}>September</option>
                  <option value={10}>October</option>
                  <option value={11}>November</option>
                  <option value={12}>December</option>
                </select>
              </div>

              {/* Year */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Year
                </label>

                <input
                  type="number"
                  value={form.year}
                  onChange={(e) =>
                    updateField(
                      "year",
                      Number(e.target.value)
                    )
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                />
              </div>

              {/* Alert Percentage */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Alert Percentage
                </label>

                <input
                  type="number"
                  min={1}
                  max={100}
                  value={form.alert_percentage}
                  onChange={(e) =>
                    updateField(
                      "alert_percentage",
                      Number(e.target.value)
                    )
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                />
              </div>

              {/* Active Budget */}

              <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800 px-4 py-3">

                <div>
                  <p className="font-medium text-white">
                    Active Budget
                  </p>

                  <p className="text-sm text-slate-400">
                    Enable or disable this budget.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) =>
                    updateField(
                      "is_active",
                      e.target.checked
                    )
                  }
                  className="h-5 w-5 accent-indigo-600"
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
            {saving ? "Updating..." : "Update Budget"}
          </button>

        </div>

      </div>

    </div>
  );
}