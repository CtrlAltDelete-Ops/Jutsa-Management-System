import { apiClient } from "@/lib/api-client";

export interface User {
  id: string;
  email: string;
  name?: string;
  isAdmin: boolean;
  role: "SUPER_ADMIN" | "ADMIN" | "USER";
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export const userService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
      "/users/auth/login",
      credentials
    );
    if (typeof window !== "undefined" && response.token) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
    }
    return response;
  },

  register: async (data: RegisterData): Promise<User> => {
    return apiClient.post<User>("/users/auth/reg", data);
  },

  getUsers: async (): Promise<User[]> => {
    return apiClient.get<User[]>("/users");
  },

  getUser: async (id: string): Promise<User> => {
    return apiClient.get<User>(`/users/${id}`);
  },

  updateUser: async (id: string, data: Partial<User>): Promise<User> => {
    return apiClient.put<User>(`/users/edit/${id}`, data);
  },

  deleteUser: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/users/${id}`);
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },

  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  },
};
