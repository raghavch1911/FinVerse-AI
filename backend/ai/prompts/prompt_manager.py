from pathlib import Path


class PromptManager:
    """
    Loads prompt templates from the prompts directory.
    """

    BASE_DIR = Path(__file__).resolve().parent

    @staticmethod
    def load_prompt(filename: str) -> str:
        """
        Load and return the contents of a prompt template.

        Args:
            filename: Name of the prompt file.

        Returns:
            The prompt template as a string.

        Raises:
            FileNotFoundError: If the prompt file does not exist.
        """

        prompt_path = PromptManager.BASE_DIR / filename

        if not prompt_path.is_file():
            raise FileNotFoundError(
                f"Prompt file not found: {filename}"
            )

        return prompt_path.read_text(
            encoding="utf-8",
        )