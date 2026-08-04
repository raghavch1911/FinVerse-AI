from sqlalchemy.orm import Session

from models.category import Category


class CategoryRepository:
    """
    Handles database operations for categories.
    """

    @staticmethod
    def get_by_name(
        db: Session,
        name: str,
        category_type: str,
        user_id: int,
    ) -> Category | None:
        return (
            db.query(Category)
            .filter(
                Category.user_id == user_id,
                Category.name == name,
                Category.type == category_type,
            )
            .first()
        )

    @staticmethod
    def create(
        db: Session,
        category: Category,
    ) -> Category:
        db.add(category)
        db.commit()
        db.refresh(category)
        return category

    @staticmethod
    def get_all(
        db: Session,
        user_id: int,
    ) -> list[Category]:
        return (
            db.query(Category)
            .filter(Category.user_id == user_id)
            .order_by(Category.name.asc())
            .all()
        )

    @staticmethod
    def exists(
        db: Session,
        user_id: int,
        name: str,
        category_type: str,
    ) -> bool:

        return (
            db.query(Category)
            .filter(
                Category.user_id == user_id,
                Category.name == name,
                Category.type == category_type,
            )
            .first()
            is not None
        )