import { apiClient } from "@/lib/api-client";

export interface Competitor {
  id: string;
  name: string;
  number: number;
  email: string;
  semester: string;
  className: string;
  idNumber: string;
  type: string;
  skill: string;
  projectName: string;
  technologies: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CompetitorCreate {
  name: string;
  number: number;
  email: string;
  semester: string;
  className: string;
  idNumber: string;
  type: string;
  skill: string;
  projectName: string;
  technologies: string;
}

export const competitorService = {
  getAll: async (): Promise<Competitor[]> => {
    return apiClient.get<Competitor[]>("/competitors");
  },

  getById: async (id: string): Promise<Competitor> => {
    return apiClient.get<Competitor>(`/competitors/${id}`);
  },

  create: async (data: CompetitorCreate): Promise<Competitor> => {
    return apiClient.post<Competitor>("/competitors", data);
  },

  update: async (id: string, data: Partial<CompetitorCreate>): Promise<Competitor> => {
    return apiClient.put<Competitor>(`/competitors/update/${id}`, data);
  },

  delete: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/competitors/${id}`);
  },
};
