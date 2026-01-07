// Mock data for CreditBridge dashboard
// This will be replaced with actual API calls later

export const mockScoreResponse = {
  score: {
    credit_reliability_score: 53.84,
    risk_band: "Medium Risk",
    key_reasons: [
      "Inconsistent work activity",
      "Short work history"
    ],
    suggestions: [
      "Enhance the regularity of active working days.",
      "Build a longer continuous work history."
    ]
  },
  explanations: {
    lender: "The applicant demonstrates moderate credit reliability with a score of 53.84, placing them in the Medium Risk category. Analysis indicates inconsistent work patterns and limited employment tenure. While income streams are present, their irregularity presents potential repayment volatility. Further documentation of income sources and extended work history would strengthen the credit profile.",
    user: "Your credit reliability score is 53.84 out of 100. This means you're in the medium risk category. The main factors affecting your score are that your work activity has been inconsistent and your work history is relatively short. To improve your score, try to work more regularly and build up a longer work history over time."
  }
};

// Sample payload that will be sent to the backend
export const samplePayload = {
  profile_id: "demo-001",
  work_data: {
    total_days_worked: 180,
    consistency_score: 0.65,
    tenure_months: 8,
    income_gaps: 3
  }
};
