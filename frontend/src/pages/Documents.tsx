import { useEffect, useState } from "react";
import { Plus, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

import documentService from "../services/documentService";

import type {
  Document,
} from "../types/document";

import DocumentCard from "../components/documents/DocumentCard";
import UploadDocumentModal from "../components/documents/UploadDocumentModal";
import DeleteDocumentModal from "../components/documents/DeleteDocumentModal";
import ReviewTransactionsModal from "../components/documents/ReviewTransactionsModal";
import toast from "react-hot-toast";

export default function Documents() {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState<Document[]>([]);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [showUpload, setShowUpload] = useState(false);

  const [selectedDocument, setSelectedDocument] =
    useState<Document | null>(null);

  const [showDelete, setShowDelete] = useState(false);

  const [showReviewModal, setShowReviewModal] =
  useState(false);

const [detectedTransactions, setDetectedTransactions] =
  useState<any[]>([]);

  const [, setDocumentId] =
  useState<number | null>(null);

const [importing, setImporting] =
  useState(false);

  const loadDocuments = async () => {
    try {
      setLoading(true);

      const docs =
        await documentService.getDocuments();

      setDocuments(docs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const uploadDocument = async (
  file: File
) => {

  try {

    setUploading(true);

    const result =
      await documentService.uploadDocument(file);

    setShowUpload(false);

    if (result.requires_import) {

  setDocumentId(result.document_id);

  setDetectedTransactions(
    result.transactions
  );

  setShowReviewModal(true);

} else {

      toast.success("Document uploaded successfully.");

      loadDocuments();

    }

  } catch (error) {

    console.error(error);

    toast.error("Upload failed.");

  } finally {

    setUploading(false);

  }

};

  const deleteDocument = async () => {
    if (!selectedDocument) return;

    try {
      setDeleting(true);

      await documentService.deleteDocument(
        selectedDocument.id
      );

      setShowDelete(false);
      setSelectedDocument(null);

      loadDocuments();
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  const importTransactions = async () => {

  if (detectedTransactions.length === 0) return;

  try {

    setImporting(true);

    const result =
  await documentService.importTransactions(
    detectedTransactions
  );

toast.success(
  `${result.imported} transactions imported successfully`
);

    setShowReviewModal(false);

    setDetectedTransactions([]);
    setDocumentId(null);
    await loadDocuments();

  } catch (error) {

    console.error(error);

    toast.error("Failed to import transactions.");

  } finally {

    setImporting(false);

  }

};

  const askAI = (document: Document) => {
    navigate("/assistant", {
      state: {
        prompt: `Analyze my document "${document.document_name}" and summarize the important financial information.`,
      },
    });
  };

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-white">
            Documents
          </h1>

          <p className="mt-1 text-zinc-400">
            Upload and manage financial
            documents.
          </p>

        </div>

        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black transition hover:bg-cyan-400"
        >
          <Plus size={18} />
          Upload
        </button>

      </div>

      {loading ? (

        <div className="py-24 text-center text-zinc-400">
          Loading documents...
        </div>

      ) : documents.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-zinc-700 py-20 text-center">

          <FileText
            size={70}
            className="mx-auto mb-5 text-zinc-600"
          />

          <h2 className="text-2xl font-semibold text-white">
            No Documents Yet
          </h2>

          <p className="mt-2 text-zinc-400">
            Upload your first financial document.
          </p>

        </div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {documents.map((doc) => (

            <DocumentCard
              key={doc.id}
              document={doc}
              onDelete={(document) => {
                setSelectedDocument(document);
                setShowDelete(true);
              }}
              onAskAI={askAI}
            />

          ))}

        </div>

      )}

      <UploadDocumentModal
        open={showUpload}
        loading={uploading}
        onClose={() => setShowUpload(false)}
        onUpload={uploadDocument}
      />

      <DeleteDocumentModal
        open={showDelete}
        loading={deleting}
        document={selectedDocument}
        onClose={() => {
          setShowDelete(false);
          setSelectedDocument(null);
        }}
        onDelete={deleteDocument}
      />

<ReviewTransactionsModal
  open={showReviewModal}
  loading={importing}
  transactions={detectedTransactions}
  onClose={() => {

  setShowReviewModal(false);

  setDetectedTransactions([]);

  setDocumentId(null);

}}
  onImport={importTransactions}
/>

    </div>
  );
}