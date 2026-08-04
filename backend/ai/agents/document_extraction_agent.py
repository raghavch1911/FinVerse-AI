from langchain_core.messages import HumanMessage

from ai.agents.base_agent import BaseAgent


class DocumentExtractionAgent(BaseAgent):
    """
    Extract structured financial information
    from OCR text.
    """

    def __init__(self):
        super().__init__(
            "document_extractor.txt",
        )

    def run(
        self,
        document_text: str,
    ) -> str:

        messages = [
            self.system_message(),
            HumanMessage(
    content=f"""
Extract financial information from the following document.

DOCUMENT

{document_text}

IMPORTANT RULES

1. Return ONLY valid JSON.
2. No markdown.
3. No explanations.
4. No ``` blocks.
5. Amounts must be numeric only.
6. Dates should be DD-MM-YYYY whenever possible.
7. Confidence must be High, Medium or Low.

DOCUMENT TYPE

Choose ONE:

- Bank Statement
- Receipt
- Invoice
- Salary Slip
- Tax Document
- Investment Report
- Other

If the document contains multiple transactions,
credits, debits, withdrawals, deposits,
or bank account history,

document_type MUST be:

Bank Statement

------------------------------------------------

TRANSACTION TYPE

Determine correctly.

Credit
Deposit
Salary
Interest
Refund
Cashback

=

INCOME

Debit
Withdrawal
Purchase
Bill
UPI Payment
Card Payment
Transfer Sent

=

EXPENSE

------------------------------------------------

CATEGORY

Choose ONE

Salary
Groceries
Shopping
Transport
Utilities
Entertainment
Travel
Rent
Investment
Insurance
Healthcare
Education
Food
Transfer
Interest
Cash
Other

------------------------------------------------

IF THERE IS ONLY ONE TRANSACTION

Return

{{
    "merchant":"",
    "amount":"",
    "date":"",
    "category":"",
    "type":"",
    "payment_method":"",
    "document_type":"",
    "confidence":""
}}

------------------------------------------------

IF THERE ARE MULTIPLE TRANSACTIONS

Return

{{
    "document_type":"Bank Statement",
    "confidence":"High",
    "transactions":[
        {{
            "title":"",
            "amount":0,
            "date":"",
            "type":"INCOME",
            "category":"Salary"
        }}
    ]
}}

Include EVERY transaction found.

Never invent transactions.

Return ONLY JSON.
""".strip(),
),
        ]

        return self.invoke(messages)