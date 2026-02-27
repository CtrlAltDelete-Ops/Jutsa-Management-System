import apiClient from "../utils/apiClient";

export const fetchCaawiyeFromAPI = async () => {
  return apiClient("/api/caawiye");
};

export const fetchCaawiyeById = async (id) => {
  const data = await apiClient(`/api/caawiye/${id}`);
  return data.data;
};

export const addCaawiye = async (caawiyeData) => {
  return apiClient("/api/caawiye", { method: "POST", body: caawiyeData });
};

export const updateCaawiye = async (id, caawiyeData) => {
  return apiClient(`/api/caawiye/${id}`, { method: "PUT", body: caawiyeData });
};

export const deleteCaawiye = async (id) => {
  return apiClient(`/api/caawiye/${id}`, { method: "DELETE" });
};
