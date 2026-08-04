export interface Document {
  id: number;

  user_id: number;

  document_name: string;

  document_type: string;

  file_path: string;

  vector_document_id: string;

  uploaded_at: string;

  merchant: string | null;

  amount: number | null;

  transaction_date: string | null;

  category: string | null;

  payment_method: string | null;

  confidence: string | null;

  ai_summary: string | null;
}

export interface ImportedTransactionPreview {

  date: string;

  title: string;

  amount: number;

  type: string;

  category: string;
}

export interface DocumentsResponse {

  documents: Document[];
}

export interface TransactionPreview {
  date: string;
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
}

export interface UploadDocumentResponse {
  message: string;

  document_id: number;

  document_name: string;

  requires_import: boolean;

  transactions: TransactionPreview[];
}

export interface ImportTransactionResponse {
  message: string;

  imported: number;

  skipped: number;
}

export interface DeleteDocumentResponse {

  message: string;
}