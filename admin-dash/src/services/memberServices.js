import apiClient from "../utils/apiClient";

const ENDPOINT = "/api/members";

export const fetchMemberDetailsFromAPI = async () => {
  const data = await apiClient(ENDPOINT);
  return data.data;
};

export const fetchMemberByIdAPI = async (id) => {
  const data = await apiClient(`${ENDPOINT}/${id}`);
  return data.data;
};

export const registerMember = async (formData) => {
  return apiClient(ENDPOINT, { method: "POST", body: formData });
};

export const updateMember = async (id, formData) => {
  return apiClient(`${ENDPOINT}/${id}`, { method: "PUT", body: formData });
};

export const deleteMember = async (id) => {
  return apiClient(`${ENDPOINT}/${id}`, { method: "DELETE" });
};