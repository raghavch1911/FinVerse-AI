from langchain_core.messages import HumanMessage

from ai.agents.base_agent import BaseAgent
from ai.tools.document_tool import DocumentTool


class DocumentAgent(BaseAgent):
    """
    AI agent responsible for answering questions using
    the user's uploaded financial documents.
    """

    def __init__(self) -> None:
        super().__init__(
            "document_advisor.txt",
        )

    def run(
        self,
        question: str,
        user_id: int,
    ) -> str:

        context = DocumentTool.execute(
            question=question,
            user_id=user_id,
        )

        if not context:
            return (
                "I couldn't find any relevant information "
                "in your uploaded documents."
            )

        messages = [
            self.system_message(),
            HumanMessage(
                content=f"""
Document Context

{context}

Question

{question}

Answer using only the provided document context.
If the answer is not present in the context,
say that the information is unavailable.
""".strip(),
            ),
        ]

        return self.invoke(messages)