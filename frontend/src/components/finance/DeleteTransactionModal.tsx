import { AlertTriangle } from "lucide-react";

interface Props {
  open: boolean;
  loading: boolean;
  title?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteTransactionModal({
  open,
  loading,
  title,
  onClose,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">

        {/* Header */}

        <div className="flex flex-col items-center px-6 pt-8">

          <div className="rounded-full bg-red-500/15 p-4">
            <AlertTriangle
              size={36}
              className="text-red-400"
            />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-white">
            Delete Transaction
          </h2>

          <p className="mt-3 text-center text-slate-400">
            Are you sure you want to delete
            <br />

            <span className="font-semibold text-white">
              {title}
            </span>

            ?
          </p>

          <p className="mt-2 text-sm text-red-400">
            This action cannot be undone.
          </p>

        </div>

        {/* Footer */}

        <div className="mt-8 flex justify-end gap-3 border-t border-white/10 px-6 py-5">

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-slate-700 px-5 py-3 text-slate-300 transition hover:bg-slate-800"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-xl bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-500 disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>
    </div>
  );
}