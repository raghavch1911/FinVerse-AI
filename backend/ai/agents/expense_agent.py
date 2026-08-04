from langchain_core.messages import HumanMessage

from ai.agents.base_agent import BaseAgent


class ExpenseAgent(BaseAgent):
    """
    AI agent responsible for analyzing user expenses and
    providing personalized spending insights.
    """

    def __init__(self) -> None:
        super().__init__(
            "expense_advisor.txt",
        )

    def run(
        self,
        financial_context: dict,
    ) -> str:

        summary = financial_context.get(
            "summary",
            {},
        )

        top_expenses = financial_context.get(
            "top_expenses",
            [],
        )

        messages = [
            self.system_message(),
            HumanMessage(
                content=f"""
Financial Summary

{summary}

Top Expense Categories

{top_expenses}

Analyze the user's spending and:

1. Identify the highest spending categories.
2. Detect any unusual spending patterns.
3. Suggest realistic ways to reduce unnecessary expenses.
4. Recommend practical cost-saving strategies.
5. Mention categories that deserve closer attention.

Provide clear, personalized, and actionable financial advice.
""".strip(),
            ),
        ]

        return self.invoke(messages)