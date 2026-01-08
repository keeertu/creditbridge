from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List
import joblib
import tempfile
import pandas as pd

from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

from ml_engine import score_credit
from llm_explanation import generate_lender_explanation

# =========================
# App init
# =========================
app = FastAPI(
    title="CreditBridge ML Engine",
    version="1.0"
)

# =========================
# CORS
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# Load model ONCE
# =========================
model = joblib.load("creditbridge_lgbm_model.pkl")

# =========================
# Input schema (single scoring)
# =========================
class CreditInput(BaseModel):
    avg_daily_income: float
    income_std_dev: float
    active_days_ratio: float
    max_income_gap: int
    tenure_months: int
    income_trend: float

# =========================
# Export schemas
# =========================
class ScorePayload(BaseModel):
    credit_reliability_score: float
    risk_band: str
    key_reasons: List[str]
    suggestions: List[str]

class ExplanationPayload(BaseModel):
    lender: str
    user: str

class PDFExportPayload(BaseModel):
    score: ScorePayload
    explanations: ExplanationPayload

class BulkRecord(BaseModel):
    applicant_id: str
    credit_reliability_score: float
    risk_band: str
    key_reasons: List[str]

class XLSExportPayload(BaseModel):
    records: List[BulkRecord]

# =========================
# Health check
# =========================
@app.get("/")
def root():
    return {"status": "CreditBridge ML Engine running"}

# =========================
# SINGLE applicant scoring
# =========================
@app.post("/score")
def score(data: CreditInput):
    result = score_credit(data.dict(), model)

    lender_explanation = generate_lender_explanation(
        score=result["credit_reliability_score"],
        risk_band=result["risk_band"],
        reasons=result["key_reasons"],
    )

    return {
        "score": {
            "credit_reliability_score": result["credit_reliability_score"],
            "risk_band": result["risk_band"],
            "key_reasons": result["key_reasons"],
            "suggestions": result["suggestions"],
        },
        "explanations": {
            "lender": lender_explanation,
            "user": (
                "Your assessment is based on income stability, "
                "work consistency, and employment history."
            ),
        }
    }

# =========================
# BULK scoring (CSV / XLSX)
# =========================
@app.post("/score/bulk")
async def bulk_score(file: UploadFile = File(...)):
    if not file.filename.endswith((".csv", ".xlsx")):
        raise HTTPException(400, "Only CSV or XLSX files are supported.")

    try:
        df = (
            pd.read_csv(file.file)
            if file.filename.endswith(".csv")
            else pd.read_excel(file.file)
        )
    except Exception:
        raise HTTPException(400, "Unable to read uploaded file.")

    required_columns = [
        "avg_daily_income",
        "income_std_dev",
        "active_days_ratio",
        "max_income_gap",
        "tenure_months",
        "income_trend",
    ]

    missing = [c for c in required_columns if c not in df.columns]
    if missing:
        raise HTTPException(400, f"Missing required columns: {missing}")

    results = []

    for idx, row in df.iterrows():
        input_data = {
            "avg_daily_income": float(row["avg_daily_income"]),
            "income_std_dev": float(row["income_std_dev"]),
            "active_days_ratio": float(row["active_days_ratio"]),
            "max_income_gap": int(row["max_income_gap"]),
            "tenure_months": int(row["tenure_months"]),
            "income_trend": float(row["income_trend"]),
        }

        scored = score_credit(input_data, model)

        lender_explanation = generate_lender_explanation(
            score=scored["credit_reliability_score"],
            risk_band=scored["risk_band"],
            reasons=scored["key_reasons"],
        )

        results.append({
            "applicant_id": row.get("applicant_id", f"USER-{idx + 1}"),
            "credit_reliability_score": scored["credit_reliability_score"],
            "risk_band": scored["risk_band"],
            "key_reasons": scored["key_reasons"],
            "suggestions": scored["suggestions"],
            "explanations": {
                "lender": lender_explanation,
                "user": (
                    "This assessment reflects income patterns, "
                    "work consistency, and employment duration."
                ),
            }
        })

    return {
        "record_count": len(results),
        "results": results
    }

# =========================
# PDF export (single)
# =========================
@app.post("/export/pdf")
def export_pdf(payload: PDFExportPayload):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        file_path = tmp.name

    c = canvas.Canvas(file_path, pagesize=A4)
    y = A4[1] - 50

    c.setFont("Helvetica-Bold", 16)
    c.drawString(50, y, "CreditBridge – Credit Assessment Report")

    y -= 40
    c.setFont("Helvetica", 12)
    c.drawString(50, y, f"Credit Score: {payload.score.credit_reliability_score}")
    y -= 20
    c.drawString(50, y, f"Risk Band: {payload.score.risk_band}")

    y -= 30
    c.setFont("Helvetica-Bold", 12)
    c.drawString(50, y, "Key Reasons:")
    c.setFont("Helvetica", 11)
    for r in payload.score.key_reasons:
        y -= 18
        c.drawString(70, y, f"- {r}")

    y -= 30
    c.setFont("Helvetica-Bold", 12)
    c.drawString(50, y, "Suggestions:")
    c.setFont("Helvetica", 11)
    for s in payload.score.suggestions:
        y -= 18
        c.drawString(70, y, f"- {s}")

    y -= 30
    c.setFont("Helvetica-Bold", 12)
    c.drawString(50, y, "Lender Explanation:")
    y -= 18
    c.setFont("Helvetica", 11)
    c.drawString(50, y, payload.explanations.lender)

    c.showPage()
    c.save()

    return FileResponse(
        file_path,
        media_type="application/pdf",
        filename="creditbridge_assessment.pdf"
    )

# =========================
# XLS export (bulk)
# =========================
@app.post("/export/xls")
def export_xls(payload: XLSExportPayload):
    # Prepare data for UI alignment
    formatted_data = []
    for r in payload.records:
        formatted_data.append({
            "Applicant ID": r.applicant_id,
            "Credit Score": round(float(r.credit_reliability_score), 2),
            "Risk Band": r.risk_band,
            "Key Factors": ", ".join(r.key_reasons)
        })

    df = pd.DataFrame(formatted_data)

    with tempfile.NamedTemporaryFile(delete=False, suffix=".xlsx") as tmp:
        file_path = tmp.name

    # Ensure columns are in the exact UI order
    columns_order = ["Applicant ID", "Credit Score", "Risk Band", "Key Factors"]
    df = df[columns_order]
    
    df.to_excel(file_path, index=False)

    return FileResponse(
        file_path,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        filename="creditbridge_bulk_report.xlsx"
    )
