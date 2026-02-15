import { apiClient } from "@/lib/api-client";

export interface Candidate {
  studentID: string;
  name: string;
  number: number;
  email: string;
  gpa: number;
  semester: string;
  department: string;
  className: string;
  failedCourse: string;
  financeDue: string;
  experience: string;
  campaignPlan: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CandidateCreate {
  studentID: string;
  name: string;
  number: number;
  email: string;
  gpa: number;
  semester: string;
  department: string;
  className: string;
  failedCourse: string;
  financeDue: string;
  experience: string;
  campaignPlan: string;
  status?: string;
}

export const candidateService = {
  getAll: async (): Promise<Candidate[]> => {
    try {
      return apiClient.get<Candidate[]>("/candidates");
    } catch (error) {
      // If endpoint doesn't exist, return empty array
      console.warn("Candidates endpoint may not be available:", error);
      return [];
    }
  },

  getById: async (id: string): Promise<Candidate> => {
    return apiClient.get<Candidate>(`/candidates/${id}`);
  },

  create: async (data: CandidateCreate): Promise<Candidate> => {
    return apiClient.post<Candidate>("/candidates", data);
  },

  update: async (id: string, data: Partial<CandidateCreate>): Promise<Candidate> => {
    return apiClient.put<Candidate>(`/candidates/${id}`, data);
  },

  delete: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/candidates/${id}`);
  },
};
