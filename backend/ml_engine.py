import os
import pandas as pd
from typing import List, Dict, Optional
from dotenv import load_dotenv

load_dotenv()

# ======================================================
# OpenRouter client (optional - for AI-refined suggestions)
# ======================================================
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
client = None

if OPENROUTER_API_KEY:
    try:
        from openai import OpenAI
        client = OpenAI(
            api_key=OPENROUTER_API_KEY,
            base_url="https://openrouter.ai/api/v1"
        )
        print("✅ OpenRouter client initialized - AI suggestions enabled")
    except Exception as e:
        print(f"⚠️ OpenRouter client failed: {e} - Using fallback suggestions")
else:
    print("ℹ️ No OPENROUTER_API_KEY found - Using fallback suggestions")

# ======================================================
# Deterministic suggestion map
# ======================================================
SUGGESTION_MAP: Dict[str, str] = {
    "Inconsistent work activity": "Increase consistency in active working days",
    "Long gaps between income days": "Reduce extended gaps between income periods",
    "High income volatility": "Maintain steadier income patterns over time",
    "Short work history": "Build a longer, continuous work record",
}

# ======================================================
# Internal helpers (PRIVATE)
# ======================================================
def _risk_band(score: float) -> str:
    if score >= 75:
        return "Low Risk"
    if score >= 50:
        return "Medium Risk"
    return "High Risk"


def _generate_reasons(x: Dict) -> List[str]:
    reasons: List[str] = []

    avg = x["avg_daily_income"]
    std = x["income_std_dev"]

    if avg > 0 and (std / avg) > 0.5:
        reasons.append("High income volatility")

    if x["active_days_ratio"] < 0.6:
        reasons.append("Inconsistent work activity")

    if x["tenure_months"] < 6:
        reasons.append("Short work history")

    if x["max_income_gap"] > 7:
        reasons.append("Long gaps between income days")

    if not reasons:
        reasons.append("Stable income and consistent work pattern")

    return reasons


def _safe_llm_text(response) -> str:
    """
    GUARANTEES a string return.
    No Optional[str], no None.
    """
    try:
        content = response.choices[0].message.content
        return content if isinstance(content, str) else ""
    except Exception:
        return ""


def _refine_suggestions(reasons: List[str]) -> List[str]:
    base = [SUGGESTION_MAP[r] for r in reasons if r in SUGGESTION_MAP]

    if not base:
        return []

    # If no OpenRouter client, return base suggestions
    if client is None:
        return base[:2]

    prompt = f"""
Refine the following improvement suggestions.

Base suggestions:
{chr(10).join(f"- {s}" for s in base)}

Rules:
- Do NOT introduce new ideas
- Do NOT give financial advice
- Keep concise
- Return 1–2 bullet points
"""

    try:
        resp = client.chat.completions.create(
            model="openai/gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            max_tokens=80,
        )

        text = _safe_llm_text(resp)
        lines = [l.strip("- ").strip() for l in text.split("\n") if l.strip()]
        return lines if lines else base[:2]

    except Exception:
        return base[:2]

# ======================================================
# ✅ PUBLIC ENTRYPOINT (ONLY THIS IS IMPORTED)
# ======================================================
def score_credit(input_dict: Dict, model) -> Dict:
    """
    Main ML entrypoint used by FastAPI
    """

    df = pd.DataFrame([input_dict])
    X = df[model.feature_names_in_]
    
    score = float(model.predict(X)[0])
    reasons = _generate_reasons(input_dict)
    suggestions = _refine_suggestions(reasons)
    if input_dict["tenure_months"] == 0 and input_dict["active_days_ratio"] == 0:
        score = 35.0



    return {
        "credit_reliability_score": round(score, 2),
        "risk_band": _risk_band(score),
        "key_reasons": reasons,
        "suggestions": suggestions,
    }
