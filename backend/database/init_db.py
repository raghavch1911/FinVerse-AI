import models.budget
import models.category
import models.document
import models.profile
import models.transaction
import models.user

from database.base import Base
from database.connection import engine


def init_db():
    """
    Creates all database tables.
    """

    Base.metadata.create_all(
        bind=engine,
    )


if __name__ == "__main__":
    init_db()