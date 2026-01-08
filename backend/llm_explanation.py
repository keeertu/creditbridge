import os
from openai import OpenAI

def generate_lender_explanation(score: float, risk_band: str, reasons: list) -> str:
    api_key = os.getenv("OPENROUTER_API_KEY")

    # 🛑 HARD SAFETY: if key missing, fallback gracefully
    if not api_key:
        return (
            f"The applicant is classified as {risk_band} based on income patterns, "
            f"work consistency, and employment history."
        )

    client = OpenAI(
        api_key=api_key,
        base_url="https://openrouter.ai/api/v1"
    )

    prompt = f"""
You are a credit risk analyst.

Credit score: {score}
Risk band: {risk_band}
Key reasons:
{chr(10).join(f"- {r}" for r in reasons)}

Write a concise lender-facing explanation (2–3 sentences).
No advice. No speculation.
"""

    try:
        resp = client.chat.completions.create(
            model="openai/gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            max_tokens=120,
        )

        return resp.choices[0].message.content.strip()

    except Exception:
        # 🛑 Never crash backend because of LLM
        return (
            f"The applicant is classified as {risk_band} based on observed "
            f"income stability and employment indicators."
        )
