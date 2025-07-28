'use client';

import { useEffect, useState } from 'react';
import { CgArrowsV } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { useGetAllJobPostsQuery } from '../../../redux/features/job/jobSlice';
import Pagination from '../usermanagement/PaginationBar';


// const jobData = [
//   {
//     id: 'J-1001',
//     postingDate: 'Jun 28, 2025',
//     companyName: 'TechNova Inc.',
//     position: 'Frontend Developer',
//     salaryRange: '$60,000 - $75,000',
//     status: 'Open',
//     applicants: 42,
//     deadline: 'Jul 10, 2025',
//     time: '10:00 AM',
//   },
//   {
//     id: 'J-1002',
//     postingDate: 'Jun 27, 2025',
//     companyName: 'Green Solutions',
//     position: 'Project Manager',
//     salaryRange: '$80,000 - $95,000',
//     status: 'Closed',
//     applicants: 67,
//     deadline: 'Jul 05, 2025',
//     time: '03:00 PM',
//   },
// ];

const StatusBadge = ({ status }: { status: string }) => {
  const isOpen = status === 'Open';
  const bg = isOpen ? 'bg-green-100' : 'bg-red-100';
  const text = isOpen ? 'text-green-800' : 'text-red-800';
  const border = isOpen ? 'border-green-200' : 'border-red-200';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text} ${border} border`}>
      {status}
    </span>
  );
};

export default function JobManagement() {
  const [selectedMetric, setSelectedMetric] = useState('All Jobs');
  const itemsPerPage = 11;
  const [currentPage, setCurrentPage] = useState(1);
  const {data:jobsdata,}=useGetAllJobPostsQuery()
  console.log("Job data:", jobsdata?.data.data);
  // Transform jobsdata to table format
  const [tableJobs, setTableJobs] = useState<any[]>([]);

  useEffect(() => {
    setCurrentPage(1);
    if (jobsdata?.data?.data) {
      let mappedJobs = jobsdata.data.data.map((job: any) => ({
        id: job.jobId || job.id,
        postingDate: job.createdAt ? new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
        companyName: job.company?.companyName || '',
        position: job.title,
        salaryRange: job.salaryRange,
        status: job.status === 'Active' ? 'Open' : 'Closed',
        applicants: job.applicantsCount || 0,
        deadline: job.deadline ? new Date(job.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
        time: job.deadline ? new Date(job.deadline).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '',
        jobId: job.id,
      }));

      // Filter by selectedMetric
      if (selectedMetric === 'Open Jobs') {
        mappedJobs = mappedJobs.filter((job: any) => job.status === 'Open');
      } else if (selectedMetric === 'Closed Jobs') {
        mappedJobs = mappedJobs.filter((job: any) => job.status === 'Closed');
      }
      setTableJobs(mappedJobs);
    }
  }, [selectedMetric, jobsdata]);

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
            className="px-4 py-2 border bg-background-dark text-white rounded-md"
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
            {jobsToShow.map((job: any) => (
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
            ))}
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
