from sqlalchemy.orm import Session

from models.user import User
from schemas.budget_schema import BudgetResponse
from services.budget_service import BudgetService


class BudgetTool:
    """
    AI tool for retrieving the current user's budgets.
    Acts as a lightweight wrapper around BudgetService.
    """

    @staticmethod
    def execute(
        db: Session,
        current_user: User,
    ) -> list[BudgetResponse]:
        """
        Retrieve all budgets belonging to the authenticated user.

        Args:
            db: Active database session.
            current_user: Authenticated user.

        Returns:
            A list of budget response objects.
        """
        return BudgetService.get_all_budgets(
            db=db,
            current_user=current_user,
        )