from sqlalchemy.orm import Session

from ai.graph.workflow import FinancialWorkflow
from ai.memory.conversation_memory import ConversationMemory
from ai.tools.insights_tool import InsightsTool
from models.user import User
from ai.tools.document_tool import DocumentTool


class ChatService:
    """
    Handles AI chat interactions by preparing
    workflow state and maintaining conversation
    history.
    """

    @staticmethod
    def ask(
        db: Session,
        current_user: User,
        message: str,
    ) -> str:

        financial_context = InsightsTool.execute(
            db=db,
            current_user=current_user,
        )

        # ----------------------------------------
        # Add relevant uploaded document context
        # ----------------------------------------

        document_context = DocumentTool.execute(
            question=message,
            user_id=current_user.id,
        )

        financial_context["uploaded_documents"] = (
            document_context
        )

        history = ConversationMemory.get_messages(
            current_user.id,
        )

        workflow = FinancialWorkflow.get_workflow()

        state = {
            "user_id": current_user.id,
            "user_message": message,
            "financial_context": financial_context,
            "history": history,
            "intent": "",
            "response": "",
        }

        result = workflow.invoke(state)

        response = result.get(
            "response",
            "Sorry, I couldn't generate a response.",
        )

        ConversationMemory.add_message(
            current_user.id,
            "user",
            message,
        )

        ConversationMemory.add_message(
            current_user.id,
            "assistant",
            response,
        )

        return response