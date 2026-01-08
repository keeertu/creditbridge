// Credit API service for CreditBridge dashboard
import axios from 'axios';
import { mockScoreResponse } from '../data/mockData';

const API_BASE = 'http://localhost:8000';
const API = API_BASE;

/**
 * Fetches credit score from the backend
 * Currently returns mock data - will be connected to real API
 */
/**
 * Fetches credit score from the backend
 */
export const fetchCreditScore = async (payload) => {
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
