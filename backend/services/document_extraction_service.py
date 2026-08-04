import json

from ai.agents.document_extraction_agent import (
    DocumentExtractionAgent,
)


class DocumentExtractionService:
    """
    Converts OCR text into structured financial data.
    """

    agent = DocumentExtractionAgent()

    @classmethod
    def extract(
        cls,
        document_text: str,
    ) -> dict:

        response = cls.agent.run(document_text)

        try:

            cleaned = response.strip()

            if cleaned.startswith("```"):

                first_newline = cleaned.find("\n")

                if first_newline != -1:
                    cleaned = cleaned[first_newline + 1 :]

            if cleaned.endswith("```"):
                cleaned = cleaned[:-3]

            cleaned = cleaned.strip()

            data = json.loads(cleaned)

            # ------------------------------------
            # Bank Statement (Multiple Transactions)
            # ------------------------------------

            if (
                data.get("document_type") == "Bank Statement"
                and "transactions" in data
            ):

                result = {

                    "merchant": "Multiple",

                    "amount": "",

                    "date": "",

                    "category": "Multiple",

                    "payment_method": "",

                    "document_type": "Bank Statement",

                    "confidence": data.get(
                        "confidence",
                        "High",
                    ),

                    "transactions": data.get(
                        "transactions",
                        [],
                    ),
                }

                print("\n========== BANK STATEMENT ==========")
                print(result)
                print("====================================\n")

                return result

            # ------------------------------------
            # Single Transaction Document
            # ------------------------------------

            result = {

                "merchant": data.get(
                    "merchant",
                    "Unknown",
                ),

                "amount": data.get(
                    "amount",
                    "Unknown",
                ),

                "date": data.get(
                    "date",
                    "Unknown",
                ),

                "category": data.get(
                    "category",
                    "Unknown",
                ),

                "payment_method": data.get(
                    "payment_method",
                    "Unknown",
                ),

                "type": data.get(
                    "type",
                    "EXPENSE",
                ),

                "document_type": data.get(
                    "document_type",
                    "Other",
                ),

                "confidence": data.get(
                    "confidence",
                    "Unknown",
                ),

            }

            print("\n========== AI EXTRACTION ==========")
            print(result)
            print("===================================\n")

            return result

        except Exception as error:

            print("\nJSON Parsing Error")
            print(error)

            print(response)

            return {

                "merchant": "Unknown",

                "amount": "Unknown",

                "date": "Unknown",

                "category": "Unknown",

                "payment_method": "Unknown",

                "type": "EXPENSE",

                "document_type": "Other",

                "confidence": "Low",

                "transactions": [],

            }

    @staticmethod
    def is_bank_statement(
        extracted_data: dict,
    ) -> bool:
        """
        Determine whether the uploaded document
        is a bank statement.
        """

        return (
            extracted_data.get(
                "document_type",
                "",
            ).lower()
            == "bank statement"
        )