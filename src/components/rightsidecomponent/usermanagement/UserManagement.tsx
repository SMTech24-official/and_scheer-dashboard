'use client';

import { useEffect, useState } from 'react';
import { CgArrowsV } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import Pagination from './PaginationBar';
import { format } from 'date-fns';
import { useGetAllUsersQuery } from '../../../redux/features/userManger/userApi';

export default function UserManagement() {
  const [selectedMetric, setSelectedMetric] = useState('All User');
  const [userData, setUserData] = useState<any[]>([]);
   const [currentPage, setCurrentPage] = useState(1);
  // const { data: userdata } = useGetAllUsersQuery();
  const { data:userdata , isLoading} = useGetAllUsersQuery({ page: currentPage, limit: 10 })
  

  useEffect(() => {
    if (userdata?.data) {
      setUserData(userdata.data);
    }
  }, [userdata?.data]);

 

  // Filter users based on selectedMetric
  const filteredUsers = userData.filter((user) => {
    if (selectedMetric === "All User") return true;
    if (selectedMetric === "Job Seeker") return user.role === "JOB_SEEKER";
    if (selectedMetric === "Employee/Company") return user.role === "EMPLOYEE";
    return true;
  });

  

const handlePageChange = (newPage: number) => {
  
  setCurrentPage(newPage);
};

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
              className="px-4 py-2 border bg-primary text-white rounded-md "
            >
              <option  value="All User">All User</option>
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
            <tr>
              <th className="font-normal py-3 text-left text-base lg:text-xl text-white">
                <div className="flex items-center font-normal ml-3 ">
                  Joining Date & Time
                  <CgArrowsV className="my-auto ml-1" />
                </div>
              </th>
              <th className="py-3 text-left text-base lg:text-xl text-white">
                <div className="flex items-center font-normal ">
                  User Name
                  <CgArrowsV className="my-auto ml-1" />
                </div>
              </th>
              <th className="py-3 text-left text-base lg:text-xl text-white">
                <div className="flex items-center font-normal ">
                  Email Address
                  <CgArrowsV className="my-auto ml-1" />
                </div>
              </th>
              <th className="py-3 text-left text-base lg:text-xl text-white">
                <div className="flex items-center font-normal ">
                  Company Name
                  <CgArrowsV className="my-auto ml-1" />
                </div>
              </th>
              <th className="py-3 text-left text-base lg:text-xl text-white">
                <div className="flex items-center font-normal ">
                  Role
                  <CgArrowsV className="my-auto ml-1" />
                </div>
              </th>
              <th className="py-3 text-left text-base lg:text-xl text-white">
                <div className="flex items-center font-normal ">
                  Status
                  <CgArrowsV className="my-auto ml-1" />
                </div>
              </th>
              <th className="py-3 text-left text-base lg:text-xl text-white">
                <div className="flex items-center font-normal ">
                  Action
                  <CgArrowsV className="my-auto ml-1" />
                </div>
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100">
             {isLoading ? (
              <tr>
                <td colSpan={7} className="py-4">
                  {/* Skeleton Loader */}
                  <div className="animate-pulse space-y-4">
                       <div className="h-6 bg-gray-300 rounded w-11/12 mx-auto"></div>
                    <div className="h-6 bg-gray-300 rounded w-11/12 mx-auto"></div>
                    <div className="h-6 bg-gray-300 rounded w-11/12 mx-auto"></div>
                    <div className="h-6 bg-gray-300 rounded w-11/12 mx-auto"></div>
                    <div className="h-6 bg-gray-300 rounded w-11/12 mx-auto"></div>
                  </div>
                </td>
              </tr>
            ) :


           ( filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 text-sm md:text-[16px] text-info">
                  <div className='ml-3'>
                    {user.createdAt ? format(new Date(user.createdAt), 'dd MMM yyyy') : 'N/A'}
                  </div>
                </td>
                <td className="py-4 text-sm md:text-[16px] text-info">
                  {user.fullName}
                </td>
                <td className="py-4 text-sm md:text-[16px] text-info">
                  {user.email}
                </td>
                <td className="py-4 text-sm md:text-[16px] text-info">
                  {user.companyName}
                </td>
                <td className="py-4 text-sm md:text-[16px] text-info">
                  {user.role}
                </td>
                <td className="py-4 text-sm md:text-[16px] text-info">
                  {/* Status badge or info here */}

                  {user?.status}
                </td>
                <td className="py-4 text-sm md:text-[16px] text-info cursor-pointer">
                  {user?.role === "EMPLOYEE" && (
                    <Link to={`/dashboard/user-management/company-details/${user.id}`}>View Details</Link>
                  )}
                  {user?.role === "JOB_SEEKER" && (
                    <Link to={`/dashboard/user-management/seeker-details/${user.id}`}>View Details</Link>
                  )}
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalItems={userdata?.meta.total || 0}
        itemsPerPage={userdata?.meta.limit || 10}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
