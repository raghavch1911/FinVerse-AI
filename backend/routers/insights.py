from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.connection import get_db
from models.user import User
from schemas.insights_schema import FinancialInsightsResponse
from services.auth_service import AuthService
from services.insights_service import InsightsService

router = APIRouter(
    prefix="/insights",
    tags=["Insights"],
)


@router.get(
    "",
    response_model=FinancialInsightsResponse,
)
def get_financial_insights(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        AuthService.get_current_user,
    ),
) -> FinancialInsightsResponse:
    return InsightsService.get_insights(
        db,
        current_user,
    )