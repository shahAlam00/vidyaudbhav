import { api } from "./api";

interface CounsellorFilters {
  search?: string;
  consultationType?: "Free" | "Paid";
  location?: string;
  minExperience?: number;
  maxExperience?: number;
  languages?: string;
  professionalExpertise?: string;
  page?: number;
  limit?: number;
}

export const getActiveCounsellors = async (filters: CounsellorFilters = {}): Promise<any> => {
  try {
    // Axios passes the 'params' object as query strings automatically
    const { data } = await api.get("/counselling/active", { 
      params: filters 
    });
    return data;
  } catch (error: any) {
    console.error("Get counsellors API error:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch counsellors"
    );
  }
};

export const getCounsellorsById = async (id: string): Promise<any> => {
  try {
    const { data } = await api.get(`/counselling/${id}`);
    return data;
  } catch (error: any) {
    console.error("Get counsellor API error:", error.response || error);
    return {
      data: null,
      error: error.response?.data?.message || "Failed to fetch counsellor"
    };
  }
};

export const getCounsellors = async (params?: {
  page?: number;
  limit?: number;
}) => {
  try {
    const { data } = await api.get("/counselling/active-counsellors", { params });
    console.log("data",data)
    return data; // Returns the full object including { data: { counsellors: [...] } }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch counsellors");
  }
};
