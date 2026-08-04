import api from "./api";

import type {
  Document,
  DocumentsResponse,
  UploadDocumentResponse,
  DeleteDocumentResponse,
  ImportTransactionResponse,
} from "../types/document";

const documentService = {

  async getDocuments(): Promise<Document[]> {

    const { data } =
      await api.get<DocumentsResponse>(
        "/documents/"
      );

    return data.documents;

  },

  async getDocument(
    id: number
  ): Promise<Document> {

    const { data } =
      await api.get<Document>(
        `/documents/${id}`
      );

    return data;

  },

  async uploadDocument(
    file: File
  ): Promise<UploadDocumentResponse> {

    const formData = new FormData();

    formData.append(
      "file",
      file
    );

    const { data } =
      await api.post<UploadDocumentResponse>(
        "/documents/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return data;

  },

  async importTransactions(
  transactions: {
    date: string;
    title: string;
    amount: number;
    type: string;
    category: string;
  }[]
): Promise<ImportTransactionResponse> {

  const { data } =
    await api.post<ImportTransactionResponse>(
      "/documents/import",
      transactions
    );

  return data;
},

  async deleteDocument(
    id: number
  ): Promise<DeleteDocumentResponse> {

    const { data } =
      await api.delete<DeleteDocumentResponse>(
        `/documents/${id}`
      );

    return data;

  },

};

export default documentService;