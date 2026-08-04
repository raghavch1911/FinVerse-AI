from collections import defaultdict


class ConversationMemory:
    """
    In-memory conversation store for chat history.

    This implementation is intended for development and testing.
    It can later be replaced with Redis, PostgreSQL,
    LangGraph checkpoints, or another persistent storage backend.
    """

    _memory: dict[int, list[dict[str, str]]] = defaultdict(list)

    @classmethod
    def add_message(
        cls,
        user_id: int,
        role: str,
        content: str,
    ) -> None:
        cls._memory[user_id].append(
            {
                "role": role,
                "content": content,
            }
        )

    @classmethod
    def get_messages(
        cls,
        user_id: int,
    ) -> list[dict[str, str]]:
        return cls._memory[user_id].copy()

    @classmethod
    def clear(
        cls,
        user_id: int,
    ) -> None:
        cls._memory[user_id].clear()