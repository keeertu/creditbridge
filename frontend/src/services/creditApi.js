// Credit API service for CreditBridge dashboard
import axios from 'axios';
import { mockScoreResponse } from '../data/mockData';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

/**
 * Fetches credit score from the backend
 * Currently returns mock data - will be connected to real API
 */
export const fetchCreditScore = async (payload) => {
  try {
    const response = await axios.post(`${API}/score`, payload);
    return response.data;
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
