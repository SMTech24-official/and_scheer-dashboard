import { useMemo, useState } from "react";
import { CgArrowsV } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useGetAllJobPostsQuery } from "../../../redux/features/job/jobSlice";
import Pagination from "../usermanagement/PaginationBar";

const statusStyles: Record<string, { bg: string; text: string; border: string }> = {
  ACTIVE: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
  SUSPENDED: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
  DELETED: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
  CLOSED: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' },
};

const StatusBadge = ({ status }: { status: string }) => {
  const style = statusStyles[status.toUpperCase()] || { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text} ${style.border} border`}>
      {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
    </span>
  );
};

const transformJobData = (jobs: any[]) => {
  return jobs?.map((job) => ({
    id: job.jobId || job.id,
    postingDate: job.createdAt ? new Date(job.createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) : 'N/A',
    companyName: job.company?.companyName || 'N/A',
    position: job.title,
    salaryRange: job.salaryRange || 'Not specified',
    status: job.status,
    applicants: job.noOfApplicants ?? job.applicantsCount ?? 0,
    deadline: job.deadline ? new Date(job.deadline).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) : 'N/A',
    time: job.deadline ? new Date(job.deadline).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }) : 'N/A',
    jobId: job.id,
  })) || [];
};

export default function JobManagement() {
  const [selectedMetric, setSelectedMetric] = useState('All Posted Jobs');
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  
  // Fetch data with pagination
  const { data: apiResponse, isLoading, isFetching } = useGetAllJobPostsQuery<any>({
    page: currentPage,
    limit: itemsPerPage
  });

  // Transform and memoize job data
  const transformedJobs = useMemo(() => transformJobData(apiResponse?.data?.data || []), [apiResponse]);

  // Apply client-side filtering
  const filteredJobs = useMemo(() => {
    if (selectedMetric === 'Open Jobs') {
      return transformedJobs.filter(job => job.status === 'ACTIVE');
    } else if (selectedMetric === 'Closed Jobs') {
      return transformedJobs.filter(job => 
        job.status === 'DELETED' || 
        job.status === 'SUSPENDED' || 
        job.status === 'CLOSED'
      );
    }
    return transformedJobs;
  }, [transformedJobs, selectedMetric]);

  const handleFilterChange = (value: string) => {
    setSelectedMetric(value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  console.log(apiResponse?.data?.meta?.total)

  // Calculate display text for filtered results
  const resultsText = selectedMetric === 'All Posted Jobs' 
    ? `Showing ${transformedJobs.length} of ${apiResponse?.data?.meta?.total || 0} jobs`
    : `Showing ${filteredJobs.length} jobs (filtered from ${apiResponse?.meta?.total || 0} total)`;

  return (
    <div className="md:px-12 min-h-screen mt-8">
      {/* Title Bar */}
      <div className="py-4 border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-lg md:text-[32px] font-semibold text-gray-900">{selectedMetric}</h2>
          <p className="text-sm text-gray-500 mt-1">{resultsText}</p>
        </div>
        <div>
          <select
            value={selectedMetric}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="px-4 py-2 border bg-primary text-white rounded-md"
          >
            <option value="All Posted Jobs">All Posted Jobs</option>
            <option value="Open Jobs">Open Jobs</option>
            <option value="Closed Jobs">Closed Jobs</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table className="w-full min-w-[1200px]">
          <thead className="bg-primary">
            <tr>
              {[
                'Job ID',
                'Posting Date',
                'Company Name',
                'Position',
                'Salary Range',
                'Status',
                'No. of Applicants',
                'Deadline',
                'Time',
                'Action',
              ].map((header) => (
                <th
                  key={header}
                  className="font-normal py-3 text-left text-base lg:text-xl text-white"
                >
                  <div className={`flex ${header === "Job ID" ? "ml-3" : ""}`}>
                    {header}
                    <CgArrowsV className="my-auto ml-1" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {(isLoading || isFetching) ? (
              <tr>
                <td colSpan={10} className="py-4">
                  <div className="animate-pulse space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-8 bg-gray-300 rounded w-[98%] mx-auto"></div>
                    ))}
                  </div>
                </td>
              </tr>
            ) : filteredJobs.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-8 text-center text-gray-500">
                  No jobs found matching your criteria
                </td>
              </tr>
            ) : (
              filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 text-sm md:text-[16px] text-info">
                    <div className='ml-3'>{job.id}</div>
                  </td>
                  <td className="py-4 text-sm md:text-[16px] text-info">{job.postingDate}</td>
                  <td className="py-4 text-sm md:text-[16px] text-info">{job.companyName}</td>
                  <td className="py-4 text-sm md:text-[16px] text-info">{job.position}</td>
                  <td className="py-4 text-sm md:text-[16px] text-info">{job.salaryRange}</td>
                  <td className="py-4 text-sm md:text-[16px] text-info">
                    <StatusBadge status={job.status} />
                  </td>
                  <td className="py-4 text-sm md:text-[16px] text-info">{job.applicants}</td>
                  <td className="py-4 text-sm md:text-[16px] text-info">{job.deadline}</td>
                  <td className="py-4 text-sm md:text-[16px] text-info">{job.time}</td>
                  <td className="py-4 text-sm md:text-[16px] text-info cursor-pointer hover:underline text-primary">
                    <Link to={`/dashboard/job-management/job-details/${job.jobId}`}>View</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination - using server-side total count */}
      {!isLoading && (
        <Pagination
          totalItems={apiResponse?.data?.meta?.total || 0}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}