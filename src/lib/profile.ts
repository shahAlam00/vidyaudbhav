import { api } from "./api";
import { isAuthenticated } from "./auth";
import { toast } from "react-toastify";

export const getProfile = async (): Promise<any> => {
  try {
    // Check if user is authenticated first
    if (!isAuthenticated()) {
      throw new Error("User not authenticated");
    }

    const { data } = await api.get("/student");
    return data;
  } catch (error: any) {
    console.error("Get profile API error:", error.response || error);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      throw new Error("Please login to access your profile");
    }
    
    throw new Error(error.response?.data?.message || "Failed to fetch profile");
  }
};
export const getProfilePicture = async (): Promise<any> => {
  try {
    // Check if user is authenticated first
    if (!isAuthenticated()) {
      throw new Error("User not authenticated");
    }

    const { data } = await api.get("/student/basic");
    return data;
  } catch (error: any) {
    console.error("Get profile API error:", error.response || error);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      throw new Error("Please login to access your profile picture");
    }
    
    throw new Error(error.response?.data?.message || "Failed to fetch profile");
  }
};


export const uploadImage = async (
  imageFile: File,
  folder: string = "profiles/pictures"
): Promise<{
  url: string;
  fileId: string;
  name: string;
  size: number;
}> => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("folder", folder);

    const { data } = await api.post("/images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success(data.message || "Image uploaded successfully");

    return {
      url: data.image.url,
      fileId: data.image.fileId,
      name: data.image.name,
      size: data.image.size,
    };
  } catch (error: any) {
    console.error("Image upload error:", error.response || error);
    const message = error.response?.data?.message || "Image upload failed";
    toast.error(message);
    throw new Error(message);
  }
};
export const updateProfile = async (profileData: any): Promise<any> => {
  try {
    // Check if user is authenticated first
    if (!isAuthenticated()) {
      throw new Error("User not authenticated");
    }

    const { data } = await api.put("/student", profileData);
    return data;
  } catch (error: any) {
    console.error("Update profile API error:", error.response || error);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      throw new Error("Please login to to update profile");
    }
    
    throw new Error(error.response?.data?.message || "Failed to update profile");
  }
};
