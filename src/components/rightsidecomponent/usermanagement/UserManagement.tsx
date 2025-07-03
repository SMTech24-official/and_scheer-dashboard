'use client';

import { CgArrowsV } from 'react-icons/cg';

const aiLogData = [
  {
    id: 1,
    timestamp: 'Jun 30, 2025 | 10:45 AM',
    userName: 'Rafiq Islam',
    projectName: 'Skyline Tower',
    action: 'AI Extracted FloorPlan.pdf',
    status: 'Success',
    notes: 'No issues found.',
  },
  {
    id: 2,
    timestamp: 'Jun 30, 2025 | 09:10 AM',
    userName: 'Nusrat Jahan',
    projectName: 'Green Valley',
    action: 'AI Extraction Failed',
    status: 'Failed',
    notes: 'Unsupported file format.',
  },
  {
    id: 3,
    timestamp: 'Jun 29, 2025 | 03:33 PM',
    userName: 'Tanvir Hasan',
    projectName: 'Bridge Point',
    action: 'Updated certificate via AI',
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
  return (
    <div className="md:px-12 min-h-screen mt-9">
      {/* Table Title */}
      <div className="py-4 border-gray-200 flex justify-between">
        <h2 className="text-lg md:text-[32px] font-semibold text-gray-900">AI Log Table</h2>
        <div>
          <button className='underline pb-1 mt-3'>See More</button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table className="w-full min-w-[600px]">
          {/* Table Header */}
          <thead className="bg-primary">
            <tr>
              <th className="px-6 py-3 text-left text-md lg:text-xl text-white">
                <div className="flex items-center">
                  Joining Date & Time
                  <CgArrowsV className="my-auto ml-1" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-md lg:text-xl text-white">
                <div className="flex items-center">
                  User Name
                  <CgArrowsV className="my-auto ml-1" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-md lg:text-xl text-white">
                <div className="flex items-center">
                  Email Address
                  <CgArrowsV className="my-auto ml-1" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-md lg:text-xl text-white">
                <div className="flex items-center">
                  Company Name
                  <CgArrowsV className="my-auto ml-1" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-md lg:text-xl text-white">
                <div className="flex items-center">
                  Role
                  <CgArrowsV className="my-auto ml-1" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-md lg:text-xl text-white">
                <div className="flex items-center">
                  Status
                  <CgArrowsV className="my-auto ml-1" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-md lg:text-xl text-white">
                <div className="flex items-center">
                  Action
                  <CgArrowsV className="my-auto ml-1" />
                </div>
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100">
            {aiLogData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm md:text-[16px] text-info">
                  {row.timestamp}
                </td>
                <td className="px-6 py-4 text-sm md:text-[16px] text-info">
                  {row.userName}
                </td>
                <td className="px-6 py-4 text-sm md:text-[16px] text-info">
                  {row.projectName}
                </td>
                <td className="px-6 py-4 text-sm md:text-[16px] text-info">
                  {row.projectName}
                </td>
                <td className="px-6 py-4 text-sm md:text-[16px] text-info">
                  {row.action}
                </td>
                <td className="px-6 py-4 text-sm md:text-[16px] text-info">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-6 py-4 text-sm md:text-[16px] text-info cursor-pointer">
                  View Profile
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}