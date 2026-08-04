import { useState } from "react";
import {
  Upload,
  X,
  Sparkles,
} from "lucide-react";

interface UploadDocumentModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

export default function UploadDocumentModal({
  open,
  loading,
  onClose,
  onUpload,
}: UploadDocumentModalProps) {
  const [file, setFile] =
    useState<File | null>(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-zinc-900 p-7 shadow-2xl">

        <div className="mb-7 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Upload Document
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              FinVerse AI will automatically identify
              and analyze your document.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-zinc-800"
          >
            <X className="text-zinc-400" />
          </button>

        </div>

        <input
          type="file"
          accept=".pdf,.csv,.xlsx,.xls,.txt,.png,.jpg,.jpeg"
          onChange={(e) =>
            setFile(
              e.target.files?.[0] ?? null
            )
          }
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4 text-white"
        />

        <div className="mt-5 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4">

          <div className="flex items-center gap-3">

            <Sparkles className="text-cyan-400" />

            <div>

              <p className="font-semibold text-cyan-400">
                AI Auto Detection
              </p>

              <p className="mt-1 text-sm text-zinc-400">
                FinVerse AI will automatically detect
                whether the uploaded file is a receipt,
                invoice, bank statement, salary slip,
                tax document or investment report.
              </p>

            </div>

          </div>

        </div>

        <button
          disabled={!file || loading}
          onClick={() =>
            file && onUpload(file)
          }
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-500 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >

          <Upload size={18} />

          {loading
            ? "FinVerse AI is analyzing..."
            : "Upload & Analyze"}

        </button>

      </div>

    </div>
  );
}