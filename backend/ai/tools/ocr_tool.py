import os

import fitz
import easyocr


class OCRTool:
    """
    Extract text from scanned PDFs and images.
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

    _reader = None

    @classmethod
    def get_reader(cls):
        if cls._reader is None:
            cls._reader = easyocr.Reader(
                ["en"],
                gpu=False,
            )
        return cls._reader

    @classmethod
    def extract_text(
        cls,
        file_path: str,
    ) -> str:

        extension = os.path.splitext(
            file_path
        )[1].lower()

        if extension in cls.SUPPORTED_PDF_TYPES:
            return cls._extract_pdf(file_path)

        if extension in cls.SUPPORTED_IMAGE_TYPES:
            return cls._extract_image(file_path)

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

        reader = cls.get_reader()

        results = reader.readtext(
            file_path,
            detail=0,
        )

        return "\n".join(results).strip()