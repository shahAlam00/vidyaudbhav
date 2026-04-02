"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { getProfile, updateProfile, uploadImage } from "@/lib/profile";
import { isAuthenticated } from "@/lib/auth";
import { useRouter } from "next/navigation";
import {
  MapPin,
  GraduationCap,
  Award,
  Target,
  Briefcase,
  Mail,
  Phone,
  Camera,
  Plus,
  Trash2,
  Save,
} from "lucide-react";
import { toast } from "react-toastify";
import ProfileSkeleton from "@/components/dashboard/ProfileSkeleton";

// --- InputField component moved OUTSIDE to prevent focus loss ---
const InputField = ({
  field,
  label,
  type = "text",
  options = null,
  isArray = false,
  formData,
  onChange,
  onArrayChange,
}: any) => {
  let value;
  if (field.includes(".")) {
    const [parent, child] = field.split(".");
    value =
      parent === "address"
        ? formData.address?.[child]
        : formData.budgetRange?.[child];
  } else {
    value = isArray ? (formData[field] || []).join(", ") : formData[field];
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-gray-50 last:border-0 px-2">
      <span className="text-sm font-semibold text-gray-500 mb-2 sm:mb-0">
        {label}
      </span>
      <div className="min-w-[60%]">
        {options ? (
          <select
            value={value || ""}
            onChange={(e) => onChange(field, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          >
            <option value="">Select {label}</option>
            {options.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={value || ""}
            onChange={(e) =>
              isArray
                ? onArrayChange(field, e.target.value)
                : onChange(field, e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            placeholder={
              isArray
                ? `Enter ${label.toLowerCase()} separated by commas`
                : `Enter ${label.toLowerCase()}`
            }
          />
        )}
      </div>
    </div>
  );
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [newAchievement, setNewAchievement] = useState("");
  const [uploading, setUploading] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);
  const [tempAchievements, setTempAchievements] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      if (!isAuthenticated()) {
        router.push("/login");
        return;
      }
      const res = await getProfile();
      const profileData = res.profile || res.data || res;
      setProfile(profileData);

      setFormData({
        bio: profileData.bio || "",
        gender: profileData.gender || "",
        currentClass: profileData.currentClass || "",
        stream: profileData.stream || "",
        schoolName: profileData.schoolName || "",
        boardName: profileData.boardName || "",
        percentage: profileData.percentage || "",
        dateOfBirth: profileData.dateOfBirth
          ? new Date(profileData.dateOfBirth).toISOString().split("T")[0]
          : "",
        interestedFields: profileData.interestedFields || [],
        preferredLocations: profileData.preferredLocations || [],
        budgetRange: {
          min: profileData.budgetRange?.min || "",
          max: profileData.budgetRange?.max || "",
        },
        address: {
          city: profileData.address?.city || "",
          state: profileData.address?.state || "",
          pincode: profileData.address?.pincode || "",
          street: profileData.address?.street || "",
          country: profileData.address?.country || "",
        },
      });

      setTempAchievements(profileData.achievements || []);
    } catch (error: any) {
      setError(error.message);
      toast?.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast?.error("Image size should be less than 5MB");
      return;
    }

    try {
      setUploading(true);
      const tempUrl = URL.createObjectURL(file);
      setTempImageUrl(tempUrl);
      setFormData((prev: any) => ({ ...prev, profilePictureFile: file }));
      // toast?.success("Image ready for update!");
    } catch (error) {
      toast?.error("Failed to process image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setUpdating(true);
      const updatePayload: any = { ...formData };
      const profilePictureFile = updatePayload.profilePictureFile;
      delete updatePayload.profilePictureFile;
      updatePayload.achievements = tempAchievements;

      if (profilePictureFile) {
        try {
          const uploadResult = await uploadImage(
            profilePictureFile,
            "profiles/pictures"
          );
          updatePayload.profilePicture = uploadResult.url;
          setTempImageUrl(null);
        } catch (uploadError) {
          toast?.error("Failed to upload image");
        }
      }

      const res = await updateProfile(updatePayload);
      setProfile(res.profile);
      toast?.success("Profile updated");
    } catch (err: any) {
      toast?.error("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const handleInputChange = useCallback((field: string, value: any) => {
    setFormData((prev: any) => {
      if (field.startsWith("address.")) {
        const subField = field.split(".")[1];
        return { ...prev, address: { ...prev.address, [subField]: value } };
      }
      if (field.startsWith("budgetRange.")) {
        const subField = field.split(".")[1];
        return {
          ...prev,
          budgetRange: { ...prev.budgetRange, [subField]: value },
        };
      }
      return { ...prev, [field]: value };
    });
  }, []);

  const handleArrayInputChange = useCallback((field: string, value: string) => {
    const items = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item);
    setFormData((prev: any) => ({ ...prev, [field]: items }));
  }, []);

  const handleAddAchievement = () => {
    if (!newAchievement.trim()) return;
    setTempAchievements((prev) => [...prev, newAchievement.trim()]);
    setNewAchievement("");
  };

  const handleDeleteAchievement = (index: number) => {
    setTempAchievements((prev) => prev.filter((_, i) => i !== index));
  };

  if (loading && !profile) return <ProfileSkeleton />;

  if (!profile)
    return <div className="p-10 text-center">Profile Not Found</div>;

  return (
    <div className="space-y-6 pb-10  ">
      {/* Top Banner Section */}
      <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
        <div className="sm:px-8 px-4 pb-8">
          <div className="relative flex flex-col md:flex-row items-end gap-6 -mt-12">
            <div className="relative">
              <img
                src={
                  tempImageUrl ||
                  profile.profilePicture ||
                  `https://ui-avatars.com/api/?name=${profile.user?.name}`
                }
                alt="Profile"
                className="rounded-full w-[120px] h-[120px] border-4 border-white shadow-lg bg-white object-cover"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-2 right-2 p-2 bg-white shadow-md rounded-lg text-blue-600 hover:bg-blue-50"
              >
                {uploading ? (
                  <div className="animate-spin h-4 w-4 border-b-2 border-blue-600" />
                ) : (
                  <Camera size={16} />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-extrabold text-gray-900">
                {profile.user?.name}
              </h1>
              <p className="text-blue-600 font-medium flex items-center justify-center md:justify-start gap-1 capitalize mt-1">
                <Briefcase size={16} /> {formData.currentClass || "Student"} ·{" "}
                {formData.stream || "General"}
              </p>
            </div>

            <button
              onClick={handleUpdateProfile}
              disabled={updating}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 disabled:opacity-50"
            >
              <Save size={16} /> {updating ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Info */}
        <div className="space-y-6 lg:sticky top-24 lg:h-[300px]">
          <div className="bg-white sm:p-6 p-4 rounded-2xl shadow-sm border border-gray-100">
            <h4 className="font-bold mb-4">Contact Details</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <Mail size={18} className="text-blue-500" />
                <span className="text-sm truncate">{profile.user?.email}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <Phone size={18} className="text-blue-500" />
                <span className="text-sm">{profile.user?.mobile}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white sm:p-8 p-4 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-sm font-semibold text-gray-500 block mb-3">
              About Me
            </span>
            <textarea
              value={formData.bio || ""}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm min-h-[100px] outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="bg-white sm:p-8 p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="text-blue-600" size={22} />
              <h3 className="text-lg font-bold">Academic & Personal</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <InputField
                field="gender"
                label="Gender"
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                ]}
                formData={formData}
                onChange={handleInputChange}
              />
              <InputField
                field="dateOfBirth"
                label="DOB"
                type="date"
                formData={formData}
                onChange={handleInputChange}
              />
              <InputField
                field="currentClass"
                label="Class"
                options={[
                  { value: "10th", label: "10th" },
                  { value: "11th", label: "11th" },
                  { value: "12th", label: "12th" },
                  { value: "graduate", label: "Graduate" },
                  { value: "postgraduate", label: "Postgraduate" },
                ]}
                formData={formData}
                onChange={handleInputChange}
              />
              <InputField
                field="stream"
                label="Stream"
                options={[
                  { value: "science", label: "Science" },
                  { value: "commerce", label: "Commerce" },
                  { value: "arts", label: "Arts" },
                  { value: "engineering", label: "Engineering" },
                  { value: "medical", label: "Medical" },
                  { value: "other", label: "Other" },
                ]}
                formData={formData}
                onChange={handleInputChange}
              />
              <InputField
                field="schoolName"
                label="School"
                formData={formData}
                onChange={handleInputChange}
              />
              <InputField
                field="boardName"
                label="Board"
                options={[
                  { value: "cbse", label: "CBSE" },
                  { value: "icse", label: "ICSE / ISC" },
                  { value: "state_board", label: "State Board" },

                  { value: "nios", label: "NIOS" },
                  { value: "other", label: "Other" },
                ]}
                formData={formData}
                onChange={handleInputChange}
              />
              <InputField
                field="percentage"
                label="Score %"
                type="number"
                formData={formData}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="bg-white sm:p-8 p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="text-red-500" size={22} />
              <h3 className="text-lg font-bold">Address</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <InputField
                field="address.city"
                label="City"
                formData={formData}
                onChange={handleInputChange}
              />
              <InputField
                field="address.state"
                label="State"
                formData={formData}
                onChange={handleInputChange}
              />
              <InputField
                field="address.pincode"
                label="Pincode"
                formData={formData}
                onChange={handleInputChange}
              />
              <InputField
                field="address.street"
                label="Street"
                formData={formData}
                onChange={handleInputChange}
              />
              <InputField
                field="address.country"
                label="Country"
                formData={formData}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-white sm:p-8 p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <Target className="text-orange-500" size={22} />
              <h3 className="text-lg font-bold">Preferences & Budget</h3>
            </div>
            <div className="grid grid-cols-1 gap-x-8">
              <InputField
                field="interestedFields"
                label="Interested Fields"
                isArray={true}
                formData={formData}
                onArrayChange={handleArrayInputChange}
              />
              <InputField
                field="preferredLocations"
                label="Preferred Locations"
                isArray={true}
                formData={formData}
                onArrayChange={handleArrayInputChange}
              />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-gray-50 px-2">
                <span className="text-sm font-semibold text-gray-500 mb-2 sm:mb-0">
                  Budget Range
                </span>
                <div className="min-w-[60%] grid grid-cols-2 gap-2">
                  <input
                    key="budget-min"
                    type="number"
                    value={formData.budgetRange?.min || ""}
                    onChange={(e) =>
                      handleInputChange("budgetRange.min", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    placeholder="Min budget"
                  />
                  <input
                    key="budget-max"
                    type="number"
                    value={formData.budgetRange?.max || ""}
                    onChange={(e) =>
                      handleInputChange("budgetRange.max", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    placeholder="Max budget"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className=" bg-white sm:p-8 p-4 rounded-2xl shadow-sm border border-gray-100 ">
            <div className="flex items-center gap-3 mb-6">
              <Award className="text-yellow-400" size={26} />
              <h3 className="text-xl font-bold">Achievements</h3>
            </div>
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={newAchievement}
                onChange={(e) => setNewAchievement(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddAchievement()}
                placeholder="Ex: Gold Medalist"
                className="flex-1  border border-gray-300  rounded-xl px-4 py-2 text-sm outline-none "
              />
              <button
                onClick={handleAddAchievement}
                className="p-2 bg-yellow-400 text-white rounded-xl"
              >
                <Plus />
              </button>
            </div>
            <div className="space-y-3">
              {tempAchievements.map((ach, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between  p-3 rounded-xl border border-gray-300 group"
                >
                  <span className="text-sm">{ach}</span>
                  <button
                    onClick={() => handleDeleteAchievement(i)}
                    className="text-red-400 opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
