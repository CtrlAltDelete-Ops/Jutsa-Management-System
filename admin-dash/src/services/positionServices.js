import apiClient from "../utils/apiClient";

const ENDPOINT = "/api/positions";

export const fetchPositionDetailsFromAPI = async () => {
  const data = await apiClient(ENDPOINT);
  return data.data;
};

export const fetchPositionById = async (id) => {
  const data = await apiClient(`${ENDPOINT}/${id}`);
  return data.data;
};

export const registerPosition = async (formData) => {
  const data = await apiClient(ENDPOINT, { method: "POST", body: formData });
  return data.data;
};

export const updatePosition = async (id, formData) => {
  const data = await apiClient(`${ENDPOINT}/${id}`, { method: "PUT", body: formData });
  return data.data;
};

export const deletePosition = async (id) => {
  const data = await apiClient(`${ENDPOINT}/${id}`, { method: "DELETE" });
  return data.data;
};
