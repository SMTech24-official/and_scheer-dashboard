"use client"

import { useEffect, useRef, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaCamera, FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDeleteJobPostMutation, useGetAllJobPostsQuery, useSuspendJobPostMutation } from "../../../redux/features/job/jobSlice";
import Loading from "../../shared/Loading";
import { useUpdateCompanyPostsMutation } from "../../../redux/features/company/companySlice";

export default function JobDetails() {
  const { id } = useParams();
  const { data: job, isLoading } = useGetAllJobPostsQuery({ page: 1, limit: 10 });
  const [jobData, setJobData] = useState<any>(null);
  const [originalJobData, setOriginalJobData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Thumbnail upload states
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [updatePosts] = useUpdateCompanyPostsMutation();
  const [deleteId] = useDeleteJobPostMutation();
  const [suspendJobPost] = useSuspendJobPostMutation();

  // Handle thumbnail file selection
  const handleThumbnailSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please select a valid image file (JPEG, PNG, or WebP)");
        return;
      }

      // Validate file size (e.g., max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        toast.error("File size must be less than 5MB");
        return;
      }

      setThumbnailFile(file);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);
    }
  };

  // Upload thumbnail function
  const uploadThumbnail = async (file: File) => {
    try {
      setIsUploadingThumbnail(true);
      const title = jobData.title
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('data', title);

      // Replace this with your actual upload endpoint
      const result = await updatePosts({id,formData})
      
      if (result.data) {
        toast.success("Thumbnail uploaded successfully");
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Thumbnail upload error:', error);
      toast.error("Failed to upload thumbnail");
      return null;
    } finally {
      setIsUploadingThumbnail(false);
    }
  };

  // Remove thumbnail
  const handleRemoveThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteJob = async () => {
    if (id) {
      try {
        const response = await deleteId(id);
        if (response?.data.success) {
          toast.success("Job deleted successfully");
        } else {
          toast.error("Failed to delete job");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the job");
      }
    }
  };

  const handleSuspendJob = async () => {
    if (id) {
      try {
        const response = await suspendJobPost(id);
        if (response?.data.success) {
          toast.success("Job suspended successfully");
        } else {
          toast.error("Failed to suspend job");
        }
      } catch (error) {
        toast.error("An error occurred while suspending the job");
      }
    }
  };

  const handleSaveJob = async () => {
    try {
      let updatedJobData = { ...jobData };

      // Upload thumbnail if a new file is selected
      if (thumbnailFile) {
        const newThumbnailUrl = await uploadThumbnail(thumbnailFile);
        if (newThumbnailUrl) {
          updatedJobData.thumbnail = newThumbnailUrl;
        }
      }

      console.log("Updated Job Data:", updatedJobData);
      await updatePosts({ id, data: updatedJobData });

      setOriginalJobData({ ...updatedJobData });
      setJobData(updatedJobData);
      setIsEditing(false);
      
      // Clear thumbnail states
      setThumbnailFile(null);
      setThumbnailPreview(null);
      
      toast.success("Job details updated successfully");

      const changes = getChanges(originalJobData, updatedJobData);
      if (Object.keys(changes).length > 0) {
        console.log("Changes made:", changes);
      }
    } catch (error) {
      toast.error("Failed to save job details");
    }
  };

  const getChanges = (original: any, updated: any) => {
    const changes: any = {};
    
    if (!original || !updated) return changes;
    
    const fieldsToCompare = ['title', 'location', 'experience', 'deadline', 'salaryRange', 'salaryType', 'jobType', 'thumbnail'];
    
    fieldsToCompare.forEach(field => {
      if (original[field] !== updated[field]) {
        changes[field] = {
          old: original[field],
          new: updated[field]
        };
      }
    });
    
    if (JSON.stringify(original.skills) !== JSON.stringify(updated.skills)) {
      changes.skills = {
        old: original.skills,
        new: updated.skills
      };
    }
    
    if (JSON.stringify(original.features) !== JSON.stringify(updated.features)) {
      changes.features = {
        old: original.features,
        new: updated.features
      };
    }
    
    return changes;
  };

  const handleCancelEdit = () => {
    setJobData({ ...originalJobData });
    setIsEditing(false);
    setThumbnailFile(null);
    setThumbnailPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.info("Edit cancelled");
  };

  const updateJobData = (field: string, value: any) => {
    setJobData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const updateFeature = (featureTitle: string, field: string, value: any) => {
    setJobData((prev: any) => ({
      ...prev,
      features: prev.features?.map((feature: any) => 
        feature.featureTitle.toLowerCase().includes(featureTitle.toLowerCase())
          ? { ...feature, [field]: value }
          : feature
      ) || []
    }));
  };

  const updateSkills = (skillsString: string) => {
    const skillsArray = skillsString.split('•').map(skill => skill.trim()).filter(skill => skill);
    updateJobData('skills', skillsArray);
  };

  useEffect(() => {
    if (job?.data.data && id) {
      const foundJob = job.data.data.find((item: any) => item.id === id);
      setJobData(foundJob);
      setOriginalJobData({ ...foundJob });
    }
  }, [job, id]);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (thumbnailPreview) {
        URL.revokeObjectURL(thumbnailPreview);
      }
    };
  }, [thumbnailPreview]);

  if (isLoading) {
    return <Loading />;
  }

  if (!jobData) {
    return <div className="p-6">Job not found.</div>;
  }

  const {
    title,
    jobType,
    experience,
    deadline,
    location,
    salaryRange,
    salaryType,
    skills,
    features,
    noOfApplicants,
    createdAt,
    company,
    status,
    thumbnail
  } = jobData;

  const getFeature = (title: string) =>
    features?.find((f: any) => f.featureTitle.toLowerCase().includes(title.toLowerCase()));

  const description = getFeature("description")?.paragraph || "";
  const responsibilities = getFeature("responsibilities")?.point || [];
  const requirements = getFeature("requirements")?.point || [];
  const whyJoin = getFeature("why join")?.point || [];

  const formattedDeadline = deadline ? new Date(deadline).toLocaleDateString() : "";
  const formattedCreatedAt = createdAt ? new Date(createdAt).toLocaleDateString() : "";

  // Get current thumbnail URL (preview if editing, otherwise original)
  const currentThumbnailUrl = thumbnailPreview || thumbnail;

  return (
    <div className="min-h-screen p-6 w-full">
      <div className="mx-auto bg-white rounded-lg shadow-sm md:px-12 py-8">
        {/* Header Section */}
        <div className="relative p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between">
            <div className="flex flex-col md:flex-row items-start space-x-4">
              {/* Thumbnail Section */}
              <div className="w-20 h-20 md:w-[180px] md:h-[180px] rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden relative group">
                {currentThumbnailUrl ? (
                  <img
                    src={currentThumbnailUrl}
                    alt={company?.companyName}
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-md">
                    <span className="text-gray-400 text-2xl md:text-[65px] font-bold">
                      {company?.companyName?.split(" ").map((w: string) => w[0]).join("").toUpperCase() || "?"}
                    </span>
                  </div>
                )}
                
                {/* Thumbnail Upload Overlay (only in edit mode) */}
                {isEditing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploadingThumbnail}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors disabled:opacity-50"
                        title="Change thumbnail"
                      >
                        {isUploadingThumbnail ? (
                          <FaSpinner className="animate-spin" />
                        ) : (
                          <FaCamera />
                        )}
                      </button>
                      {(thumbnailFile || thumbnail) && (
                        <button
                          onClick={handleRemoveThumbnail}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                          title="Remove thumbnail"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleThumbnailSelect}
                  className="hidden"
                />
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center"> 
                  <div className="mr-3">
                    <img
                      src={company.logo}
                      alt={company.companyName}
                      className="w-24 h-24 rounded-full border border-gray-200 shadow-md bg-white"
                    />
                  </div>
                  {company?.companyName}
                </h1>
                
                <div className="mt-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={title || ""}
                      onChange={(e) => updateJobData('title', e.target.value)}
                      className="text-xl font-semibold text-gray-800 border border-gray-300 rounded px-2 py-1 w-full max-w-md"
                      placeholder="Job Title"
                    />
                  ) : (
                    <h2 className="text-xl font-semibold text-gray-800 inline">{title}</h2>
                  )}
                  <span className="ml-2 text-green-600 font-medium">
                    ({isEditing ? (
                      <select
                        value={jobType || ""}
                        onChange={(e) => updateJobData('jobType', e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="onsite">Onsite</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="remote">Remote</option>
                      </select>
                    ) : (
                      jobType?.charAt(0).toUpperCase() + jobType?.slice(1)
                    )})
                  </span>
                </div>

                {/* Job Info */}
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CiLocationOn className="mr-1" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={location || ""}
                        onChange={(e) => updateJobData('location', e.target.value)}
                        className="text-sm text-gray-600 border border-gray-300 rounded px-2 py-1"
                        placeholder="Location"
                      />
                    ) : (
                      <span>{location}</span>
                    )}
                  </div>
                  <span>•</span>
                  <span>
                    {isEditing ? (
                      <input
                        type="text"
                        value={experience || ""}
                        onChange={(e) => updateJobData('experience', e.target.value)}
                        className="text-sm text-gray-600 border border-gray-300 rounded px-2 py-1"
                        placeholder="Experience"
                      />
                    ) : (
                      experience
                    )}
                  </span>
                  <span>•</span>
                  <span>Uploaded {formattedCreatedAt}</span>
                  <span>•</span>
                  <span>Over {noOfApplicants} applicant{noOfApplicants !== 1 ? "s" : ""}</span>
                </div>

                {/* Skills */}
                <div className="mt-3">
                  <span className="text-sm font-medium text-gray-700">Skill Needed: </span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={skills?.join(" • ") || ""}
                      onChange={(e) => updateSkills(e.target.value)}
                      className="text-sm text-gray-600 border border-gray-300 rounded px-2 py-1 w-full max-w-md mt-1"
                      placeholder="Skill1 • Skill2 • Skill3"
                    />
                  ) : (
                    <span className="text-sm text-gray-600">{skills?.join(" • ")}</span>
                  )}
                </div>

                {/* Application Deadline */}
                <div className="mt-2">
                  <span className="text-sm font-medium text-gray-700">Application Deadline: </span>
                  {isEditing ? (
                    <input
                      type="date"
                      value={deadline ? deadline.split('T')[0] : ""}
                      onChange={(e) => updateJobData('deadline', e.target.value)}
                      className="text-sm text-gray-600 border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    <span className="text-sm text-gray-600">{formattedDeadline}</span>
                  )}
                </div>

                {/* Salary */}
                <div className="mt-4 flex items-center flex-wrap gap-2">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={salaryRange || ""}
                        onChange={(e) => updateJobData('salaryRange', e.target.value)}
                        className="text-2xl font-bold text-green-600 border border-gray-300 rounded px-2 py-1"
                        placeholder="$50,000 - $70,000"
                      />
                      <span className="text-lg text-gray-600">/</span>
                      <select
                        value={salaryType || ""}
                        onChange={(e) => updateJobData('salaryType', e.target.value)}
                        className="text-lg text-gray-600 border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="year">Year</option>
                        <option value="month">Month</option>
                        <option value="hour">Hour</option>
                      </select>
                    </>
                  ) : (
                    <>
                      <span className="md:text-3xl text-2xl font-bold text-green-600">{salaryRange}</span>
                      <span className="text-lg text-gray-600">/{salaryType?.charAt(0).toUpperCase() + salaryType?.slice(1)}</span>
                    </>
                  )}
                </div>

                {/* File upload status */}
                {thumbnailFile && (
                  <div className="mt-2 text-sm text-blue-600">
                    📎 New thumbnail selected: {thumbnailFile.name}
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-3 mt-4 lg:mt-0">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveJob}
                    disabled={isUploadingThumbnail}
                    className="bg-primary hover:bg-green-600 cursor-pointer transition text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
                  >
                    {isUploadingThumbnail ? "Uploading..." : "Save Changes"}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSuspendJob}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    {status === "ACTIVE" ? "Suspend Job" : "Activate Job"}
                  </button>
                  <button
                    onClick={handleDeleteJob}
                    className="border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Delete Job
                  </button>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-gray-500 hover:bg-gray-600 cursor-pointer text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Edit Job
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg md:text-[28px] font-semibold mb-3">Job Description:</h3>
          {isEditing ? (
            <textarea
              value={description}
              onChange={(e) => updateFeature("description", "paragraph", e.target.value)}
              className="w-full border border-gray-300 rounded p-3 h-32 resize-vertical"
              placeholder="Enter job description..."
            />
          ) : (
            <p className="text-gray-700 leading-relaxed">{description}</p>
          )}
        </div>

        {/* Responsibilities */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg md:text-[28px] font-semibold mb-3">Responsibilities:</h3>
          {isEditing ? (
            <div className="space-y-2">
              {responsibilities.map((item: string, idx: number) => (
                <div key={idx} className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newResponsibilities = [...responsibilities];
                      newResponsibilities[idx] = e.target.value;
                      updateFeature("responsibilities", "point", newResponsibilities);
                    }}
                    className="flex-1 border border-gray-300 rounded px-2 py-1"
                  />
                  <button
                    onClick={() => {
                      const newResponsibilities = responsibilities.filter((_: any, i: number) => i !== idx);
                      updateFeature("responsibilities", "point", newResponsibilities);
                    }}
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newResponsibilities = [...responsibilities, ""];
                  updateFeature("responsibilities", "point", newResponsibilities);
                }}
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                + Add Responsibility
              </button>
            </div>
          ) : (
            <ul className="space-y-2 text-gray-700">
              {responsibilities.map((item: string, idx: number) => (
                <li className="flex items-start" key={idx}>
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Requirements */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg md:text-[28px] font-semibold mb-3">Requirements:</h3>
          {isEditing ? (
            <div className="space-y-2">
              {requirements.map((item: string, idx: number) => (
                <div key={idx} className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newRequirements = [...requirements];
                      newRequirements[idx] = e.target.value;
                      updateFeature("requirements", "point", newRequirements);
                    }}
                    className="flex-1 border border-gray-300 rounded px-2 py-1"
                  />
                  <button
                    onClick={() => {
                      const newRequirements = requirements.filter((_: any, i: number) => i !== idx);
                      updateFeature("requirements", "point", newRequirements);
                    }}
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newRequirements = [...requirements, ""];
                  updateFeature("requirements", "point", newRequirements);
                }}
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                + Add Requirement
              </button>
            </div>
          ) : (
            <ul className="space-y-2 text-gray-700">
              {requirements.map((item: string, idx: number) => (
                <li className="flex items-start" key={idx}>
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Why Join */}
        <div className="p-6">
          <h3 className="text-lg md:text-[28px] font-semibold mb-3">Why Join {company?.companyName}?</h3>
          {isEditing ? (
            <div className="space-y-2">
              {whyJoin.map((item: string, idx: number) => (
                <div key={idx} className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newWhyJoin = [...whyJoin];
                      newWhyJoin[idx] = e.target.value;
                      updateFeature("why join", "point", newWhyJoin);
                    }}
                    className="flex-1 border border-gray-300 rounded px-2 py-1"
                  />
                  <button
                    onClick={() => {
                      const newWhyJoin = whyJoin.filter((_: any, i: number) => i !== idx);
                      updateFeature("why join", "point", newWhyJoin);
                    }}
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newWhyJoin = [...whyJoin, ""];
                  updateFeature("why join", "point", newWhyJoin);
                }}
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                + Add Benefit
              </button>
            </div>
          ) : (
            <ul className="space-y-2 text-gray-700">
              {whyJoin.map((item: string, idx: number) => (
                <li className="flex items-start" key={idx}>
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}