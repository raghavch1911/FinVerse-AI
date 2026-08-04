from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import relationship

from database.base import Base


class Category(Base):
    """
    Represents an income or expense category
    created by a user.
    """

    __tablename__ = "categories"

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

    name = Column(
        String(100),
        nullable=False,
    )

    type = Column(
        String(20),
        nullable=False,
        index=True,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    user = relationship(
        "User",
        back_populates="categories",
    )

    transactions = relationship(
        "Transaction",
        back_populates="category",
        cascade="all, delete-orphan",
    )

    budgets = relationship(
        "Budget",
        back_populates="category",
        cascade="all, delete-orphan",
    )