import os

from dotenv import load_dotenv
from langchain_core.language_models.chat_models import BaseChatModel
from langchain_groq import ChatGroq
from langchain_openai import ChatOpenAI

load_dotenv()


class LLMFactory:
    """
    Factory responsible for creating and returning the configured
    Large Language Model (LLM) instance.

    Supported providers:
    - Groq
    - OpenAI
    """

    @staticmethod
    def get_llm() -> BaseChatModel:

        provider = os.getenv(
            "LLM_PROVIDER",
            "groq",
        ).lower()

        if provider == "groq":
            return ChatGroq(
                model=os.getenv(
                    "GROQ_MODEL",
                    "llama-3.3-70b-versatile",
                ),
                api_key=os.getenv("GROQ_API_KEY"),
                temperature=0.2,
            )

        if provider == "openai":
            return ChatOpenAI(
                model=os.getenv(
                    "OPENAI_MODEL",
                    "gpt-4.1-mini",
                ),
                api_key=os.getenv("OPENAI_API_KEY"),
                temperature=0.2,
            )

        raise ValueError(
            f"Unsupported LLM provider: {provider}"
        )