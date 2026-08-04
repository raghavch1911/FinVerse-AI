import { useEffect, useState } from "react";

import {
  ArrowLeft,
  FileText,
  Building2,
  IndianRupee,
  Calendar,
  CreditCard,
  Tag,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import documentService from "../services/documentService";

import type { Document } from "../types/document";

export default function DocumentDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [document, setDocument] =
    useState<Document | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    if (!id) return;

    loadDocument();

  }, [id]);

  const loadDocument = async () => {

    try {

      setLoading(true);

      const data =
        await documentService.getDocument(
          Number(id)
        );

      setDocument(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="py-24 text-center text-zinc-400">

        Loading document...

      </div>

    );

  }

  if (!document) {

    return (

      <div className="py-24 text-center text-red-400">

        Document not found.

      </div>

    );

  }

  return (

    <div className="mx-auto max-w-5xl space-y-8">

      <button

        onClick={() => navigate(-1)}

        className="flex items-center gap-2 text-zinc-400 transition hover:text-white"

      >

        <ArrowLeft size={18} />

        Back

      </button>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-cyan-500/10 p-4">

            <FileText
              className="text-cyan-400"
              size={34}
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold text-white">

              {document.document_name}

            </h1>

            <p className="mt-1 text-zinc-400">

              {document.document_type}

            </p>

          </div>

        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <InfoCard
          icon={<Building2 size={20} />}
          title="Merchant"
          value={document.merchant}
        />

        <InfoCard
          icon={<IndianRupee size={20} />}
          title="Amount"
          value={
            document.amount
              ? `₹${document.amount}`
              : "Unknown"
          }
        />

        <InfoCard
          icon={<Tag size={20} />}
          title="Category"
          value={document.category}
        />

        <InfoCard
          icon={<CreditCard size={20} />}
          title="Payment Method"
          value={document.payment_method}
        />

        <InfoCard
          icon={<Calendar size={20} />}
          title="Date"
          value={document.transaction_date}
        />

        <InfoCard
          icon={<ShieldCheck size={20} />}
          title="Confidence"
          value={document.confidence}
        />

      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8">

        <div className="mb-4 flex items-center gap-3">

          <Sparkles
            size={22}
            className="text-cyan-400"
          />

          <h2 className="text-xl font-bold text-white">

            AI Summary

          </h2>

        </div>

        <p className="leading-8 text-zinc-300">

          {document.ai_summary ??
            "No summary available."}

        </p>

      </div>

    </div>

  );

}

function InfoCard({

  icon,

  title,

  value,

}: {

  icon: React.ReactNode;

  title: string;

  value: string | number | null;

}) {

  return (

    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">

      <div className="mb-3 flex items-center gap-3 text-cyan-400">

        {icon}

        <span className="font-semibold">

          {title}

        </span>

      </div>

      <div className="text-lg text-white">

        {value || "Unknown"}

      </div>

    </div>

  );

}