import axios from "axios";
import { clearAuth, getAuth } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const AUTH_KEY = "auth_data";

// Create axios instance
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =======================
   Request Interceptor
======================= */
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const authRaw = getAuth();

      if (authRaw) {
        try {
          const auth = authRaw // ✅ FIX

          if (auth?.token) {
            config.headers.Authorization = `Bearer ${auth.token}`;
          }
        } catch (err) {
          console.error("Invalid auth data in sessionStorage");
        }
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =======================
   Response Interceptor
======================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuth();
    }
    return Promise.reject(error);
  }
);
