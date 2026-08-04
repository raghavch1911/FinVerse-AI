from sqlalchemy.orm import Session

from exceptions.custom_exceptions import DuplicateResourceException
from models.category import Category
from models.transaction import Transaction
from models.user import User
from repositories.category_repository import CategoryRepository
from schemas.category_schema import CategoryCreate

MASTER_EXPENSE_CATEGORIES = [
    "Food",
    "Groceries",
    "Shopping",
    "Transport",
    "Bills & Utilities",
    "Healthcare",
    "Education",
    "Entertainment",
    "Travel",
    "Rent",
    "Insurance",
    "Cash",
    "Miscellaneous",
]

MASTER_INCOME_CATEGORIES = [
    "Salary",
    "Investment",
    "Transfer",
    "Other Income",
]
class CategoryService:
    """
    Handles category-related business logic.
    """
    @staticmethod
    def seed_master_categories(
        db: Session,
        current_user: User,
    ) -> None:

        for name in MASTER_EXPENSE_CATEGORIES:

            if not CategoryRepository.exists(
                db,
                current_user.id,
                name,
                "EXPENSE",
            ):

                CategoryRepository.create(
                    db,
                    Category(
                        user_id=current_user.id,
                        name=name,
                        type="EXPENSE",
                    ),
                )

        for name in MASTER_INCOME_CATEGORIES:

            if not CategoryRepository.exists(
                db,
                current_user.id,
                name,
                "INCOME",
            ):

                CategoryRepository.create(
                    db,
                    Category(
                        user_id=current_user.id,
                        name=name,
                        type="INCOME",
                    ),
                )

    @staticmethod
    def create_category(
        db: Session,
        current_user: User,
        category_data: CategoryCreate,
    ) -> Category:

        existing_category = CategoryRepository.get_by_name(
            db,
            category_data.name,
            category_data.type,
            current_user.id,
        )

        if existing_category:
            raise DuplicateResourceException(
                "Category already exists."
            )

        category = Category(
            user_id=current_user.id,
            name=category_data.name,
            type=category_data.type,
        )

        return CategoryRepository.create(
            db,
            category,
        )

    @staticmethod
    def get_categories(
        db: Session,
        current_user: User,
    ) -> list[Category]:

        CategoryService.seed_master_categories(
            db,
            current_user,
        )

        CategoryService.cleanup_duplicate_categories(
    db,
    current_user,
)

        categories = CategoryRepository.get_all(
            db,
            current_user.id,
        )

        allowed = (
            MASTER_EXPENSE_CATEGORIES
            + MASTER_INCOME_CATEGORIES
        )

        return [
            category
            for category in categories
            if category.name in allowed
        ]

    @staticmethod
    def cleanup_duplicate_categories(
        db: Session,
        current_user: User,
    ) -> None:

        mappings = {

            ("Utilities", "EXPENSE"):
                ("Bills & Utilities", "EXPENSE"),

            ("Interest", "INCOME"):
                ("Investment", "INCOME"),

            ("Other", "EXPENSE"):
                ("Miscellaneous", "EXPENSE"),

            ("Other", "INCOME"):
                ("Other Income", "INCOME"),
        }

        for (
            old_name,
            old_type,
        ), (
            new_name,
            new_type,
        ) in mappings.items():

            old_category = CategoryRepository.get_by_name(
                db,
                old_name,
                old_type,
                current_user.id,
            )

            new_category = CategoryRepository.get_by_name(
                db,
                new_name,
                new_type,
                current_user.id,
            )

            if (
                old_category is None
                or new_category is None
            ):
                continue

            db.query(Transaction).filter(
                Transaction.category_id == old_category.id
            ).update(
                {
                    "category_id": new_category.id
                }
            )

            db.delete(old_category)

        db.commit()