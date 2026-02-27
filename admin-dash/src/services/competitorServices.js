import apiClient from "../utils/apiClient";

export const fetchCompetitorsFromAPI = async () => {
  const data = await apiClient("/api/competitors");
  return data.data;
};

export const fetchCompetitorByIdAPI = async (id) => {
  const data = await apiClient(`/api/competitors/${id}`);
  return data.data;
};

export const addCompetitor = async (competitorData) => {
  return apiClient("/api/competitors", { method: "POST", body: competitorData });
};

export const updateCompetitor = async (id, competitorData) => {
  return apiClient(`/api/competitors/update/${id}`, { method: "PUT", body: competitorData });
};

export const deleteCompetitor = async (id) => {
  return apiClient(`/api/competitors/${id}`, { method: "DELETE" });
};
