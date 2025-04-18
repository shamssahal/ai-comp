import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});


export async function fetchRequests(page = 1, limit = 13) {
  const response = await apiClient.get('/requests', {
    params: { page, limit },
  });
  return response.data;
}


export async function generate(payload) {
    const response = await apiClient.post('/generate', payload);
    return response.data;
  }


export async function getRequest(id) {
    const response = await apiClient.get(`/request/${id}`);
    return response.data;
}

export async function fetchTimeSeries() {
    const { data } = await apiClient.get(`/timeseries`);
    return data.data;
  }