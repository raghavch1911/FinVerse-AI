from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field


class ProfileCreate(BaseModel):
    phone: str | None = Field(
        default=None,
        max_length=20,
    )
    date_of_birth: date | None = None
    currency: str = Field(
        default="INR",
        max_length=10,
    )
    monthly_income: float = Field(
        default=0.0,
        ge=0,
    )
    financial_goal: str | None = Field(
        default=None,
        max_length=255,
    )


class ProfileUpdate(BaseModel):
    phone: str | None = Field(
        default=None,
        max_length=20,
    )
    date_of_birth: date | None = None
    currency: str | None = Field(
        default=None,
        max_length=10,
    )
    monthly_income: float | None = Field(
        default=None,
        ge=0,
    )
    financial_goal: str | None = Field(
        default=None,
        max_length=255,
    )


class ProfileResponse(BaseModel):
    id: int
    user_id: int
    phone: str | None
    date_of_birth: date | None
    currency: str
    monthly_income: float
    financial_goal: str | None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )