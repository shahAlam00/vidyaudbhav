import { api } from "./api";

/**
 * Get all active / published blogs
 */
export const getActiveBlogs = async (page = 1, limit = 10, search = ""): Promise<any> => {
  try {
    const  {data}  = await api.get(`/blogs`, {
      params: { page, limit, search }
    });
    return data; // Expected { blogs: [], totalPages: 5, totalCount: 50 }
  } catch (error: any) {
    console.error("Get blogs API error:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch blogs");
  }
};

/**
 * Get blog by ID
 */
export const getBlogById = async (id: string): Promise<any> => {
  try {
    const { data } = await api.get(`/blogs/${id}`);
    return data;
  } catch (error: any) {
    console.error("Get blog API error:", error.response || error);
    return {
      data: null,
      error: error.response?.data?.message || "Failed to fetch blog",
    };
  }
};

/**
 * Get blog by slug
 */
export const getBlogBySlug = async (blogSlug: string): Promise<any> => {
  try {
    console.log("slug",blogSlug)
    const { data } = await api.get(`/blogs/slug/${blogSlug}`);
    return data;
  } catch (error: any) {
    console.error("Get blog by slug API error:", error.response || error);
    return {
      data: null,
      error: error.response?.data?.message || "Failed to fetch blog",
    };
  }
};

/**
 * Get blogs by category
 */
export const getBlogsByCategory = async (category: string): Promise<any> => {
  try {
    const { data } = await api.get(`/blogs/category/${category}`);
    return data;
  } catch (error: any) {
    console.error("Get blogs by category API error:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch blogs by category"
    );
  }
};

/**
 * Get featured blogs
 */
export const getFeaturedBlogs = async (): Promise<any> => {
  try {
    const { data } = await api.get("/blogs/featured");
    return data;
  } catch (error: any) {
    console.error("Get featured blogs API error:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch featured blogs"
    );
  }
};
