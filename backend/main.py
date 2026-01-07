from fastapi import FastAPI
from pydantic import BaseModel
import joblib

from ml_engine import score_credit

app = FastAPI(
    title="CreditBridge ML Engine",
    version="1.0"
)

# =========================
# Load model ONCE
# =========================
model = joblib.load("creditbridge_lgbm_model.pkl")

# =========================
# Input schema
# =========================
class CreditInput(BaseModel):
    avg_daily_income: float
    income_std_dev: float
    active_days_ratio: float
    max_income_gap: int
    tenure_months: int
    income_trend: float

# =========================
# Health check
# =========================
@app.get("/")
def root():
    return {"status": "CreditBridge ML Engine running"}

# =========================
# API Endpoint
# =========================
@app.post("/score")
def score(data: CreditInput):
    result = score_credit(data.dict(), model)
    return {"score": result}
