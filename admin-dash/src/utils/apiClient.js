/**
 * apiClient — a thin wrapper around fetch that automatically:
 *  1. Attaches the JWT Bearer token from localStorage
 *  2. Sets Content-Type: application/json for non-GET requests with a body
 *
 * Usage:
 *   import apiClient from "../utils/apiClient";
 *   const data = await apiClient("/api/competitors");
 *   const data = await apiClient("/api/competitors", { method: "POST", body: payload });
 */

const BASE_URL = "http://localhost:7005";

const getToken = () => {
    try {
        const stored = localStorage.getItem("user");
        if (!stored) return null;
        const parsed = JSON.parse(stored);
        return parsed?.token ?? null;
    } catch {
        return null;
    }
};

const apiClient = async (endpoint, options = {}) => {
    const token = getToken();

    const headers = {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    return response.json();
};

export default apiClient;
