import os
import shutil
from datetime import datetime
from zoneinfo import ZoneInfo
from uuid import uuid4

from sqlalchemy.orm import Session

from ai.rag.document_loader import DocumentLoader
from ai.rag.text_splitter import TextSplitter
from ai.rag.vector_store import VectorStore
from ai.tools.ocr_tool import OCRTool

from models.document import Document
from repositories.document_repository import DocumentRepository

from services.document_extraction_service import (
    DocumentExtractionService,
)
from services.bank_statement_import_service import (
    BankStatementImportService,
)
import pandas as pd

from models.transaction import Transaction

from repositories.category_repository import (
    CategoryRepository,
)

from repositories.transaction_repository import (
    TransactionRepository,
)

class DocumentService:
    """
    Handles uploading, indexing, retrieving,
    and deleting financial documents.
    """

    UPLOAD_DIRECTORY = "uploads"

    @classmethod
    def upload_document(
    cls,
    db: Session,
    user_id: int,
    uploaded_file,
) -> Document:

        os.makedirs(
            cls.UPLOAD_DIRECTORY,
            exist_ok=True,
        )

        unique_filename = (
            f"{uuid4()}_{uploaded_file.filename}"
        )

        file_path = os.path.join(
            cls.UPLOAD_DIRECTORY,
            unique_filename,
        )

        try:

            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(
                    uploaded_file.file,
                    buffer,
                )

            # -----------------------------------------
            # OCR Extraction
            # -----------------------------------------

            extension = os.path.splitext(file_path)[1].lower()

            # OCR only for images and scanned PDFs
            if extension in [
                ".png",
                ".jpg",
                ".jpeg",
                ".bmp",
                ".tiff",
                ".pdf",
            ]:
                text = OCRTool.extract_text(file_path)

                if not text or not text.strip():
                    text = DocumentLoader.load(file_path)

            else:
                # TXT, CSV, XLSX, DOCX...
                text = DocumentLoader.load(file_path)

            if not text or not text.strip():
                raise ValueError(
                    "No readable text found in the uploaded document."
                )

            # -----------------------------------------
            # AI Financial Extraction
            # -----------------------------------------

            extracted_data = (
                DocumentExtractionService.extract(
                    text
                )
            )

            # -----------------------------------------
            # AI Document Type Detection
            # -----------------------------------------

            document_type = extracted_data.get(
                "document_type",
                "Other",
            )

            if (
                not document_type
                or document_type == "Unknown"
            ):
                document_type = "Other"

            # -----------------------------------------
            # Detect Transactions For Every Document
            # -----------------------------------------

            transaction_preview = []

            requires_import = False

            # CSV / Excel Bank Statements
            if extension in [".csv", ".xlsx", ".xls"]:

                transaction_preview = (
                    BankStatementImportService.preview_transactions(
                        file_path=file_path,
                    )
                )

            # Every other document (PDF, PNG, JPG, TXT...)
            else:

                if "transactions" in extracted_data:

                    transaction_preview = extracted_data["transactions"]

                elif extracted_data.get("amount") not in [
                    None,
                    "",
                    "Unknown",
                ]:

                    transaction_preview = [

                        {

                            "date": extracted_data.get(
                                "date",
                                "",
                            ),

                            "title": extracted_data.get(
                                "merchant",
                                "Transaction",
                            ),

                            "amount": float(
                                extracted_data["amount"]
                            ),

                            "type": extracted_data.get(
                                "type",
                                "EXPENSE",
                            ),

                            "category": extracted_data.get(
                                "category",
                                "Other",
                            ),

                        }

                    ]

            requires_import = len(transaction_preview) > 0

            # -----------------------------------------
            # Split Document
            # -----------------------------------------

            splitter = TextSplitter()

            chunks = splitter.split(text)

            if not chunks:
                raise ValueError(
                    "Document could not be split into searchable chunks."
                )

            vector_document_id = str(uuid4())

            uploaded_at = datetime.now(
                ZoneInfo("Asia/Kolkata")
            ).isoformat()

            for index, chunk in enumerate(chunks):

                chunk.metadata = {
                    "user_id": user_id,
                    "document_id": vector_document_id,
                    "document_name": uploaded_file.filename,
                    "document_type": document_type,
                    "chunk_index": index,
                    "uploaded_at": uploaded_at,

                    # Future AI Metadata
                    "merchant": extracted_data.get(
                        "merchant",
                        "Unknown",
                    ),
                    "amount": extracted_data.get(
                        "amount",
                        "Unknown",
                    ),
                    "category": extracted_data.get(
                        "category",
                        "Unknown",
                    ),
                    "payment_method": extracted_data.get(
                        "payment_method",
                        "Unknown",
                    ),
                    "date": extracted_data.get(
                        "date",
                        "Unknown",
                    ),
                    "transactions_found": len(
    transaction_preview
),
                }

            VectorStore.get_store().add_documents(
                chunks
            )

            document = Document(
    user_id=user_id,

    document_name=uploaded_file.filename,

    document_type=document_type,

    file_path=file_path,

    vector_document_id=vector_document_id,

    uploaded_at=datetime.now(
        ZoneInfo("Asia/Kolkata")
    ),

    # -----------------------------
    # AI Extracted Information
    # -----------------------------

    merchant=(
        None
        if extracted_data.get("merchant") == "Unknown"
        else extracted_data.get("merchant")
    ),

    amount=(
        float(extracted_data["amount"])
        if extracted_data.get("amount")
        not in [None, "", "Unknown"]
        else None
    ),

    transaction_date=(
        None
        if extracted_data.get("date") == "Unknown"
        else extracted_data.get("date")
    ),

    category=(
        None
        if extracted_data.get("category") == "Unknown"
        else extracted_data.get("category")
    ),

    payment_method=(
        None
        if extracted_data.get("payment_method") == "Unknown"
        else extracted_data.get("payment_method")
    ),

    confidence=(
        None
        if extracted_data.get("confidence") == "Unknown"
        else extracted_data.get("confidence")
    ),

    ai_summary=(

    f"{document_type} uploaded successfully."

    if not requires_import

    else

    f"Found {len(transaction_preview)} "
    f"transactions ready for import."

),
)

            document = DocumentRepository.create(
                db=db,
                document=document,
            )

            return {
                "document": document,
                "requires_import": requires_import,
                "transactions": transaction_preview,
            }

        except Exception:

            db.rollback()

            if os.path.exists(file_path):
                os.remove(file_path)

            raise

    @staticmethod
    def get_documents(
        db: Session,
        user_id: int,
    ) -> list[Document]:

        return DocumentRepository.get_user_documents(
            db=db,
            user_id=user_id,
        )

    @staticmethod
    def import_transactions(
        db: Session,
        user_id: int,
        transactions: list[dict],
    ) -> dict:

        transaction_models = []

        imported = 0
        skipped = 0

        for item in transactions:

            category = CategoryRepository.get_by_name(
                db=db,
                name=item["category"],
                category_type=item["type"],
                user_id=user_id,
            )

            if category is None:

                from models.category import Category

                category = CategoryRepository.create(

                    db=db,

                    category=Category(

                        user_id=user_id,

                        name=item["category"],

                        type=item["type"],

                    ),

                )

            transaction_models.append(

                Transaction(

                    user_id=user_id,

                    category_id=category.id,

                    type=item["type"],

                    title=item["title"][:150],

                    description=item["title"],

                    amount=float(item["amount"]),

                    transaction_date=pd.to_datetime(
                        item["date"]
                    ).date(),

                )

            )

            imported += 1

        if transaction_models:
            print("\n========== IMPORT ==========")

            print("Detected:", len(transactions))

            print("Saving:", len(transaction_models))

            for t in transaction_models:
                print(
                    t.title,
                    t.type,
                    t.category_id
                )

            print("============================\n")

            TransactionRepository.bulk_create(
                db=db,
                transactions=transaction_models,
            )

        return {

            "imported": imported,

            "skipped": skipped,

        }

    @staticmethod
    def get_document(
        db: Session,
        document_id: int,
    ) -> Document | None:

        return DocumentRepository.get_by_id(
            db=db,
            document_id=document_id,
        )

    @staticmethod
    def delete_document(
        db: Session,
        document: Document,
    ) -> None:

        if os.path.exists(document.file_path):
            os.remove(document.file_path)

        VectorStore.get_store().delete(
            where={
                "document_id": document.vector_document_id,
            }
        )

        DocumentRepository.delete(
            db=db,
            document=document,
        )