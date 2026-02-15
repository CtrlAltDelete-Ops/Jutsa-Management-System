import { apiClient } from "@/lib/api-client";

export interface Member {
  id: string;
  name: string;
  address: string;
  email: string;
  semester: string;
  studentId: string;
  year: string;
  position_Id: string;
  position?: {
    id: string;
    title: string;
    description: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface MemberCreate {
  name: string;
  address: string;
  email: string;
  semester: string;
  studentId: string;
  year: string;
  position_Id: string;
}

export const memberService = {
  getAll: async (): Promise<Member[]> => {
    return apiClient.get<Member[]>("/members");
  },

  getById: async (id: string): Promise<Member> => {
    return apiClient.get<Member>(`/members/${id}`);
  },

  create: async (data: MemberCreate): Promise<Member> => {
    return apiClient.post<Member>("/members", data);
  },

  update: async (id: string, data: Partial<MemberCreate>): Promise<Member> => {
    return apiClient.put<Member>(`/members/${id}`, data);
  },

  delete: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/members/${id}`);
  },
};
