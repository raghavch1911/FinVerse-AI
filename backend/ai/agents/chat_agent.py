from langchain_core.messages import (
    AIMessage,
    HumanMessage,
)

from ai.agents.base_agent import BaseAgent


class ChatAgent(BaseAgent):
    """
    General-purpose financial AI assistant responsible for answering
    financial questions using conversation history and user context.
    """

    def __init__(self) -> None:
        super().__init__(
            "financial_advisor.txt",
        )

    def generate_response(
        self,
        user_question: str,
        financial_context: dict,
        history: list[dict],
    ) -> str:

        messages = [
            self.system_message(),
        ]

        for item in history:

            if item["role"] == "user":
                messages.append(
                    HumanMessage(
                        content=item["content"],
                    )
                )

            elif item["role"] == "assistant":
                messages.append(
                    AIMessage(
                        content=item["content"],
                    )
                )

        messages.append(
    HumanMessage(
        content=f"""
Financial Context

{financial_context}

Current Question

{user_question}

IMPORTANT INSTRUCTIONS:

The financial context contains:

- Financial summary
- Budgets
- Recommendations
- Recent transactions
- Uploaded financial documents (if available)

Always use every section of the financial context together before answering.

If uploaded document information is available, combine it with recent transactions and financial summary to provide one complete answer.

Never ignore uploaded document information if it is present.

If one section is missing, continue using the remaining available sections.

Assume all monetary values are in Indian Rupees (INR).

Always display currency using ₹.

Never use $, USD or other currencies unless explicitly requested.

Use Indian number formatting.
""".strip(),
    )
)

        return self.invoke(messages)