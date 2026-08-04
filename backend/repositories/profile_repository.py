from sqlalchemy.orm import Session

from models.profile import Profile


class ProfileRepository:
    """
    Handles database operations for user profiles.
    """

    @staticmethod
    def get_by_user_id(
        db: Session,
        user_id: int,
    ) -> Profile | None:
        return (
            db.query(Profile)
            .filter(Profile.user_id == user_id)
            .first()
        )

    @staticmethod
    def create(
        db: Session,
        profile: Profile,
    ) -> Profile:
        db.add(profile)
        db.commit()
        db.refresh(profile)
        return profile

    @staticmethod
    def update(
        db: Session,
        profile: Profile,
    ) -> Profile:
        db.commit()
        db.refresh(profile)
        return profile