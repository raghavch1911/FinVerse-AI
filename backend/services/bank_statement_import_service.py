import pandas as pd

from sqlalchemy.orm import Session

from models.transaction import Transaction
from repositories.category_repository import CategoryRepository
from repositories.transaction_repository import (
    TransactionRepository,
)
from models.category import Category

class BankStatementImportService:
    """
    Imports bank statements (CSV/XLSX)
    and converts every row into transactions.
    """

    CATEGORY_KEYWORDS = {

    # --------------------------
    # INCOME
    # --------------------------

    "Salary": [
        "salary",
        "salary credit",
        "payroll",
        "employer",
        "salary cr",
        "salary credited",
    ],

    "Investment": [
        "interest",
        "fd interest",
        "bank interest",
        "mutual fund",
        "sip",
        "stocks",
        "groww",
        "zerodha",
        "upstox",
        "dividend",
    ],

    "Transfer": [
        "upi received",
        "received from",
        "imps credit",
        "neft credit",
        "rtgs credit",
        "bank transfer",
        "transfer received",
    ],

    # --------------------------
    # EXPENSES
    # --------------------------

    "Food": [
        "restaurant",
        "cafe",
        "coffee",
        "starbucks",
        "third wave",
        "dominos",
        "pizza hut",
        "kfc",
        "mcdonald",
        "zomato",
        "swiggy",
    ],

    "Groceries": [
        "blinkit",
        "zepto",
        "instamart",
        "bigbasket",
        "dmart",
        "grofers",
        "reliance fresh",
    ],

    "Shopping": [
        "amazon",
        "flipkart",
        "myntra",
        "ajio",
        "nykaa",
        "meesho",
        "trends",
    ],

    "Transport": [
        "uber",
        "ola",
        "rapido",
        "metro",
        "fuel",
        "petrol",
        "diesel",
        "indian oil",
        "ioc",
        "bharat petroleum",
        "hp",
    ],

    "Bills & Utilities": [
        "electricity",
        "electricity bill",
        "water",
        "water bill",
        "gas",
        "gas bill",
        "wifi",
        "internet",
        "broadband",
        "airtel",
        "jio",
        "bsnl",
        "mobile recharge",
        "phone bill",
    ],

    "Entertainment": [
        "netflix",
        "spotify",
        "prime",
        "amazon prime",
        "hotstar",
        "sony liv",
        "zee5",
    ],

    "Travel": [
        "flight",
        "hotel",
        "oyo",
        "irctc",
        "goibibo",
        "makemytrip",
    ],

    "Rent": [
        "rent",
        "house rent",
        "flat rent",
    ],

    "Cash": [
        "atm",
        "cash withdrawal",
        "withdrawal",
    ],
}

    @staticmethod
    def clean_amount(value) -> float:

        if value is None:
            return 0

        value = (
            str(value)
            .replace(",", "")
            .replace("₹", "")
            .replace("INR", "")
            .strip()
        )

        if value == "":
            return 0

        try:
            return abs(float(value))
        except Exception:
            return 0

    @staticmethod
    def detect_columns(
        dataframe: pd.DataFrame,
    ) -> dict:
        """
        Detect important columns from
        different bank statement formats.
        """

        columns = {}

        for column in dataframe.columns:

            name = str(column).strip().lower()

            if any(
                keyword in name
                for keyword in [
                    "date",
                    "txn date",
                    "transaction date",
                    "value date",
                ]
            ):
                columns["date"] = column

            elif any(
                keyword in name
                for keyword in [
                    "description",
                    "narration",
                    "remarks",
                    "details",
                    "particular",
                    "particulars",
                ]
            ):
                columns["description"] = column

            elif "debit" in name:
                columns["debit"] = column

            elif "withdraw" in name:
                columns["debit"] = column

            elif "credit" in name:
                columns["credit"] = column

            elif "deposit" in name:
                columns["credit"] = column

            elif "amount" in name:
                columns["amount"] = column

            elif "balance" in name:
                columns["balance"] = column

            elif "type" == name:
                columns["type"] = column

        return columns

    @staticmethod
    def detect_category(
    description: str,
    transaction_type: str,
) -> str:

        description = (
            str(description)
            .lower()
            .strip()
        )

        for (
            category,
            keywords,
        ) in (
            BankStatementImportService
            .CATEGORY_KEYWORDS.items()
        ):

            for keyword in keywords:

                if keyword in description:
                    return category

        if transaction_type == "INCOME":
            return "Transfer"

        return "Miscellaneous"

    @staticmethod
    def preview_transactions(
        file_path: str,
    ) -> list[dict]:

        if file_path.lower().endswith(".csv"):
            dataframe = pd.read_csv(file_path)
        else:
            dataframe = pd.read_excel(file_path)

        dataframe = dataframe.fillna("")

        columns = (
            BankStatementImportService.detect_columns(
                dataframe
            )
        )

        required = [
            "date",
            "description",
        ]

        for column in required:

            if column not in columns:

                raise ValueError(
                    f"Missing required column: {column}"
                )

        preview = []

        for _, row in dataframe.iterrows():

            try:

                description = str(
                    row[
                        columns["description"]
                    ]
                ).strip()

                if description == "":
                    continue

                debit_amount = 0
                credit_amount = 0

                if "debit" in columns:
                    debit_amount = BankStatementImportService.clean_amount(
                        row[columns["debit"]]
                    )

                if "credit" in columns:
                    credit_amount = BankStatementImportService.clean_amount(
                        row[columns["credit"]]
                    )

                if credit_amount > 0:

                    amount = credit_amount
                    transaction_type = "INCOME"

                elif debit_amount > 0:

                    amount = debit_amount
                    transaction_type = "EXPENSE"

                elif "amount" in columns:

                    amount = BankStatementImportService.clean_amount(
                        row[columns["amount"]]
                    )

                    if "type" in columns:

                        transaction_type = str(
                            row[columns["type"]]
                        ).strip().upper()

                        if transaction_type == "CREDIT":
                            transaction_type = "INCOME"
                        else:
                            transaction_type = "EXPENSE"

                    else:

                        transaction_type = "EXPENSE"

                else:
                    continue
                if amount is None:
                    continue

                preview.append({

                    "date": str(
                        pd.to_datetime(
                            row[
                                columns["date"]
                            ]
                        ).date()
                    ),

                    "title": description[:150],

                    "amount": amount,

                    "type": transaction_type,

                    "category":
                        BankStatementImportService.detect_category(
                            description,
        transaction_type,
                        ),

                })

            except Exception as error:

                print(error)

                continue

        return preview

    @staticmethod
    def import_file(
        db: Session,
        user_id: int,
        file_path: str,
    ) -> dict:

        preview = BankStatementImportService.preview_transactions(
            file_path
        )

        print("\n========== IMPORT PREVIEW ==========")

        for transaction in preview:
            print(transaction)

        print("TOTAL TRANSACTIONS:", len(preview))

        print("===================================\n")

        transactions = []

        imported = 0

        skipped = 0

        for item in preview:

            print(
    item["title"],
    item["type"],
    item["category"]
)

            category = CategoryRepository.get_by_name(
                db=db,
                name=item["category"],
                category_type=item["type"],
                user_id=user_id,
            )

            if category is None:

                category = CategoryRepository.create(

                    db=db,

                    category=Category(

                        user_id=user_id,

                        name=item["category"],

                        type=item["type"],

                    ),

                )

            print(
    "CATEGORY ->",
    category.name,
    category.type,
    category.id,
)

            transactions.append(

                Transaction(

                    user_id=user_id,

                    category_id=category.id,

                    type=item["type"],

                    title=item["title"][:150],

                    description=item["title"],

                    amount=item["amount"],

                    transaction_date=pd.to_datetime(
                        item["date"]
                    ).date(),

                )

            )

            imported += 1

        if transactions:
            print(
    "Transactions to save:",
    len(transactions)
)

            TransactionRepository.bulk_create(
                db=db,
                transactions=transactions,
            )

        return {

            "imported": imported,

            "skipped": skipped,

            "transactions": len(
                transactions
            ),

        }