from pathlib import Path

import pandas as pd
from pypdf import PdfReader


class DocumentLoader:
    """
    Loads supported document formats and extracts their textual content
    for indexing in the RAG pipeline.
    """

    @staticmethod
    def load(file_path: str) -> str:
        path = Path(file_path)
        suffix = path.suffix.lower()

        if suffix == ".pdf":
            return DocumentLoader._load_pdf(path)

        if suffix == ".csv":
            return DocumentLoader._load_csv(path)

        if suffix in (".xlsx", ".xls"):
            return DocumentLoader._load_excel(path)

        if suffix == ".txt":
            return path.read_text(
                encoding="utf-8",
                errors="ignore",
            ).strip()

        raise ValueError(
            f"Unsupported file format: {suffix}"
        )

    @staticmethod
    def _load_pdf(path: Path) -> str:
        reader = PdfReader(path)

        pages = []

        for page in reader.pages:
            text = page.extract_text()

            if text:
                pages.append(text.strip())

        return "\n".join(pages)

    @staticmethod
    def _load_csv(path: Path) -> str:
        dataframe = pd.read_csv(path)

        return DocumentLoader._table_to_text(
            dataframe
        )

    @staticmethod
    def _load_excel(path: Path) -> str:
        dataframe = pd.read_excel(path)

        return DocumentLoader._table_to_text(
            dataframe
        )

    @staticmethod
    def _table_to_text(
        dataframe: pd.DataFrame,
    ) -> str:
        """
        Convert a dataframe into a structured text
        representation while preserving every row.
        """

        dataframe = dataframe.fillna("")

        lines = []

        headers = list(dataframe.columns)

        for index, row in dataframe.iterrows():

            lines.append(
                f"Transaction {index + 1}"
            )

            for column in headers:
                lines.append(
                    f"{column}: {row[column]}"
                )

            lines.append("")

        return "\n".join(lines)