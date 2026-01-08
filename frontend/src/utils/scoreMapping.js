// Score mapping utilities for CreditBridge dashboard
// Maps backend response to visual indicators

/**
 * Derives supporting factor scores from the main credit score
 * These are visual-only indicators for the dashboard
 * In production, these would come from the backend
 */
export const deriveFactorScores = (mainScore, keyReasons = []) => {
  // Base calculations - deriving from main score with variance
  const baseVariance = 10;
  
  // Check for specific reasons to adjust scores
  const hasInconsistentWork = keyReasons.some(r => 
    r.toLowerCase().includes('inconsistent') || r.toLowerCase().includes('irregular')
  );
  const hasShortHistory = keyReasons.some(r => 
    r.toLowerCase().includes('short') || r.toLowerCase().includes('limited')
  );
  const hasIncomeIssues = keyReasons.some(r => 
    r.toLowerCase().includes('income') || r.toLowerCase().includes('earning')
  );
  const hasGaps = keyReasons.some(r => 
    r.toLowerCase().includes('gap') || r.toLowerCase().includes('break')
  );

  return {
    workConsistency: {
      label: 'Work Consistency',
      score: Math.max(0, Math.min(100, 
        hasInconsistentWork ? mainScore - 15 : mainScore + (Math.random() * baseVariance - 5)
      )),
      description: 'Regularity of work activity'
    },
    incomeStability: {
      label: 'Income Stability',
      score: Math.max(0, Math.min(100, 
        hasIncomeIssues ? mainScore - 10 : mainScore + (Math.random() * baseVariance)
      )),
      description: 'Consistency of income flow'
    },
    workTenure: {
      label: 'Work Tenure',
      score: Math.max(0, Math.min(100, 
        hasShortHistory ? mainScore - 20 : mainScore + (Math.random() * baseVariance + 5)
      )),
      description: 'Length of work history'
    },
    incomeGaps: {
      label: 'Income Continuity',
      score: Math.max(0, Math.min(100, 
        hasGaps ? mainScore - 12 : mainScore + (Math.random() * baseVariance - 2)
      )),
      description: 'Absence of income interruptions'
    }
  };
};

/**
 * Formats score for display
 */
export const formatScore = (score) => {
  if (typeof score !== 'number') return '0.00';
  return score.toFixed(2);
};

/**
 * Gets score category description
 */
export const getScoreCategory = (score) => {
  if (score >= 75) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 50) return 'Fair';
  if (score >= 35) return 'Below Average';
  return 'Needs Improvement';
};
