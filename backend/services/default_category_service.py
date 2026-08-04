from sqlalchemy.orm import Session

from models.category import Category
from repositories.category_repository import (
    CategoryRepository,
)


class DefaultCategoryService:
    """
    Creates default income and expense
    categories for newly registered users.
    """

    EXPENSE_CATEGORIES = [
        "Food",
        "Groceries",
        "Transport",
        "Fuel",
        "Shopping",
        "Entertainment",
        "Bills & Utilities",
        "Healthcare",
        "Education",
        "Travel",
        "Rent",
        "EMI / Loans",
        "Insurance",
        "Subscriptions",
        "Investments",
        "Taxes",
        "Personal Care",
        "Gifts",
        "Pets",
        "Other",
    ]

    INCOME_CATEGORIES = [
        "Salary",
        "Freelancing",
        "Business",
        "Bonus",
        "Interest",
        "Dividends",
        "Rental Income",
        "Investment Returns",
        "Refund",
        "Gift Received",
        "Other Income",
    ]

    @classmethod
    def create_defaults(
        cls,
        db: Session,
        user_id: int,
    ) -> None:

        for category_name in cls.EXPENSE_CATEGORIES:

            CategoryRepository.create(
                db,
                Category(
                    user_id=user_id,
                    name=category_name,
                    type="EXPENSE",
                ),
            )

        for category_name in cls.INCOME_CATEGORIES:

            CategoryRepository.create(
                db,
                Category(
                    user_id=user_id,
                    name=category_name,
                    type="INCOME",
                ),
            )