// Credit API service for CreditBridge dashboard
import axios from 'axios';
import { mockScoreResponse } from '../data/mockData';

<<<<<<< HEAD
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
=======
const API_BASE = 'http://localhost:8000';
const API = API_BASE;
>>>>>>> origin/frontend-dashboard

/**
 * Fetches credit score from the backend
 */
/**
 * Fetches credit score from the backend
 */
export const fetchCreditScore = async (payload) => {
<<<<<<< HEAD
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
=======
  const response = await axios.post(`${API}/score`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

/**
 * Uploads bulk data for scoring
 */
export const uploadBulkData = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${API}/score/bulk`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * Exports single report to PDF
 */
export const exportPDF = async (payload) => {
  const response = await axios.post(`${API}/export/pdf`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'blob',
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'creditbridge_assessment.pdf');
  document.body.appendChild(link);
  link.click();
  link.remove();
};

/**
 * Exports bulk records to XLS
 */
export const exportXLS = async (records) => {
  const response = await axios.post(`${API}/export/xls`, { records }, {
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'blob',
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'creditbridge_bulk_report.xlsx');
  document.body.appendChild(link);
  link.click();
  link.remove();
>>>>>>> origin/frontend-dashboard
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
