from langgraph.graph import END, StateGraph

from ai.agents.budget_agent import BudgetAgent
from ai.agents.chat_agent import ChatAgent
from ai.agents.document_agent import DocumentAgent
from ai.agents.expense_agent import ExpenseAgent
from ai.agents.planner_agent import PlannerAgent
from ai.agents.report_agent import ReportAgent
from ai.graph.router import IntentRouter
from ai.graph.state import FinancialAgentState


class FinancialWorkflow:
    """
    LangGraph workflow responsible for routing user requests
    to the appropriate specialized financial AI agent.
    """

    _workflow = None

    @classmethod
    def get_workflow(cls):
        if cls._workflow is None:
            cls._workflow = cls._build()

        return cls._workflow

    @staticmethod
    def _build():

        workflow = StateGraph(
            FinancialAgentState,
        )

        chat_agent = ChatAgent()
        budget_agent = BudgetAgent()
        expense_agent = ExpenseAgent()
        report_agent = ReportAgent()
        planner_agent = PlannerAgent()
        document_agent = DocumentAgent()

        VALID_INTENTS = {
            "chat",
            "budget",
            "expense",
            "report",
            "planner",
            "document",
        }

        def supervisor(state):

            intent = IntentRouter.route(state)

            if intent not in VALID_INTENTS:
                intent = "chat"

            state["intent"] = intent

            return state

        def chat_node(state):

            state["response"] = chat_agent.generate_response(
                user_question=state["user_message"],
                financial_context=state["financial_context"],
                history=state["history"],
            )

            return state

        def budget_node(state):

            state["response"] = budget_agent.run(
                state["financial_context"],
            )

            return state

        def expense_node(state):

            state["response"] = expense_agent.run(
                state["financial_context"],
            )

            return state

        def report_node(state):

            state["response"] = report_agent.run(
                state["financial_context"],
            )

            return state

        def planner_node(state):

            state["response"] = planner_agent.run(
                user_goal=state["user_message"],
                financial_context=state["financial_context"],
            )

            return state

        def document_node(state):

            state["response"] = document_agent.run(
                question=state["user_message"],
                user_id=state["user_id"],
            )

            return state

        workflow.add_node("supervisor", supervisor)
        workflow.add_node("chat", chat_node)
        workflow.add_node("budget", budget_node)
        workflow.add_node("expense", expense_node)
        workflow.add_node("report", report_node)
        workflow.add_node("planner", planner_node)
        workflow.add_node("document", document_node)

        workflow.set_entry_point(
            "supervisor",
        )

        workflow.add_conditional_edges(
            "supervisor",
            lambda state: state["intent"],
            {
                "chat": "chat",
                "budget": "budget",
                "expense": "expense",
                "report": "report",
                "planner": "planner",
                "document": "document",
            },
        )

        workflow.add_edge("chat", END)
        workflow.add_edge("budget", END)
        workflow.add_edge("expense", END)
        workflow.add_edge("report", END)
        workflow.add_edge("planner", END)
        workflow.add_edge("document", END)

        return workflow.compile()