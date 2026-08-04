import os

import fitz  # PyMuPDF
import easyocr


class OCRTool:
    """
    Extract text from scanned PDFs and images.

    Unsupported file types are skipped so the normal
    DocumentLoader can handle them.
    """

    SUPPORTED_IMAGE_TYPES = {
        ".png",
        ".jpg",
        ".jpeg",
        ".bmp",
        ".tiff",
    }

    SUPPORTED_PDF_TYPES = {
        ".pdf",
    }

    reader = easyocr.Reader(
        ["en"],
        gpu=False,
    )

    @classmethod
    def extract_text(
        cls,
        file_path: str,
    ) -> str:

        extension = os.path.splitext(
            file_path
        )[1].lower()

        # PDF
        if extension in cls.SUPPORTED_PDF_TYPES:
            return cls._extract_pdf(file_path)

        # Images
        if extension in cls.SUPPORTED_IMAGE_TYPES:
            return cls._extract_image(file_path)

        # TXT / DOCX / XLSX / CSV etc.
        # Let DocumentLoader handle them.
        return ""

    @staticmethod
    def _extract_pdf(
        file_path: str,
    ) -> str:

        document = fitz.open(file_path)

        text = ""

        try:
            for page in document:
                text += page.get_text()

        finally:
            document.close()

        return text.strip()

    @classmethod
    def _extract_image(
        cls,
        file_path: str,
    ) -> str:

        results = cls.reader.readtext(
            file_path,
            detail=0,
        )

        return "\n".join(results).strip()