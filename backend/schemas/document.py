from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class DocumentBase(BaseModel):
    document_name: str = Field(
        ...,
        min_length=1,
        max_length=255,
    )

    document_type: str = Field(
        ...,
        min_length=1,
        max_length=50,
    )


# ---------------------------------------
# Transaction Preview
# ---------------------------------------

class ImportedTransactionPreview(BaseModel):

    date: str

    title: str

    amount: float

    type: str

    category: str


class DocumentResponse(DocumentBase):

    id: int

    user_id: int

    file_path: str

    vector_document_id: str

    merchant: str | None = None

    amount: float | None = None

    transaction_date: str | None = None

    category: str | None = None

    payment_method: str | None = None

    confidence: str | None = None

    ai_summary: str | None = None

    uploaded_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )


class DocumentUploadResponse(BaseModel):

    message: str

    document_id: int

    document_name: str

    # ------------------------------
    # NEW
    # ------------------------------

    requires_import: bool = False

    transactions: list[
        ImportedTransactionPreview
    ] = []


class DocumentDeleteResponse(BaseModel):

    message: str

class DocumentListResponse(BaseModel):

    documents: list[DocumentResponse]

class DocumentImportResponse(BaseModel):
    message: str

    imported: int

    skipped: int