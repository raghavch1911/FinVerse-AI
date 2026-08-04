from ai.rag.retriever import DocumentRetriever


class DocumentTool:
    """
    Retrieves and formats relevant document context for
    AI agents using the RAG pipeline.
    """

    @staticmethod
    def execute(
        question: str,
        user_id: int,
    ) -> str:
        """
        Retrieve relevant document chunks for a user's question
        and format them into a single context string.

        Args:
            question: User's question.
            user_id: Owner of the uploaded documents.

        Returns:
            A formatted context string containing the retrieved
            document content. Returns an empty string if no
            relevant documents are found.
        """
        documents = DocumentRetriever.retrieve(
            query=question,
            user_id=user_id,
        )

        if not documents:
            return ""

        formatted_chunks: list[str] = []

        for document in documents:
            document_name = document.metadata.get(
                "document_name",
                "Unknown Document",
            )

            formatted_chunks.append(
                f"[{document_name}]\n{document.page_content}"
            )

        return "\n\n".join(formatted_chunks)