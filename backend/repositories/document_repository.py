from sqlalchemy.orm import Session

from models.document import Document


class DocumentRepository:
    """
    Handles database operations for uploaded documents.
    """

    @staticmethod
    def create(
        db: Session,
        document: Document,
    ) -> Document:
        db.add(document)
        db.commit()
        db.refresh(document)

        return document

    @staticmethod
    def update(
        db: Session,
        document: Document,
    ) -> Document:

        db.commit()

        db.refresh(document)

        return document

    @staticmethod
    def get_by_id(
        db: Session,
        document_id: int,
    ) -> Document | None:
        return (
            db.query(Document)
            .filter(Document.id == document_id)
            .first()
        )

    @staticmethod
    def get_by_vector_id(
        db: Session,
        vector_document_id: str,
    ) -> Document | None:
        return (
            db.query(Document)
            .filter(
                Document.vector_document_id == vector_document_id
            )
            .first()
        )

    @staticmethod
    def get_user_documents(
        db: Session,
        user_id: int,
    ) -> list[Document]:
        return (
            db.query(Document)
            .filter(Document.user_id == user_id)
            .order_by(Document.uploaded_at.desc())
            .all()
        )

    @staticmethod
    def delete(
        db: Session,
        document: Document,
    ) -> None:
        db.delete(document)
        db.commit()