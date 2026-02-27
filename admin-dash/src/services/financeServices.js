import apiClient from "../utils/apiClient";

export const fetchFinanceDetailsFromAPI = async () => {
  const data = await apiClient("/api/finances");
  return data.data;
};

export const fetchFinanceByIdAPI = async (id) => {
  const data = await apiClient(`/api/finances/${id}`);
  return data.data;
};

export const addFinance = async (financeData) => {
  return apiClient("/api/finances/reg", { method: "POST", body: financeData });
};

export const updateFinance = async (id, financeData) => {
  return apiClient(`/api/finances/update/${id}`, { method: "PUT", body: financeData });
};

export const deleteFinance = async (id) => {
  return apiClient(`/api/finances/${id}`, { method: "DELETE" });
};
