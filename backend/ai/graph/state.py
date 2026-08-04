from typing import Any, TypedDict


class FinancialAgentState(TypedDict):
    """
    Shared state passed between all LangGraph nodes during
    the execution of the financial workflow.
    """

    user_id: int

    user_message: str

    financial_context: dict[str, Any]

    history: list[dict[str, str]]

    intent: str

    response: str