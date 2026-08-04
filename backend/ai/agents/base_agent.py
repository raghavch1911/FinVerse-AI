from abc import ABC

from langchain_core.messages import BaseMessage, SystemMessage

from ai.llm.llm import LLMFactory
from ai.prompts.prompt_manager import PromptManager


class BaseAgent(ABC):
    """
    Base class for all AI agents in FinVerse AI.

    Responsibilities:
    - Load the system prompt.
    - Initialize the configured LLM.
    - Provide a reusable system message.
    - Execute LLM invocations.
    """

    def __init__(
        self,
        prompt_file: str,
    ) -> None:

        self.llm = LLMFactory.get_llm()

        self.system_prompt = PromptManager.load_prompt(
            prompt_file,
        )

    def system_message(self) -> SystemMessage:
        """
        Return the agent's system prompt as a LangChain SystemMessage.
        """

        return SystemMessage(
            content=self.system_prompt,
        )

    def invoke(
        self,
        messages: list[BaseMessage],
    ) -> str:
        """
        Invoke the language model and return the generated text.
        """

        response = self.llm.invoke(messages)

        return str(response.content)