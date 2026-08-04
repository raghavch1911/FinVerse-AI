from langchain_core.messages import HumanMessage

from ai.agents.base_agent import BaseAgent


class PlannerAgent(BaseAgent):
    """
    AI agent responsible for creating personalized
    financial action plans based on the user's goals
    and current financial situation.
    """

    def __init__(self) -> None:
        super().__init__(
            "planner_advisor.txt",
        )

    def run(
        self,
        user_goal: str,
        financial_context: dict,
    ) -> str:

        messages = [
            self.system_message(),
            HumanMessage(
                content=f"""
User Goal

{user_goal}

Financial Context

{financial_context}

Create a personalized financial action plan.

Your plan should:

1. Be realistic and achievable.
2. Prioritize the most important actions.
3. Include short-term and long-term recommendations.
4. Consider the user's current financial situation.
5. Provide practical steps the user can follow.

Keep the advice clear and actionable.
""".strip(),
            ),
        ]

        return self.invoke(messages)