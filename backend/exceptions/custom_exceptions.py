class FinVerseException(Exception):
    """
    Base exception class for all custom FinVerse exceptions.
    """

    def __init__(self, message: str) -> None:
        """
        Initialize the exception with an error message.

        Args:
            message: Description of the error.
        """
        self.message = message
        super().__init__(message)


class ResourceNotFoundException(FinVerseException):
    """
    Raised when a requested resource cannot be found.
    """

    pass


class DuplicateResourceException(FinVerseException):
    """
    Raised when attempting to create a resource that already exists.
    """

    pass


class ValidationException(FinVerseException):
    """
    Raised when input validation fails.
    """

    pass


class UnauthorizedException(FinVerseException):
    """
    Raised when authentication or authorization fails.
    """

    pass


class BudgetExceededException(FinVerseException):
    """
    Raised when an operation exceeds the configured budget limit.
    """

    pass