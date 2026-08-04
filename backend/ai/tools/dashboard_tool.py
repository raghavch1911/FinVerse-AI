from sqlalchemy.orm import Session

from models.user import User
from schemas.dashboard_schema import DashboardResponse
from services.dashboard_service import DashboardService


class DashboardTool:
    """
    AI tool for retrieving the authenticated user's dashboard
    summary and financial overview.
    """

    @staticmethod
    def execute(
        db: Session,
        current_user: User,
    ) -> DashboardResponse:
        """
        Retrieve the dashboard data for the authenticated user.

        Args:
            db: Active database session.
            current_user: Authenticated user.

        Returns:
            A dashboard summary containing the user's financial overview.
        """
        return DashboardService.get_dashboard(
            db=db,
            current_user=current_user,
        )