// Credit API service for CreditBridge dashboard
import axios from 'axios';
import { mockScoreResponse } from '../data/mockData';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
const API = `${BACKEND_URL}`;

/**
 * Generates user-friendly explanations based on score data
 */
const generateExplanations = (scoreData) => {
  const score = scoreData.credit_reliability_score;
  const riskBand = scoreData.risk_band;
  const reasons = scoreData.key_reasons.join(', ');

  return {
    lender: `The applicant demonstrates ${riskBand.toLowerCase()} credit reliability with a score of ${score}. Analysis indicates: ${reasons}. ${score >= 70 ? 'Profile shows strong repayment potential.' : score >= 50 ? 'Moderate risk - additional verification recommended.' : 'High risk profile - exercise caution in lending decisions.'}`,
    user: `Your credit reliability score is ${score} out of 100, placing you in the ${riskBand} category. ${scoreData.key_reasons.length > 0 ? `Key factors: ${reasons}.` : ''} ${scoreData.suggestions.length > 0 ? `To improve: ${scoreData.suggestions.join(' ')}` : ''}`
  };
};

/**
 * Fetches credit score from the backend
 */
export const fetchCreditScore = async (payload) => {
  try {
    const response = await axios.post(`${API}/score`, payload);
    const scoreData = response.data.score;

    // Add explanations based on the score
    return {
      score: scoreData,
      explanations: generateExplanations(scoreData)
    };
  } catch (error) {
    console.error('Error fetching credit score:', error);
    // Return mock data for demo purposes
    console.log('Using mock data for demonstration');
    return mockScoreResponse;
  }
};

/**
 * Health check for the API
 */
export const checkApiHealth = async () => {
  try {
    const response = await axios.get(`${API}/`);
    return { status: 'healthy', message: response.data.message };
  } catch (error) {
    return { status: 'unhealthy', message: error.message };
  }
};
