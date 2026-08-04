from datetime import date, datetime

from pydantic import (
    BaseModel,
    ConfigDict,
    Field,
    field_validator,
)


class TransactionCreate(BaseModel):
    category_id: int

    type: str = Field(
        ...,
        pattern="^(INCOME|EXPENSE)$",
    )

    title: str = Field(
        ...,
        min_length=2,
        max_length=150,
    )

    description: str | None = Field(
        default=None,
        max_length=500,
    )

    amount: float = Field(
        ...,
        gt=0,
    )

    transaction_date: date

    @field_validator("type", mode="before")
    @classmethod
    def normalize_type(cls, value: str) -> str:
        if isinstance(value, str):
            return value.strip().upper()
        return value


class TransactionUpdate(BaseModel):
    category_id: int | None = None

    type: str | None = Field(
        default=None,
        pattern="^(INCOME|EXPENSE)$",
    )

    title: str | None = Field(
        default=None,
        min_length=2,
        max_length=150,
    )

    description: str | None = Field(
        default=None,
        max_length=500,
    )

    amount: float | None = Field(
        default=None,
        gt=0,
    )

    transaction_date: date | None = None

    @field_validator("type", mode="before")
    @classmethod
    def normalize_type(cls, value):
        if value is None:
            return value

        if isinstance(value, str):
            return value.strip().upper()

        return value


class TransactionResponse(BaseModel):
    id: int
    user_id: int
    category_id: int

    type: str
    title: str
    description: str | None

    amount: float
    transaction_date: date

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )


class TransactionSummary(BaseModel):
    total_income: float
    total_expense: float
    balance: float


class TransactionListResponse(BaseModel):
    items: list[TransactionResponse]

    page: int
    page_size: int

    total_records: int
    total_pages: int

    has_next: bool
    has_previous: bool

    summary: TransactionSummary