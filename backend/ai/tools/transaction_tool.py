from sqlalchemy.orm import Session

from models.user import User
from schemas.transaction_schema import TransactionResponse
from services.transaction_service import TransactionService


class TransactionTool:
    """
    AI tool for retrieving the authenticated user's transactions.

    Acts as a lightweight wrapper around TransactionService,
    exposing transaction data to AI agents.
    """

    @staticmethod
    def execute(
        db: Session,
        current_user: User,
    ) -> list[TransactionResponse]:
        """
        Retrieve all transactions belonging to the authenticated user.

        Args:
            db: Active database session.
            current_user: Authenticated user.

        Returns:
            A list of transaction response objects.
        """
        return TransactionService.get_transactions(
            db=db,
            current_user=current_user,
        )