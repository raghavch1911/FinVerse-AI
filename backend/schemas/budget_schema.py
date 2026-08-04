from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


# -------------------------
# Create
# -------------------------

class BudgetCreate(BaseModel):
    category_id: int

    amount: float = Field(
        gt=0,
        description="Budget amount",
    )

    month: int = Field(
        ge=1,
        le=12,
    )

    year: int = Field(
        ge=2024,
    )

    alert_percentage: float = Field(
        default=80,
        ge=1,
        le=100,
    )


# -------------------------
# Update
# -------------------------

class BudgetUpdate(BaseModel):
    amount: float | None = Field(
        default=None,
        gt=0,
    )

    month: int | None = Field(
        default=None,
        ge=1,
        le=12,
    )

    year: int | None = Field(
        default=None,
        ge=2024,
    )

    alert_percentage: float | None = Field(
        default=None,
        ge=1,
        le=100,
    )

    is_active: bool | None = None


# -------------------------
# Response
# -------------------------

class BudgetResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int
    category_id: int
    category: str
    amount: float

    month: int
    year: int

    alert_percentage: float
    is_active: bool

    created_at: datetime
    updated_at: datetime

    # ---------- Calculated ----------

    spent: float = 0.0
    remaining: float = 0.0
    utilization_percentage: float = 0.0
    status: str = "SAFE"


# -------------------------
# List Response
# -------------------------

class BudgetListResponse(BaseModel):
    items: list[BudgetResponse]

    page: int
    page_size: int

    total_records: int
    total_pages: int

    has_next: bool
    has_previous: bool