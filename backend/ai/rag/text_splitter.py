from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter


class TextSplitter:
    """
    Splits extracted document text into semantic chunks suitable
    for embedding and retrieval in the RAG pipeline.
    """

    def __init__(
        self,
        chunk_size: int = 1000,
        chunk_overlap: int = 200,
    ) -> None:
        """
        Initialize the recursive text splitter.

        Args:
            chunk_size: Maximum number of characters per chunk.
            chunk_overlap: Number of overlapping characters between chunks.
        """
        self.splitter: RecursiveCharacterTextSplitter = (
            RecursiveCharacterTextSplitter(
                chunk_size=chunk_size,
                chunk_overlap=chunk_overlap,
                separators=[
                    "\n\n",
                    "\n",
                    ". ",
                    ", ",
                    " ",
                    "",
                ],
            )
        )

    def split(self, text: str) -> list[Document]:
        """
        Split raw document text into LangChain Document chunks.

        Args:
            text: Extracted document text.

        Returns:
            A list of chunked LangChain Document objects.
        """
        return self.splitter.create_documents([text])