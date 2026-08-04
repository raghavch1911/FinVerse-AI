import toast from "react-hot-toast";

import budgetService from "../../services/budgetService";

import type { Budget } from "../../types/budget";

interface Props {
  open: boolean;
  budget: Budget | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DeleteBudgetModal({
  open,
  budget,
  onClose,
  onSuccess,
}: Props) {
  async function handleDelete() {
    if (!budget) return;

    try {
      await budgetService.deleteBudget(
        budget.id
      );

      toast.success(
        "Budget deleted successfully!"
      );

      onSuccess();

      onClose();
    } catch (err) {
      console.error(err);

      toast.error(
        "Failed to delete budget."
      );
    }
  }

  if (!open || !budget) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">

        {/* Header */}

        <div className="border-b border-white/10 px-6 py-5">

          <h2 className="text-2xl font-bold text-white">
            Delete Budget
          </h2>

        </div>

        {/* Body */}

        <div className="space-y-4 p-6">

          <p className="text-slate-300">
            Are you sure you want to delete
            this budget?
          </p>

          <div className="rounded-xl bg-slate-800 p-4">

            <p className="text-sm text-slate-400">
              Budget Amount
            </p>

            <p className="text-xl font-semibold text-white">
              ₹
              {budget.amount.toLocaleString(
                "en-IN"
              )}
            </p>

          </div>

          <p className="text-sm text-red-400">
            This action cannot be undone.
          </p>

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
            onClick={handleDelete}
            className="rounded-xl bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-500"
          >
            Delete Budget
          </button>

        </div>

      </div>

    </div>
  );
}