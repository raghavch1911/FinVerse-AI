from langchain_core.documents import Document
from langchain_chroma import Chroma

from ai.rag.vector_store import VectorStore


class DocumentRetriever:
    """
    Retrieves the most relevant document chunks from the Chroma
    vector store while enforcing user-level document isolation.
    """

    DEFAULT_TOP_K = 5

    @classmethod
    def _get_vector_store(cls) -> Chroma:
        """
        Returns the shared Chroma vector store instance.
        """
        return VectorStore.get_store()

    @classmethod
    def retrieve(
        cls,
        query: str,
        user_id: int,
        k: int | None = None,
    ) -> list[Document]:
        """
        Retrieve the most relevant document chunks for a user.

        Args:
            query: User's search query.
            user_id: Owner of the uploaded documents.
            k: Maximum number of results to return.

        Returns:
            A list of relevant document chunks.
        """
        k = k if k is not None and k > 0 else cls.DEFAULT_TOP_K

        return cls._get_vector_store().similarity_search(
            query=query,
            k=k,
            filter={
                "user_id": user_id,
            },
        )

    @classmethod
    def retrieve_by_document(
        cls,
        query: str,
        user_id: int,
        document_id: str,
        k: int | None = None,
    ) -> list[Document]:
        """
        Retrieve relevant chunks from a single uploaded document.

        Args:
            query: User's search query.
            user_id: Owner of the uploaded document.
            document_id: Unique document identifier.
            k: Maximum number of results to return.

        Returns:
            A list of relevant document chunks.
        """
        k = k if k is not None and k > 0 else cls.DEFAULT_TOP_K

        return cls._get_vector_store().similarity_search(
            query=query,
            k=k,
            filter={
                "user_id": user_id,
                "document_id": document_id,
            },
        )