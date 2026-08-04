from math import ceil

from sqlalchemy.orm import Session

from exceptions.custom_exceptions import (
    ResourceNotFoundException,
    ValidationException,
)
from models.budget import Budget
from models.user import User
from repositories.budget_repository import BudgetRepository
from schemas.budget_schema import (
    BudgetCreate,
    BudgetListResponse,
    BudgetResponse,
    BudgetUpdate,
)


class BudgetService:
    """
    Handles budget-related business logic.
    """

    @staticmethod
    def _build_budget_response(
        budget: Budget,
        spent: float,
    ) -> BudgetResponse:

        remaining = budget.amount - spent

        utilization = (
            (spent / budget.amount) * 100
            if budget.amount > 0
            else 0
        )

        if utilization < 50:
            status = "SAFE"
        elif utilization < 80:
            status = "NORMAL"
        elif utilization <= 100:
            status = "WARNING"
        else:
            status = "OVER_BUDGET"

        return BudgetResponse(
            id=budget.id,
            category_id=budget.category_id,
            category=budget.category.name,
            amount=budget.amount,
            month=budget.month,
            year=budget.year,
            alert_percentage=budget.alert_percentage,
            is_active=budget.is_active,
            created_at=budget.created_at,
            updated_at=budget.updated_at,
            spent=round(spent, 2),
            remaining=round(remaining, 2),
            utilization_percentage=round(utilization, 2),
            status=status,
        )

    @staticmethod
    def create_budget(
        db: Session,
        current_user: User,
        budget_data: BudgetCreate,
    ) -> BudgetResponse:

        category = BudgetRepository.get_category(
            db,
            budget_data.category_id,
            current_user.id,
        )

        if category is None:
            raise ValidationException(
                "Invalid category."
            )

        existing = BudgetRepository.get_existing_budget(
            db,
            current_user.id,
            budget_data.category_id,
            budget_data.month,
            budget_data.year,
        )

        if existing is not None:
            raise ValidationException(
                "Budget already exists for this category and month."
            )

        budget = Budget(
            user_id=current_user.id,
            category_id=budget_data.category_id,
            amount=budget_data.amount,
            month=budget_data.month,
            year=budget_data.year,
            alert_percentage=budget_data.alert_percentage,
        )

        created = BudgetRepository.create(
            db,
            budget,
        )

        return BudgetService._build_budget_response(
            created,
            0,
        )

    @staticmethod
    def get_budgets(
        db: Session,
        current_user: User,
        page: int = 1,
        page_size: int = 10,
    ) -> BudgetListResponse:

        budgets = BudgetRepository.get_all(
            db,
            current_user.id,
        )

        total_records = len(budgets)
        total_pages = max(
            1,
            ceil(total_records / page_size),
        )

        start = (page - 1) * page_size
        end = start + page_size

        paginated = budgets[start:end]

        items = []

        for budget in paginated:

            spent = BudgetRepository.get_spent_amount(
                db,
                current_user.id,
                budget.category_id,
                budget.month,
                budget.year,
            )

            items.append(
                BudgetService._build_budget_response(
                    budget,
                    spent,
                )
            )

        return BudgetListResponse(
            items=items,
            page=page,
            page_size=page_size,
            total_records=total_records,
            total_pages=total_pages,
            has_next=page < total_pages,
            has_previous=page > 1,
        )

    @staticmethod
    def get_budget(
        db: Session,
        current_user: User,
        budget_id: int,
    ) -> BudgetResponse:

        budget = BudgetRepository.get_by_id(
            db,
            budget_id,
            current_user.id,
        )

        if budget is None:
            raise ResourceNotFoundException(
                "Budget not found."
            )

        spent = BudgetRepository.get_spent_amount(
            db,
            current_user.id,
            budget.category_id,
            budget.month,
            budget.year,
        )

        return BudgetService._build_budget_response(
            budget,
            spent,
        )

    @staticmethod
    def update_budget(
        db: Session,
        current_user: User,
        budget_id: int,
        budget_data: BudgetUpdate,
    ) -> BudgetResponse:

        budget = BudgetRepository.get_by_id(
            db,
            budget_id,
            current_user.id,
        )

        if budget is None:
            raise ResourceNotFoundException(
                "Budget not found."
            )

        updates = budget_data.model_dump(
            exclude_unset=True,
        )

        for key, value in updates.items():
            setattr(budget, key, value)

        updated = BudgetRepository.update(
            db,
            budget,
        )

        spent = BudgetRepository.get_spent_amount(
            db,
            current_user.id,
            updated.category_id,
            updated.month,
            updated.year,
        )

        return BudgetService._build_budget_response(
            updated,
            spent,
        )

    @staticmethod
    def delete_budget(
        db: Session,
        current_user: User,
        budget_id: int,
    ) -> dict:

        budget = BudgetRepository.get_by_id(
            db,
            budget_id,
            current_user.id,
        )

        if budget is None:
            raise ResourceNotFoundException(
                "Budget not found."
            )

        BudgetRepository.delete(
            db,
            budget,
        )

        return {
            "message": "Budget deleted successfully."
        }