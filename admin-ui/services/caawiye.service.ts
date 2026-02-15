import { apiClient } from "@/lib/api-client";

export interface Caawiye {
  id: string;
  name: string;
  number: number;
  semester: string;
  className: string;
  password: string;
  problems: string;
  solutions: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CaawiyeCreate {
  name: string;
  number: number;
  semester: string;
  className: string;
  password: string;
  problems: string;
  solutions: string;
  status: string;
}

export const caawiyeService = {
  getAll: async (): Promise<Caawiye[]> => {
    return apiClient.get<Caawiye[]>("/caawiye");
  },

  getById: async (id: string): Promise<Caawiye> => {
    return apiClient.get<Caawiye>(`/caawiye/${id}`);
  },

  create: async (data: CaawiyeCreate): Promise<Caawiye> => {
    return apiClient.post<Caawiye>("/caawiye", data);
  },

  update: async (id: string, data: Partial<CaawiyeCreate>): Promise<Caawiye> => {
    return apiClient.put<Caawiye>(`/caawiye/${id}`, data);
  },

  delete: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/caawiye/${id}`);
  },
};
