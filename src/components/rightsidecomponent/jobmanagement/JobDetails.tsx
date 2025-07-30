"use client"

import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci"
import { useParams } from "react-router-dom";
import { useDeleteJobPostMutation, useGetAllJobPostsQuery, useSuspendJobPostMutation } from "../../../redux/features/job/jobSlice";
import { toast } from "sonner";

export default function JobDetails() {
  const { id } = useParams();
  const { data: job, isLoading } = useGetAllJobPostsQuery({ page: 1, limit: 20 });
  const [jobData, setJobData] = useState<any>(null);


  // Mutation for deleting a job post
  const [deleteId] = useDeleteJobPostMutation();
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

  // suspend job post
  const [suspendJobPost] = useSuspendJobPostMutation();
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

  useEffect(() => {
    if (job?.data.data && id) {
      const foundjob = job.data.data.find((item: any) => item.id === id);
      setJobData(foundjob);
    }
  }, [job, id]);

  if (isLoading || !job) {
    return <div className="p-6">Loading...</div>;
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
    status
  } = jobData;

  const getFeature = (title: string) =>
    features?.find((f: any) => f.featureTitle.toLowerCase().includes(title.toLowerCase()));

  const description = getFeature("description")?.paragraph;
  const responsibilities = getFeature("responsibilities")?.point || [];
  const requirements = getFeature("requirements")?.point || [];
  const whyJoin = getFeature("why join")?.point || [];

  const formattedDeadline = deadline ? new Date(deadline).toLocaleDateString() : "";
  const formattedCreatedAt = createdAt ? new Date(createdAt).toLocaleDateString() : "";




  return (
    <div className="min-h-screen p-6 w-full">
      <div className="mx-auto bg-white rounded-lg shadow-sm md:px-12 py-8">
        {/* Header Section */}
        <div className="relative p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between">
            <div className="flex flex-col md:flex-row items-start space-x-4">
              <div className="w-20 h-20 md:w-[180px] md:h-[180px] bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                {company?.logo ? (
                  <img src={company.logo} alt={company.companyName} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-white text-2xl md:text-[65px] font-bold">
                    {company?.companyName?.split(" ").map((w: string) => w[0]).join("").toUpperCase() || "?"}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">{company?.companyName}</h1>
                <div className="mt-2">
                  <h2 className="text-xl font-semibold text-gray-800 inline">{title}</h2>
                  <span className="ml-2 text-green-600 font-medium">
                    ({jobType?.charAt(0).toUpperCase() + jobType?.slice(1)})
                  </span>
                </div>
                {/* Job Info */}
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CiLocationOn className="mr-1" />
                    <span>{location}</span>
                  </div>
                  <span>•</span>
                  <span>{experience}</span>
                  <span>•</span>
                  <span>Uploaded {formattedCreatedAt}</span>
                  <span>•</span>
                  <span>Over {noOfApplicants} applicant{noOfApplicants !== 1 ? "s" : ""}</span>
                </div>
                {/* Skills */}
                <div className="mt-3">
                  <span className="text-sm font-medium text-gray-700">Skill Needed: </span>
                  <span className="text-sm text-gray-600">
                    {skills?.join(" • ")}
                  </span>
                </div>
                {/* Application Deadline */}
                <div className="mt-2">
                  <span className="text-sm font-medium text-gray-700">Application Deadline: </span>
                  <span className="text-sm text-gray-600">{formattedDeadline}</span>
                </div>
                {/* Salary */}
                <div className="mt-4">
                  <span className="md:text-3xl text-2xl font-bold text-green-600 ">{salaryRange}</span>
                  <span className="text-lg text-gray-600 ml-1">/{salaryType?.charAt(0).toUpperCase() + salaryType?.slice(1)}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-3 mt-4 lg:mt-0">
              <button
              onClick={handleSuspendJob}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium flex">
                {status === "ACTIVE" ? "Suspend Job" : "Activate Job"}
              </button>
              <button 
                onClick={handleDeleteJob}
                
            

               className="border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded-md text-sm font-medium">
                Delete Job
              </button>
            </div>
          </div>
        </div>
        {/* Job Description */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg md:text-[28px] font-semibold mb-3">Job Description:</h3>
          <p className="text-gray-700 leading-relaxed">
            {description}
          </p>
        </div>
        {/* Responsibilities */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg md:text-[28px] font-semibold mb-3">Responsibilities:</h3>
          <ul className="space-y-2 text-gray-700">
            {responsibilities.map((item: string, idx: number) => (
              <li className="flex items-start" key={idx}>
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* Requirements */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg md:text-[28px] font-semibold mb-3">Requirements:</h3>
          <ul className="space-y-2 text-gray-700">
            {requirements.map((item: string, idx: number) => (
              <li className="flex items-start" key={idx}>
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* Why Join */}
        <div className="p-6">
          <h3 className="text-lg md:text-[28px] font-semibold mb-3">Why Join {company?.companyName}?</h3>
          <ul className="space-y-2 text-gray-700">
            {whyJoin.map((item: string, idx: number) => (
              <li className="flex items-start" key={idx}>
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
