from datetime import datetime

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    UniqueConstraint,
)
from sqlalchemy.orm import relationship

from database.base import Base


class Budget(Base):
    """
    Stores a monthly budget for a specific
    user and category.
    """

    __tablename__ = "budgets"

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "category_id",
            "month",
            "year",
            name="uq_budget_user_category_month_year",
        ),
    )

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

    category_id = Column(
        Integer,
        ForeignKey("categories.id"),
        nullable=False,
        index=True,
    )

    amount = Column(
        Float,
        nullable=False,
    )

    month = Column(
        Integer,
        nullable=False,
        index=True,
    )

    year = Column(
        Integer,
        nullable=False,
        index=True,
    )

    alert_percentage = Column(
        Float,
        default=80.0,
        nullable=False,
    )

    is_active = Column(
        Boolean,
        default=True,
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    user = relationship(
        "User",
        back_populates="budgets",
    )

    category = relationship(
        "Category",
        back_populates="budgets",
    )