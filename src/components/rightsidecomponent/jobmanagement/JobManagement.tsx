import { useEffect, useState } from "react";
import { useGetAllJobPostsQuery } from "../../../redux/features/job/jobSlice";
import { Link } from "react-router-dom";
import Pagination from "../usermanagement/PaginationBar";
import { CgArrowsV } from "react-icons/cg";

// StatusBadge now supports more statuses and colors
const statusStyles: Record<string, { bg: string; text: string; border: string }> = {
  ACTIVE:    { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
  SUSPENDED: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
  DELETED:   { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
  CLOSED:    { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' },
  OPEN:      { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
};

const StatusBadge = ({ status }: { status: string }) => {
  const style = statusStyles[status.toUpperCase()] || { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text} ${style.border} border`}>
      {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
    </span>
  );
};

export default function JobManagement() {
  const [selectedMetric, setSelectedMetric] = useState('All Posted Jobs');
  const itemsPerPage = 11;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: jobsdata, isLoading } = useGetAllJobPostsQuery({ page: currentPage, limit: itemsPerPage });
  const [tableJobs, setTableJobs] = useState<any[]>([]);
  console.log()

  useEffect(() => {
    setCurrentPage(1);
    if (jobsdata?.data?.data) {
      let mappedJobs = jobsdata.data.data.map((job: any) => ({
        id: job.jobId || job.id,
        postingDate: job.createdAt ? new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
        companyName: job.company?.companyName || '',
        position: job.title,
        salaryRange: job.salaryRange,
        status: job.status, // Use the original status string
        applicants: job.noOfApplicants ?? job.applicantsCount ?? 0,
        deadline: job.deadline ? new Date(job.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
        time: job.deadline ? new Date(job.deadline).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '',
        jobId: job.id,
      }));

      // Filter by selectedMetric
      if (selectedMetric === 'Open Jobs') {
        mappedJobs = mappedJobs.filter((job: any) => job.status === 'ACTIVE');
      } else if (selectedMetric === 'Closed Jobs') {
        mappedJobs = mappedJobs.filter((job: any) => job.status === 'DELETED' || job.status === 'SUSPENDED' || job.status === 'CLOSED');
      }
      setTableJobs(mappedJobs);
    }
  }, [selectedMetric, jobsdata]);

  // ...rest of your component remains unchanged
 // Use tableJobs for rendering
  const jobsToShow = tableJobs.length > 0 ? tableJobs : [];
  console.log("Jobs to show:", jobsToShow);

  return (
    <div className="md:px-12 min-h-screen mt-8">
      {/* Title Bar */}
      <div className="py-4 border-gray-200 flex justify-between">
        <h2 className="text-lg md:text-[32px] font-semibold text-gray-900">{selectedMetric}</h2>
        <div>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
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
                  <div className={`flex ${header === "Job ID"? "ml-3":""}  `}>
                    {header}
                    <CgArrowsV className="my-auto ml-1" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
              {

                isLoading? (<tr>
                <td colSpan={10} className="py-4">
                  {/* Skeleton Loader */}
                  <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-300 rounded w-11/12 mx-auto"></div>
                    <div className="h-6 bg-gray-300 rounded w-11/12 mx-auto"></div>
                    <div className="h-6 bg-gray-300 rounded w-11/12 mx-auto"></div>
                    <div className="h-6 bg-gray-300 rounded w-11/12 mx-auto"></div>
                    <div className="h-6 bg-gray-300 rounded w-11/12 mx-auto"></div>
                  </div>
                </td>
              </tr>):
              (jobsToShow?.map((job: any) => (
              <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 text-sm md:text-[16px] text-info ">
                  <div className='ml-3'>    {job.id}</div>
              
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
            )))
              }

            
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        totalItems={tableJobs.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
