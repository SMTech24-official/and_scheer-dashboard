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

type Job = {
  id: any;
  postingDate: string;
  companyName: string;
  position: string;
  salaryRange: string;
  status: string;
  applicants: number;
  deadline: string;
  time: string;
  jobId: any;
};

const transformJobData = (jobs: any[]): Job[] => {
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

// Mapping from display headers to actual data property names
const columnMapping: Record<string, string> = {
  'Job ID': 'id',
  'Posting Date': 'postingDate',
  'Company Name': 'companyName',
  'Position': 'position',
  'Salary Range': 'salaryRange',
  'Status': 'status',
  'No. of Applicants': 'applicants',
  'Deadline': 'deadline',
  'Time': 'time',
  'Action': 'action'
};

export default function JobManagement() {
  const [selectedMetric, setSelectedMetric] = useState('All Posted Jobs');
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortColumn, setSortColumn] = useState<string>('postingDate');

  // Fetch data with pagination
  const { data: apiResponse, isLoading, isFetching } = useGetAllJobPostsQuery<any>({
    page: currentPage,
    limit: itemsPerPage
  });

  // Transform and memoize job data
  const transformedJobs = useMemo(() => transformJobData(apiResponse?.data?.data || []), [apiResponse]);

  // Sort the filtered jobs based on the selected column and sort order
  const sortedJobs = useMemo(() => {
    return transformedJobs.sort((a, b) => {
      if (sortColumn === 'postingDate' || sortColumn === 'deadline') {
        const dateA = new Date(a[sortColumn as keyof Job]);
        const dateB = new Date(b[sortColumn as keyof Job]);
        return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      } else if (sortColumn === 'applicants') {
        // Handle numeric sorting for applicants
        const numA = Number(a.applicants) || 0;
        const numB = Number(b.applicants) || 0;
        return sortOrder === 'asc' ? numA - numB : numB - numA;
      } else {
        // Handle string sorting for other columns
        const valueA = String(a[sortColumn as keyof Job] || '').toLowerCase();
        const valueB = String(b[sortColumn as keyof Job] || '').toLowerCase();
        return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
    });
  }, [transformedJobs, sortColumn, sortOrder]);

  // Apply client-side filtering
  const filteredJobs = useMemo(() => {
    if (selectedMetric === 'Open Jobs') {
      return sortedJobs.filter(job => job.status === 'ACTIVE');
    } else if (selectedMetric === 'Closed Jobs') {
      return sortedJobs.filter(job =>
        job.status === 'DELETED' ||
        job.status === 'SUSPENDED' ||
        job.status === 'CLOSED'
      );
    }
    return sortedJobs;
  }, [sortedJobs, selectedMetric]);

  const handleFilterChange = (value: string) => {
    setSelectedMetric(value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSort = (header: string) => {
    // Map the display header to the actual property name
    const column = columnMapping[header];
    
    if (!column || header === 'Action') return; // Don't sort action column
    
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  // Calculate display text for filtered results
  const resultsText = selectedMetric === 'All Posted Jobs'
    ? `Showing ${transformedJobs.length} of ${apiResponse?.data?.meta?.total || 0} jobs`
    : `Showing ${filteredJobs.length} jobs (filtered from ${apiResponse?.meta?.total || 0} total)`;

  const headers = [
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
  ];

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
              {headers.map((header) => (
                <th
                  key={header}
                  className={`font-normal py-3 text-left text-base xl:text-xl text-white ${
                    header !== 'Action' ? 'cursor-pointer hover:bg-primary/90' : ''
                  }`}
                  onClick={() => handleSort(header)}
                >
                  <div className={`flex items-center ${header === "Job ID" ? "ml-3" : ""}`}>
                    {header}
                    {/* Show sort arrows for sortable columns */}
                    {header !== 'Action' && (
                      <CgArrowsV 
                        className={`ml-1 ${
                          columnMapping[header] === sortColumn 
                            ? sortOrder === 'asc' ? 'rotate-180' : '' 
                            : 'opacity-60'
                        }`} 
                      />
                    )}
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

      {/* Pagination */}
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