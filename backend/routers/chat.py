from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.connection import get_db
from models.user import User
from schemas.chat_schema import ChatRequest, ChatResponse
from services.auth_service import AuthService
from services.chat_service import ChatService

router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"],
)


@router.post(
    "",
    response_model=ChatResponse,
)
def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        AuthService.get_current_user,
    ),
) -> ChatResponse:

    response = ChatService.ask(
        db=db,
        current_user=current_user,
        message=request.message,
    )

    return ChatResponse(
        response=response,
    )