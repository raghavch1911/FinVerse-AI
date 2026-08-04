import logging
import os
import time
from collections.abc import Callable

from fastapi import Request
from starlette.responses import Response

# Create logs directory if it doesn't exist.
os.makedirs("logs", exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
    handlers=[
        logging.FileHandler("logs/app.log"),
        logging.StreamHandler(),
    ],
)

logger = logging.getLogger("finverse")


async def logging_middleware(
    request: Request,
    call_next: Callable,
) -> Response:
    """
    Log every incoming request along with its response status
    and processing time.
    """
    start_time = time.perf_counter()

    response = await call_next(request)

    process_time = (time.perf_counter() - start_time) * 1000

    logger.info(
        "%s %s %s %.2f ms",
        request.method,
        request.url.path,
        response.status_code,
        process_time,
    )

    return response