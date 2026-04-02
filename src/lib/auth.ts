// import { api } from "./api";
// import { toast } from "react-toastify";

// const AUTH_KEY = "auth";

// /* =======================
//    Auth Storage Helpers
// ======================= */

// type AuthData = {
//   token: string;
//   user?: any;
// };

// export const setAuth = (data: AuthData): void => {
//   if (typeof window !== "undefined") {
//     sessionStorage.setItem(AUTH_KEY, JSON.stringify(data));
//     window.dispatchEvent(new Event("authChange"));
//   }
// };

// export const getAuth = (): AuthData | null => {
//   if (typeof window !== "undefined") {
//     const auth = sessionStorage.getItem(AUTH_KEY);
//     return auth ? JSON.parse(auth) : null;
//   }
//   return null;
// };

// export const getUser = () => {
//   const auth = getAuth();
//   return auth?.user || null;
// };

// export const clearAuth = (): void => {
//   if (typeof window !== "undefined") {
//     sessionStorage.removeItem(AUTH_KEY);
//     // Trigger auth state refresh
//     window.dispatchEvent(new Event("authChange"));
//   }
// };

// export const isAuthenticated = (): boolean => {
//   const auth = getAuth();
//   const hasToken = Boolean(auth?.token);
//   return hasToken;
// };

// /* =======================
//    Auth API Calls
// ======================= */

// const handleAuthResponse = (data: any): AuthData => {
//   const token = data?.token || data?.data?.token;
//   const user = data?.user || data?.data?.user;

//   if (!token) {
//     throw new Error("Token not found in response");
//   }

//   const authData = { token, user };
//   setAuth(authData);

//   return authData;
// };

// export const login = async (email: string, password: string): Promise<any> => {
//   try {
//     const { data } = await api.post("/auth/user/login", { email, password });
//     handleAuthResponse(data);
//     return data;
//   } catch (error: any) {
//     console.log(error);
//     const errorMsg = error.response?.data?.message || "User login failed";
//     toast.error(errorMsg);
//     throw new Error(errorMsg);
//   }
// };

// export const forgotPassword = async (email: string): Promise<any> => {
//   try {
//     const { data } = await api.post("/auth/forgot-password", { email });
//     return data;
//   } catch (error: any) {
//     const errorMsg = error.response?.data?.message || "Failed to sent OTP";
//     toast.error(errorMsg);
//     throw new Error(errorMsg);
//   }
// };

// export interface ResetPasswordPayload {
//   email: string;
//   otp: string;
//   password: string;
// }

// export const resetPassword = async (
//   payload: ResetPasswordPayload
// ): Promise<any> => {
//   try {
//     const { data } = await api.post("/auth/reset-password", payload);
//     return data;
//   } catch (error: any) {
//     const errorMsg =
//       error.response?.data?.message || "Failed to reset password";
//     toast.error(errorMsg);
//     throw new Error(errorMsg);
//   }
// };

// /* =======================
//    Logout
// ======================= */

// export const logout = (): void => {
//   clearAuth(); // Clears localStorage/Cookies
//   toast.success("Logged out successfully");
// };

// export const signup = async (
//   email: string,
//   password: string,
//   name?: string,
//   mobile?: string
// ): Promise<any> => {
//   try {
//     const { data } = await api.post("/auth/user/signup", {
//       email,
//       password,
//       name,
//       mobile,
//     });

//     return data;
//   } catch (error: any) {
//     const errorMsg = error.response?.data?.message || "Signup failed";
//     toast.error(errorMsg);
//     throw new Error(errorMsg);
//   }
// };

import { api } from "./api";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const AUTH_KEY = "auth_data";

/* =======================
    Auth Storage Helpers (Cookies)
======================= */

type AuthData = {
  token: string;
  user?: any;
};

// Cookie Configuration for exactly 24 hours
const COOKIE_CONFIG = {
  expires: 1, // 1 day = 24 hours
  secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
  sameSite: "strict" as const, // Protects against CSRF
  path: "/", // Cookie available across all routes
};

export const setAuth = (data: AuthData): void => {
  if (typeof window !== "undefined") {
    // Save as a JSON string in cookies
    Cookies.set(AUTH_KEY, JSON.stringify(data), COOKIE_CONFIG);
    window.dispatchEvent(new Event("authChange"));
  }
};

export const getAuth = (): AuthData | null => {
  if (typeof window !== "undefined") {
    const auth = Cookies.get(AUTH_KEY);
    if (!auth) return null;
    try {
      return JSON.parse(auth);
    } catch (e) {
      console.error("Auth cookie parse error:", e);
      return null;
    }
  }
  return null;
};

export const getUser = () => {
  const auth = getAuth();
  return auth?.user || null;
};

export const clearAuth = (): void => {
  if (typeof window !== "undefined") {
    // Always provide the path when removing cookies
    Cookies.remove(AUTH_KEY, { path: "/" });
    window.dispatchEvent(new Event("authChange"));
  }
};

export const isAuthenticated = (): boolean => {
  const auth = getAuth();
  return Boolean(auth?.token);
};

/* =======================
    Auth API Calls
======================= */

const handleAuthResponse = (data: any): AuthData => {
  const token = data?.token || data?.data?.token;
  const user = data?.user || data?.data?.user;

  if (!token) {
    throw new Error("Token not found in response");
  }

  const authData = { token, user };
  setAuth(authData);

  return authData;
};

export const login = async (email: string, password: string): Promise<any> => {
  try {
    const { data } = await api.post("/auth/user/login", { email, password });
    handleAuthResponse(data);
    return data;
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || "User login failed";
    toast.error(errorMsg);
    throw new Error(errorMsg);
  }
};

export const signup = async (
  email: string,
  password: string,
  name?: string,
  mobile?: string
): Promise<any> => {
  try {
    const { data } = await api.post("/auth/user/signup", {
      email,
      password,
      name,
      mobile,
    });
    handleAuthResponse(data);
    return data;
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || "Signup failed";
    toast.error(errorMsg);
    throw new Error(errorMsg);
  }
};

export const forgotPassword = async (email: string): Promise<any> => {
  try {
    const { data } = await api.post("/auth/forgot-password", { email });
    return data;
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || "Failed to send OTP";
    toast.error(errorMsg);
    throw new Error(errorMsg);
  }
};

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  password: string;
}

export const resetPassword = async (
  payload: ResetPasswordPayload
): Promise<any> => {
  try {
    const { data } = await api.post("/auth/reset-password", payload);
    return data;
  } catch (error: any) {
    const errorMsg =
      error.response?.data?.message || "Failed to reset password";
    toast.error(errorMsg);
    throw new Error(errorMsg);
  }
};

/* =======================
    Logout
======================= */

export const logout = (): void => {
  clearAuth();
  toast.success("Logged out successfully");
};
