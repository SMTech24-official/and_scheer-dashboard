'use client';

import { useState } from 'react';
import { CgArrowsV } from 'react-icons/cg';
import Pagination from './PaginationBar';
import { Link } from 'react-router-dom';
import { useGetAllCompaniesQuery } from '../../../redux/features/company/companySlice';
import { useGetAllUsersQuery } from '../../../redux/features/userManger/userApi';

const aiLogData = [
  {
    id: 1,
    timestamp: 'Jun 30, 2025 | 10:45 AM',
    userName: 'Rafiq Islam',
    projectName: 'Skyline Tower',
    role: 'Job Seeker',
    status: 'Success',
    notes: 'No issues found.',
  },
  {
    id: 2,
    timestamp: 'Jun 30, 2025 | 09:10 AM',
    userName: 'Nusrat Jahan',
    projectName: 'Green Valley',
    role: 'Job Seeker',
    status: 'Failed',
    notes: 'Unsupported file format.',
  },
  {
    id: 3,
    timestamp: 'Jun 29, 2025 | 03:33 PM',
    userName: 'Tanvir Hasan',
    projectName: 'Bridge Point',
    role: 'Job Seeker',
    status: 'Success',
    notes: 'Manually reviewed post-extraction.',
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  const isSuccess = status === 'Success';
  const bg = isSuccess ? 'bg-green-100' : 'bg-red-100';
  const text = isSuccess ? 'text-green-800' : 'text-red-800';
  const border = isSuccess ? 'border-green-200' : 'border-red-200';



  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text} ${border} border`}>
      {status}
    </span>
  );
};

export default function UserManagement() {

  const [selectedMetric, setSelectedMetric] = useState('All User');
  const [user,setUser] = useState(null);
  const { data: userdata, isLoading } = useGetAllUsersQuery();
  console.log("Companies data:", userdata?.data);


  const totalItems = 1450;
  const itemsPerPage = 11;
  const [currentPage, setCurrentPage] = useState(userdata?.meta.page || 1);


  return (
    <div className="md:px-12 min-h-screen mt-8">
      {/* Table Title */}
      <div className="py-4 border-gray-200 flex justify-between">
        <h2 className="text-lg md:text-[32px] font-semibold text-gray-900">{selectedMetric}</h2>
        <div>
          <div className="flex items-center gap-4">
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-4 py-2 border bg-background-dark text-white rounded-md   "
            >
              <option value="All User">All User</option>
              <option value="Job Seeker">Job Seeker</option>
              <option value="Employee/Company">Employee/Company</option>

            </select>

          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table className="w-full min-w-[900px]">
          {/* Table Header */}
          <thead className="bg-primary ">
            <tr className=''>
              <th className="font-normal py-3 text-left text-base lg:text-xl text-white">
                <div className="flex items-center font-normal   ml-3 ">
                  Joining Date & Time
                  <CgArrowsV className="my-auto ml-1" />
                </div>
              </th>
              <th className=" py-3 text-left text-base lg:text-xl text-white">
                <div className="flex items-center font-normal ">
                  User Name
                  <CgArrowsV className="my-auto ml-1" />
                </div>
              </th>
              <th className=" py-3 text-left text-base lg:text-xl text-white">
                <div className="flex items-center font-normal ">
                  Email Address
                  <CgArrowsV className="my-auto ml-1" />
                </div>
              </th>
              <th className=" py-3 text-left text-base lg:text-xl text-white">
                <div className="flex items-center font-normal ">
                  Company Name
                  <CgArrowsV className="my-auto ml-1" />
                </div>
              </th>
              <th className=" py-3 text-left text-base lg:text-xl text-white">
                <div className="flex items-center font-normal ">
                  Role
                  <CgArrowsV className="my-auto ml-1" />
                </div>
              </th>
              <th className=" py-3 text-left text-base lg:text-xl text-white">
                <div className="flex items-center font-normal ">
                  Status
                  <CgArrowsV className="my-auto ml-1" />
                </div>
              </th>
              <th className=" py-3 text-left text-base lg:text-xl text-white">
                <div className="flex items-center font-normal ">
                  Action
                  <CgArrowsV className="my-auto ml-1" />
                </div>
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100">
            {userdata?.data.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className=" py-4 text-sm md:text-[16px] text-info ">
                  <div className='ml-3'>
                    {/* {row.timestamp} */}
                  </div>

                </td>
                <td className=" py-4 text-sm md:text-[16px] text-info">
                  {user.fullName}
                </td>
                <td className=" py-4 text-sm md:text-[16px] text-info">
                  {user.email}
                </td>
                <td className=" py-4 text-sm md:text-[16px] text-info">
                  {/* {row.projectName} */}
                </td>
                <td className=" py-4 text-sm md:text-[16px] text-info">
                  {user.role}
                </td>
                <td className=" py-4 text-sm md:text-[16px] text-info">
                  {/* <StatusBadge status={row.status} /> */}
                </td>
                <td className=" py-4 text-sm md:text-[16px] text-info cursor-pointer">
                  {/* {
                  row.role=='Job Seeker' &&  <Link to='/dashboard/user-management/seekers-details'>View Details </Link>
                  } */}
                  {/* {
                  row.role=='Employers' &&  <Link to='/dashboard/user-management/company-details'>View Details </Link>
                  } */}
                 <Link to='/dashboard/user-management/company-details'>View Details </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalItems={userdata?.meta.total || 0}
        itemsPerPage={userdata?.meta.limit || 10}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

    </div>
  );
}