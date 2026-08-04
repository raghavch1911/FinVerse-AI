from langchain_core.messages import (
    HumanMessage,
)

from ai.agents.base_agent import BaseAgent


class ReportAgent(BaseAgent):
    """
    Specialized AI agent for generating
    financial reports and summaries.
    """

    def __init__(self):

        super().__init__(
            "report_advisor.txt"
        )

    def run(
        self,
        financial_context: dict,
    ) -> str:

        summary = financial_context.get(
            "summary",
            {},
        )

        budgets = financial_context.get(
            "budgets",
            [],
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

Budget Information

{budgets}

Top Expense Categories

{top_expenses}

Generate a professional financial report.

IMPORTANT:
- Assume every monetary value is in Indian Rupees (INR).
- Always use the ₹ symbol.
- Never use $ or USD.
- Format amounts using the Indian numbering system.

The report should include:

1. Overall financial summary.
2. Budget performance.
3. Major spending categories.
4. Financial risks.
5. Positive observations.
6. Actionable recommendations.

Keep the report concise, professional, and easy to understand.
"""
            ),
        ]

        return self.invoke(messages)