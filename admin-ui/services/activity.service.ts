import { apiClient } from "@/lib/api-client";

export interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  speaker: string;
  location: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityCreate {
  title: string;
  description: string;
  date: string;
  speaker: string;
  location: string;
  type: string;
}

export const activityService = {
  getAll: async (): Promise<Activity[]> => {
    return apiClient.get<Activity[]>("/activities");
  },

  getById: async (id: string): Promise<Activity> => {
    return apiClient.get<Activity>(`/activities/${id}`);
  },

  create: async (data: ActivityCreate): Promise<Activity> => {
    return apiClient.post<Activity>("/activities", data);
  },

  update: async (id: string, data: Partial<ActivityCreate>): Promise<Activity> => {
    return apiClient.put<Activity>(`/activities/${id}`, data);
  },

  delete: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/activities/${id}`);
  },
};
