from datetime import datetime

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import relationship

from database.base import Base


class Document(Base):
    """
    Stores uploaded documents along with
    AI-extracted financial information.
    """

    __tablename__ = "documents"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True,
    )

    document_name = Column(
        String(255),
        nullable=False,
    )

    document_type = Column(
        String(100),
        nullable=False,
        index=True,
    )

    file_path = Column(
        String(500),
        nullable=False,
    )

    vector_document_id = Column(
        String(100),
        nullable=False,
        unique=True,
        index=True,
    )

    # ---------------------------------------
    # AI Extracted Fields
    # ---------------------------------------

    merchant = Column(
        String(255),
        nullable=True,
    )

    amount = Column(
        Float,
        nullable=True,
    )

    transaction_date = Column(
        String(50),
        nullable=True,
    )

    category = Column(
        String(100),
        nullable=True,
    )

    payment_method = Column(
        String(100),
        nullable=True,
    )

    confidence = Column(
        String(30),
        nullable=True,
    )

    ai_summary = Column(
        Text,
        nullable=True,
    )

    # ---------------------------------------
    # Import Status
    # ---------------------------------------

    transactions_imported = Column(
        Boolean,
        default=False,
        nullable=False,
    )

    imported_count = Column(
        Integer,
        default=0,
        nullable=False,
    )

    uploaded_at = Column(
        DateTime,
        default=datetime.utcnow,
        index=True,
    )

    user = relationship(
        "User",
        back_populates="documents",
    )