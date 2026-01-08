// Credit API service for CreditBridge dashboard
import axios from 'axios';
import { mockScoreResponse } from '../data/mockData';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
const API = `${BACKEND_URL}`;

/**
 * Fetches credit score from the backend
 */
export const fetchCreditScore = async (payload) => {
  try {
    const response = await axios.post(`${API}/score`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const scoreData = response.data.score;
    // Backend now handles explanations, so we just return the full structure
    // If the frontend expects a specific structure, adapt here, but based on main.py
    // the backend returns { score: {...}, explanations: {...} }
    // The previous HEAD code was generating explanations client-side.
    // The previous ORIGIN code was returning response.data

    // We will align with the backend response structure which suggests:
    // response.data = { score: {...}, explanations: {...} }

    return response.data;
  } catch (error) {
    console.error('Error fetching credit score:', error);
    // Return mock data for demo purposes
    console.log('Using mock data for demonstration');
    return mockScoreResponse;
  }
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
