import { api } from "./api";

/**
 * Get Bookmarks for authenticated user
 */

export const getBookmarks = async (): Promise<any> => {
  try {
    const { data } = await api.get("/bookmarks");
    return data;
  } catch (error: any) {
    console.error("Get Bookmarks API error:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch Bookmarks"
    );
  }
};

/**
 * Get Bookmarks for authenticated user
 */

export const addBookmark = async (college: any): Promise<any> => {
  try {
    const { data } = await api.post(`/bookmarks`, college);
    return data;
  } catch (error: any) {
    console.error("Add Bookmark API error:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to add Bookmark");
  }
};

/**
 * Get Bookmarks for authenticated user
 */

export const removeBookmark = async (bookmarkId: string): Promise<any> => {
  try {
    const { data } = await api.delete(`/bookmarks/${bookmarkId}`);
    return data;
  } catch (error: any) {
    console.error("Remove Bookmark API error:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to remove Bookmark"
    );
  }
};
