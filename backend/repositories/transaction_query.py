from datetime import date

from sqlalchemy import asc, desc, or_
from sqlalchemy.orm import Query

from models.category import Category
from models.transaction import Transaction


class TransactionQueryBuilder:
    """
    Builds reusable transaction queries by applying
    filtering, searching, and sorting operations.
    """

    @staticmethod
    def base_query(
        query: Query,
        user_id: int,
    ) -> Query:
        """
        Restrict transactions to the current user.
        """
        return query.filter(Transaction.user_id == user_id)

    @staticmethod
    def apply_search(
        query: Query,
        search: str | None,
    ) -> Query:
        """
        Search by transaction title, description,
        or category name.
        """

        if not search:
            return query

        search = f"%{search.strip()}%"

        return (
            query.join(Category)
            .filter(
                or_(
                    Transaction.title.ilike(search),
                    Transaction.description.ilike(search),
                    Category.name.ilike(search),
                )
            )
        )

    @staticmethod
    def apply_category(
        query: Query,
        category: str | None,
    ) -> Query:
        """
        Filter by category name.
        """

        if not category:
            return query

        return (
            query.join(Category)
            .filter(Category.name.ilike(category))
        )

    @staticmethod
    def apply_transaction_type(
        query: Query,
        transaction_type: str | None,
    ) -> Query:
        """
        Filter by transaction type.
        """

        if not transaction_type:
            return query

        return query.filter(
            Transaction.type == transaction_type.upper()
        )

    @staticmethod
    def apply_date_range(
        query: Query,
        start_date: date | None,
        end_date: date | None,
    ) -> Query:
        """
        Filter transactions within a date range.
        """

        if start_date:
            query = query.filter(
                Transaction.transaction_date >= start_date
            )

        if end_date:
            query = query.filter(
                Transaction.transaction_date <= end_date
            )

        return query

    @staticmethod
    def apply_amount_range(
        query: Query,
        min_amount: float | None,
        max_amount: float | None,
    ) -> Query:
        """
        Filter transactions by amount range.
        """

        if min_amount is not None:
            query = query.filter(
                Transaction.amount >= min_amount
            )

        if max_amount is not None:
            query = query.filter(
                Transaction.amount <= max_amount
            )

        return query

    @staticmethod
    def apply_sorting(
        query: Query,
        sort_by: str,
        order: str,
    ) -> Query:
        """
        Apply sorting to the transaction query.
        """

        columns = {
            "date": Transaction.transaction_date,
            "transaction_date": Transaction.transaction_date,
            "amount": Transaction.amount,
            "title": Transaction.title,
            "created_at": Transaction.created_at,
        }

        column = columns.get(
            sort_by,
            Transaction.transaction_date,
        )

        order = order.lower()

        if order == "asc":
            return query.order_by(
                asc(column),
                asc(Transaction.created_at),
            )

        return query.order_by(
            desc(column),
            desc(Transaction.created_at),
        )