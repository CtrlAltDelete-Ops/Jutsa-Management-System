import apiClient from "../utils/apiClient";

export const fetchSportsDetailsFromAPI = async () => {
  const data = await apiClient("/api/sports");
  return data.data;
};

export const fetchSportsByIdAPI = async (id) => {
  const data = await apiClient(`/api/sports/${id}`);
  return data.data || data;
};

export const addSports = async (SportsData) => {
  return apiClient("/api/sports", { method: "POST", body: SportsData });
};

export const updateSports = async (id, SportsData) => {
  return apiClient(`/api/sports/${id}`, { method: "PUT", body: SportsData });
};

export const deleteSports = async (id) => {
  return apiClient(`/api/sports/${id}`, { method: "DELETE" });
};