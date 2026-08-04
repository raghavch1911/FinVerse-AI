import {
  Calendar,
  CreditCard,
  Eye,
  FileText,
  Sparkles,
  Store,
  Tag,
  Trash2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import type { Document } from "../../types/document";

interface DocumentCardProps {
  document: Document;
  onDelete: (document: Document) => void;
  onAskAI: (document: Document) => void;
}

export default function DocumentCard({
  document,
  onDelete,
  onAskAI,
}: DocumentCardProps) {

  const navigate = useNavigate();

  const confidenceColor = () => {

    switch (document.confidence?.toLowerCase()) {

      case "high":
        return "bg-green-500/10 text-green-400";

      case "medium":
        return "bg-yellow-500/10 text-yellow-400";

      case "low":
        return "bg-red-500/10 text-red-400";

      default:
        return "bg-zinc-700 text-zinc-300";
    }
  };

  return (

    <div
      onClick={() =>
        navigate(`/documents/${document.id}`)
      }
      className="
      cursor-pointer
      rounded-2xl
      border
      border-zinc-800
      bg-zinc-900/60
      p-6
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-cyan-500/40
      hover:shadow-2xl
      hover:shadow-cyan-500/10
    "
    >

      {/* Header */}

      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div className="rounded-xl bg-cyan-500/10 p-3">

            <FileText
              size={26}
              className="text-cyan-400"
            />

          </div>

          <div>

            <h3 className="text-lg font-semibold text-white">

              {document.document_name}

            </h3>

            <div className="mt-2 flex flex-wrap gap-2">

              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">

                {document.document_type}

              </span>

              {document.category && (

                <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400">

                  <Tag
                    size={12}
                    className="mr-1 inline"
                  />

                  {document.category}

                </span>

              )}

            </div>

            <p className="mt-3 text-xs text-zinc-500">

              Uploaded{" "}

              {new Date(
                document.uploaded_at
              ).toLocaleDateString("en-IN")}

            </p>

          </div>

        </div>

      </div>

      {(document.merchant ||
        document.amount ||
        document.payment_method ||
        document.transaction_date) && (

        <div className="mt-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 space-y-3">

          <h4 className="text-sm font-semibold text-cyan-400">

            AI Extracted Information

          </h4>

          {document.merchant && (

            <Row
              icon={
                <Store
                  size={16}
                  className="text-cyan-400"
                />
              }
              label="Merchant"
              value={document.merchant}
            />

          )}

          {document.amount !== null && (

            <Row
              icon={
                <CreditCard
                  size={16}
                  className="text-green-400"
                />
              }
              label="Amount"
              value={`₹${document.amount.toLocaleString(
                "en-IN"
              )}`}
            />

          )}

          {document.payment_method && (

            <Row
              icon={
                <CreditCard
                  size={16}
                  className="text-indigo-400"
                />
              }
              label="Payment"
              value={document.payment_method}
            />

          )}

          {document.transaction_date && (

            <Row
              icon={
                <Calendar
                  size={16}
                  className="text-yellow-400"
                />
              }
              label="Date"
              value={document.transaction_date}
            />

          )}

          {document.ai_summary && (

            <div className="rounded-lg bg-zinc-900/70 p-3">

              <p className="text-xs uppercase tracking-wide text-cyan-400">

                AI Summary

              </p>

              <p className="mt-2 text-sm leading-6 text-zinc-300">

                {document.ai_summary}

              </p>

            </div>

          )}

          {document.confidence && (

            <div className="flex justify-end">

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${confidenceColor()}`}
              >

                {document.confidence}

              </span>

            </div>

          )}

        </div>

      )}

      <div className="mt-6 flex flex-wrap gap-3">

        <button
          onClick={(e) => {

            e.stopPropagation();

            navigate(
              `/documents/${document.id}`
            );

          }}
          className="flex items-center gap-2 rounded-lg border border-cyan-500 px-4 py-2 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-500 hover:text-black"
        >

          <Eye size={16} />

          View Details

        </button>

        <button
          onClick={(e) => {

            e.stopPropagation();

            onAskAI(document);

          }}
          className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-400"
        >

          <Sparkles size={16} />

          Ask AI

        </button>

        <button
          onClick={(e) => {

            e.stopPropagation();

            onDelete(document);

          }}
          className="flex items-center gap-2 rounded-lg border border-red-500 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
        >

          <Trash2 size={16} />

          Delete

        </button>

      </div>

    </div>

  );
}

function Row({

  icon,

  label,

  value,

}: {

  icon: React.ReactNode;

  label: string;

  value: string;

}) {

  return (

    <div className="flex items-center gap-3 text-sm">

      {icon}

      <span className="text-zinc-400">

        {label}

      </span>

      <span className="ml-auto font-medium text-white">

        {value}

      </span>

    </div>

  );

}