from langchain_core.messages import HumanMessage

from ai.agents.base_agent import BaseAgent


class BudgetAgent(BaseAgent):
    """
    AI agent responsible for analyzing user budgets and
    providing personalized budgeting recommendations.
    """

    def __init__(self) -> None:
        super().__init__(
            "budget_advisor.txt",
        )

    def run(
        self,
        financial_context: dict,
    ) -> str:
        budgets = financial_context.get(
            "budgets",
            [],
        )

        messages = [
            self.system_message(),
            HumanMessage(
                content=f"""
Budget Information

{budgets}

Analyze the user's budgets and:

1. Identify overspending.
2. Highlight budgets close to their limits.
3. Suggest realistic saving opportunities.
4. Provide practical financial advice.
""".strip(),
            ),
        ]

        return self.invoke(messages)