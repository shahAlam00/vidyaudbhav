import { api } from "./api";

/**
 * Get all active / published colleges
 */
export const getActiveColleges = async (params: any = {}): Promise<any> => {
  try {
    const { data } = await api.get("/colleges", { params });
    return data;
  } catch (error: any) {
    console.error("Get colleges API error:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch colleges"
    );
  }
};



/**
 * Get college by slug
 */
export const getCollegesBySlug = async (collegeSlug: string): Promise<any> => {
  try {
    const { data } = await api.get(`/colleges/slug/${collegeSlug}`);
    return data;
  } catch (error: any) {
    console.error("Get college by slug API error:", error.response || error);
    return {
      data: null,
      error: error.response?.data?.message || "Failed to fetch college",
    };
  }
};


/**
 * Get featured colleges
 */
export const getFeaturedColleges = async (): Promise<any> => {
  try {
    const { data } = await api.get("/colleges/featured");
    return data;
  } catch (error: any) {
    console.error("Get featured colleges API error:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch featured colleges"
    );
  }
};
