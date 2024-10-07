// src/services/teamService.js
const API_BASE_URL = 'http://localhost:8080/api/';

export const getTeams = async () => {
  const response = await fetch(`${API_BASE_URL}/teams`);
  if (!response.ok) {
    throw new Error('Takımlar verisi alınamadı');
  }
  return response.json();
};
