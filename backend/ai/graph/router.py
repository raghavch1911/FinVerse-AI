class IntentRouter:
    """
    Routes user requests to the appropriate AI agent using
    lightweight keyword-based intent detection.
    """

    ROUTES = {
        "document": [
            # General
            "document",
            "documents",
            "pdf",
            "file",
            "upload",
            "uploaded",

            # Resume / CV
            "resume",
            "cv",
            "curriculum vitae",

            # Banking & Financial Documents
            "bank statement",
            "statement",
            "invoice",
            "receipt",
            "salary slip",
            "passbook",
            "balance sheet",
            "financial statement",
            "report card",

            # Document Operations
            "extract",
            "read",
            "summarize",
            "summary",
            "analyze",
            "explain",
            "review",
            "tell me about",
            "what is in",
            "what does",
            "show me",
            "find in",
            "search document",
            "search pdf",
            "summarize document",
            "summarize pdf",
            "summarize resume",
            "summarize cv",
            "analyze document",
            "analyze pdf",
            "analyze resume",
        ],

        "budget": [
            "budget",
            "overspend",
            "overspending",
            "limit",
            "saving",
            "savings",
            "budget limit",
            "monthly budget",
        ],

        "expense": [
            "expense",
            "expenses",
            "spent",
            "spending",
            "transaction",
            "transactions",
            "cost",
            "costs",
            "purchase",
            "payment",
        ],

        "report": [
            "report",
            "monthly report",
            "annual report",
            "financial report",
        ],

        "planner": [
            "plan",
            "goal",
            "future",
            "investment",
            "invest",
            "financial plan",
            "retirement",
            "wealth",
            "portfolio",
        ],
    }

    @classmethod
    def route(cls, state) -> str:
        """
        Determine the most appropriate intent for the user's message.
        """

        message = state["user_message"].lower().strip()

        for intent, keywords in cls.ROUTES.items():
            for keyword in keywords:
                if keyword in message:
                    return intent

        return "chat"