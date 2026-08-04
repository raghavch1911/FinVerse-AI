from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class CategoryCreate(BaseModel):
    name: str = Field(
        ...,
        min_length=2,
        max_length=100,
    )
    type: str = Field(
        ...,
        pattern="^(INCOME|EXPENSE)$",
    )


class CategoryResponse(BaseModel):
    id: int
    user_id: int
    name: str
    type: str
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )