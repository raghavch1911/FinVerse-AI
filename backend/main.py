from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from exceptions.exception_handlers import register_exception_handlers
from middleware.logging_middleware import logging_middleware

from routers.auth import router as auth_router
from routers.profile import router as profile_router
from routers.category import router as category_router
from routers.transaction import router as transaction_router
from routers.dashboard import router as dashboard_router
from routers.budget import router as budget_router
from routers.insights import router as insights_router
from routers.chat import router as chat_router
from routers.document_routes import router as document_router
from routers.report import router as report_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application startup and shutdown events.

    Use this lifecycle hook for future initialization such as:
    - ChromaDB
    - Redis
    - Background workers
    - AI model warm-up
    """
    print("🚀 Starting FinVerse AI...")

    yield

    print("🛑 Shutting down FinVerse AI...")


app = FastAPI(
    title="FinVerse AI",
    version="1.0.0",
    description="AI-Powered Personal Finance Management API",
    lifespan=lifespan,
)

# ---------------------------------------------------------
# CORS Configuration
# ---------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",

        "https://fin-verse-ai-ao8y.vercel.app",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------
# Global Exception Handlers
# ---------------------------------------------------------

register_exception_handlers(app)

# ---------------------------------------------------------
# Logging Middleware
# ---------------------------------------------------------

app.middleware("http")(logging_middleware)

# ---------------------------------------------------------
# API Routers
# ---------------------------------------------------------

app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(category_router)
app.include_router(transaction_router)
app.include_router(dashboard_router)
app.include_router(budget_router)
app.include_router(insights_router)
app.include_router(chat_router)
app.include_router(document_router)
app.include_router(report_router)

# ---------------------------------------------------------
# System Endpoints
# ---------------------------------------------------------

@app.get("/", tags=["System"])
def home() -> dict:
    """
    Root endpoint.
    """
    return {
        "message": "Welcome to FinVerse AI 🚀",
        "application": "FinVerse AI",
        "version": "1.0.0",
        "status": "Running",
        "docs": "/docs",
        "health": "/health",
    }


@app.get("/health", tags=["System"])
def health() -> dict:
    """
    Health check endpoint.
    """
    return {
        "status": "Running",
        "application": "FinVerse AI",
        "version": "1.0.0",
    }