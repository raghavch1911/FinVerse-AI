from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, Body
from sqlalchemy.orm import Session

from database.connection import get_db
from models.user import User
from schemas.document import (
    DocumentDeleteResponse,
    DocumentListResponse,
    DocumentResponse,
    DocumentUploadResponse,
    DocumentImportResponse,
)
from services.auth_service import AuthService
from services.document_service import DocumentService

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


@router.post(
    "/upload",
    response_model=DocumentUploadResponse,
)
def upload_document(
    file: UploadFile = File(...),
    current_user: User = Depends(AuthService.get_current_user),
    db: Session = Depends(get_db),
) -> DocumentUploadResponse:

    result = DocumentService.upload_document(
        db=db,
        user_id=current_user.id,
        uploaded_file=file,
    )

    document = result["document"]

    return DocumentUploadResponse(
        message="Document analyzed successfully.",
        document_id=document.id,
        document_name=document.document_name,
        requires_import=result["requires_import"],
        transactions=result["transactions"],
    )

@router.post(
    "/import",
    response_model=DocumentImportResponse,
)
def import_transactions(
    transactions: list[dict] = Body(...),
    current_user: User = Depends(AuthService.get_current_user),
    db: Session = Depends(get_db),
):

    result = DocumentService.import_transactions(
        db=db,
        user_id=current_user.id,
        transactions=transactions,
    )

    return DocumentImportResponse(
        message="Transactions imported successfully.",
        imported=result["imported"],
        skipped=result["skipped"],
    )

@router.get(
    "/",
    response_model=DocumentListResponse,
)
def get_documents(
    current_user: User = Depends(AuthService.get_current_user),
    db: Session = Depends(get_db),
) -> DocumentListResponse:

    documents = DocumentService.get_documents(
        db=db,
        user_id=current_user.id,
    )

    return DocumentListResponse(
        documents=documents,
    )


@router.get(
    "/{document_id}",
    response_model=DocumentResponse,
)
def get_document(
    document_id: int,
    current_user: User = Depends(AuthService.get_current_user),
    db: Session = Depends(get_db),
) -> DocumentResponse:

    document = DocumentService.get_document(
        db=db,
        document_id=document_id,
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found.",
        )

    if document.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Access denied.",
        )

    return document


@router.delete(
    "/{document_id}",
    response_model=DocumentDeleteResponse,
)
def delete_document(
    document_id: int,
    current_user: User = Depends(AuthService.get_current_user),
    db: Session = Depends(get_db),
) -> DocumentDeleteResponse:

    document = DocumentService.get_document(
        db=db,
        document_id=document_id,
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found.",
        )

    if document.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Access denied.",
        )

    DocumentService.delete_document(
        db=db,
        document=document,
    )

    return DocumentDeleteResponse(
        message="Document deleted successfully.",
    )