import { api } from "./api";

export const createLead = async (leadData: any): Promise<any> => {
  try {
    const { data } = await api.post("/leads", leadData); // ✅ JSON
    return data;
  } catch (error: any) {
    console.error("Create lead API error:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to create lead");
  }
};
