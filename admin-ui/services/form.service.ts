import { apiClient } from "@/lib/api-client";

export interface FormVisibility {
  sportsForm?: boolean;
  presidentForm?: boolean;
  facultyForm?: boolean;
  [key: string]: boolean | undefined;
}

export const formService = {
  getAll: async (): Promise<FormVisibility> => {
    return apiClient.get<FormVisibility>("/form");
  },

  getByName: async (formName: string): Promise<FormVisibility> => {
    return apiClient.get<FormVisibility>(`/form/${formName}`);
  },

  update: async (formName: string, showForm: boolean): Promise<void> => {
    return apiClient.post<void>(`/form/${formName}`, { showForm });
  },
};
