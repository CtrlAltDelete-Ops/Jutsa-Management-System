import apiClient from "../utils/apiClient";

export const FetchActivities = async () => {
  const data = await apiClient("/api/activities");
  return data.data;
};

export const fetchActivityById = async (id) => {
  const data = await apiClient(`/api/activities/${id}`);
  return data.data;
};

export const addActivity = async (activityData) => {
  return apiClient("/api/activities", { method: "POST", body: activityData });
};

export const updateActivity = async (id, activityData) => {
  return apiClient(`/api/activities/${id}`, { method: "PUT", body: activityData });
};

export const deleteActivity = async (id) => {
  return apiClient(`/api/activities/${id}`, { method: "DELETE" });
};
