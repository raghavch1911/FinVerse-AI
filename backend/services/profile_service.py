from sqlalchemy.orm import Session

from exceptions.custom_exceptions import (
    DuplicateResourceException,
    ResourceNotFoundException,
)
from models.profile import Profile
from models.user import User
from repositories.profile_repository import ProfileRepository
from schemas.profile_schema import (
    ProfileCreate,
    ProfileUpdate,
)


class ProfileService:
    """
    Handles profile-related business logic.
    """

    @staticmethod
    def create_profile(
        db: Session,
        current_user: User,
        profile_data: ProfileCreate,
    ) -> Profile:

        existing_profile = ProfileRepository.get_by_user_id(
            db,
            current_user.id,
        )

        if existing_profile:
            raise DuplicateResourceException(
                "Profile already exists."
            )

        profile = Profile(
            user_id=current_user.id,
            phone=profile_data.phone,
            date_of_birth=profile_data.date_of_birth,
            currency=profile_data.currency,
            monthly_income=profile_data.monthly_income,
            financial_goal=profile_data.financial_goal,
        )

        return ProfileRepository.create(
            db,
            profile,
        )

    @staticmethod
    def get_profile(
        db: Session,
        current_user: User,
    ) -> Profile:

        profile = ProfileRepository.get_by_user_id(
            db,
            current_user.id,
        )

        if profile is None:
            raise ResourceNotFoundException(
                "Profile not found."
            )

        return profile

    @staticmethod
    def update_profile(
        db: Session,
        current_user: User,
        profile_data: ProfileUpdate,
    ) -> Profile:

        profile = ProfileRepository.get_by_user_id(
            db,
            current_user.id,
        )

        if profile is None:
            raise ResourceNotFoundException(
                "Profile not found."
            )

        update_data = profile_data.model_dump(
            exclude_unset=True,
        )

        for key, value in update_data.items():
            setattr(profile, key, value)

        return ProfileRepository.update(
            db,
            profile,
        )