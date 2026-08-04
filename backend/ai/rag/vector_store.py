from pathlib import Path

from langchain_chroma import Chroma

from ai.rag.embeddings import EmbeddingGenerator


class VectorStore:
    """
    Singleton wrapper responsible for managing the application's
    persistent Chroma vector store.
    """

    COLLECTION_NAME = "finverse_documents"
    PERSIST_DIRECTORY = Path("chroma_db").resolve().as_posix()

    _vector_store: Chroma | None = None

    @classmethod
    def get_store(cls) -> Chroma:
        """
        Returns the singleton Chroma vector store instance.
        Creates it on first access.
        """
        if cls._vector_store is None:
            cls._vector_store = Chroma(
                collection_name=cls.COLLECTION_NAME,
                embedding_function=EmbeddingGenerator.get_embeddings(),
                persist_directory=cls.PERSIST_DIRECTORY,
            )

        return cls._vector_store

    @classmethod
    def reload(cls) -> Chroma:
        """
        Recreates and returns the Chroma vector store.

        Useful during development, testing, or after rebuilding
        the vector database.
        """
        cls._vector_store = None
        return cls.get_store()