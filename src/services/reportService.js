// src/services/reportService.js
const API_BASE_URL = 'http://localhost:8080';

export const getReport = async (reportId) => {
  const response = await fetch(`${API_BASE_URL}/reports/2`);
  if (!response.ok) {
    throw new Error('Rapor verisi alınamadı');
  }
  return response.json();
};
