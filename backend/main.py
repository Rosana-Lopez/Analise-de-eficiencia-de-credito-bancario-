from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import dashboard, chatbot
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="API - Eficiência Operacional de Crédito",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard.router)
app.include_router(chatbot.router)

@app.get("/")
def root():
    return {"status": "online"}