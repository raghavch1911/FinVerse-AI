from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.connection import get_db
from models.user import User
from schemas.report_schema import FinancialReportResponse
from services.auth_service import AuthService
from services.report_service import ReportService

router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)


@router.get(
    "/financial-summary",
    response_model=FinancialReportResponse,
)
def generate_financial_report(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        AuthService.get_current_user,
    ),
) -> FinancialReportResponse:

    return ReportService.generate_financial_report(
        db,
        current_user,
    )