from __future__ import annotations

import logging

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from exceptions.custom_exceptions import (
    BudgetExceededException,
    DuplicateResourceException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
)

logger = logging.getLogger(__name__)


def register_exception_handlers(app: FastAPI) -> None:
    """
    Register global exception handlers for the FinVerse API.
    """

    @app.exception_handler(ResourceNotFoundException)
    async def resource_not_found_handler(
        request: Request,
        exc: ResourceNotFoundException,
    ) -> JSONResponse:
        return JSONResponse(
            status_code=404,
            content={
                "success": False,
                "message": exc.message,
            },
        )

    @app.exception_handler(DuplicateResourceException)
    async def duplicate_resource_handler(
        request: Request,
        exc: DuplicateResourceException,
    ) -> JSONResponse:
        return JSONResponse(
            status_code=409,
            content={
                "success": False,
                "message": exc.message,
            },
        )

    @app.exception_handler(ValidationException)
    async def validation_exception_handler(
        request: Request,
        exc: ValidationException,
    ) -> JSONResponse:
        return JSONResponse(
            status_code=400,
            content={
                "success": False,
                "message": exc.message,
            },
        )

    @app.exception_handler(UnauthorizedException)
    async def unauthorized_handler(
        request: Request,
        exc: UnauthorizedException,
    ) -> JSONResponse:
        return JSONResponse(
            status_code=401,
            content={
                "success": False,
                "message": exc.message,
            },
        )

    @app.exception_handler(BudgetExceededException)
    async def budget_exception_handler(
        request: Request,
        exc: BudgetExceededException,
    ) -> JSONResponse:
        return JSONResponse(
            status_code=400,
            content={
                "success": False,
                "message": exc.message,
            },
        )

    @app.exception_handler(Exception)
    async def internal_server_error_handler(
        request: Request,
        exc: Exception,
    ) -> JSONResponse:
        logger.exception("Unhandled exception occurred", exc_info=exc)

        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": "Internal Server Error",
            },
        )