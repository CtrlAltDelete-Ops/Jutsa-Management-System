import { apiClient } from "@/lib/api-client";

export interface Position {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface PositionCreate {
  title: string;
  description: string;
}

export const positionService = {
  getAll: async (): Promise<Position[]> => {
    return apiClient.get<Position[]>("/positions");
  },

  getById: async (id: string): Promise<Position> => {
    return apiClient.get<Position>(`/positions/${id}`);
  },

  create: async (data: PositionCreate): Promise<Position> => {
    return apiClient.post<Position>("/positions", data);
  },

  update: async (id: string, data: Partial<PositionCreate>): Promise<Position> => {
    return apiClient.put<Position>(`/positions/${id}`, data);
  },

  delete: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/positions/${id}`);
  },
};
