import { apiClient } from "@/lib/api-client";

export interface Finance {
  id: string;
  userId: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface FinanceCreate {
  title: string;
  amount: number;
  type: string;
  category: string;
  userId: string;
}

export const financeService = {
  getAll: async (): Promise<Finance[]> => {
    return apiClient.get<Finance[]>("/finances");
  },

  getById: async (id: string): Promise<Finance> => {
    return apiClient.get<Finance>(`/finances/${id}`);
  },

  create: async (data: FinanceCreate): Promise<Finance> => {
    return apiClient.post<Finance>("/finances/reg", data);
  },

  update: async (id: string, data: Partial<FinanceCreate>): Promise<Finance> => {
    return apiClient.put<Finance>(`/finances/update/${id}`, data);
  },

  delete: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/finances/${id}`);
  },
};
