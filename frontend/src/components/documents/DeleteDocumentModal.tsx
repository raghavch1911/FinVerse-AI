import type { Document } from "../../types/document";

interface DeleteDocumentModalProps {
  open: boolean;
  document: Document | null;
  loading: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteDocumentModal({
  open,
  document,
  loading,
  onClose,
  onDelete,
}: DeleteDocumentModalProps) {
  if (!open || !document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

        <h2 className="text-xl font-bold text-white">
          Delete Document
        </h2>

        <p className="mt-3 text-zinc-400">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-white">
            {document.document_name}
          </span>
          ?
        </p>

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-white"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={onDelete}
            className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-500 disabled:opacity-50"
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
}