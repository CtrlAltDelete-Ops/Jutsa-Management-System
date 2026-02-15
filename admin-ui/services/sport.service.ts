import { apiClient } from "@/lib/api-client";

export interface Sport {
  id: string;
  monitorName: string;
  monitorNumber: string;
  className: string;
  description: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export interface SportCreate {
  monitorName: string;
  monitorNumber: string;
  className: string;
  description: string;
  amount: number;
}

export const sportService = {
  getAll: async (): Promise<Sport[]> => {
    return apiClient.get<Sport[]>("/sports");
  },

  getById: async (id: string): Promise<Sport> => {
    return apiClient.get<Sport>(`/sports/${id}`);
  },

  create: async (data: SportCreate): Promise<Sport> => {
    return apiClient.post<Sport>("/sports", data);
  },

  update: async (id: string, data: Partial<SportCreate>): Promise<Sport> => {
    return apiClient.put<Sport>(`/sports/${id}`, data);
  },

  delete: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/sports/${id}`);
  },
};
