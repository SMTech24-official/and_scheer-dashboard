'use client'

import { CgArrowsV } from 'react-icons/cg';
import { Link } from 'react-router-dom';

const logsData = [
  {
    id: 1,
    timestamp: 'Jun 30, 2025 | 10:32 AM',
    userName: 'Ayesha Karim',
    projectName: 'Tower Redesign',
    action: 'Uploaded FloorPlan.pdf',
    status: 'Success'
  },
  {
    id: 2,
    timestamp: 'Jun 29, 2025 | 02:14 PM',
    userName: 'Mohammed Iqbal',
    projectName: 'Bridge AI Model',
    action: 'AI Data Extraction',
    status: 'Updated'
  },
  {
    id: 3,
    timestamp: 'Jun 28, 2025 | 09:40 AM',
    userName: 'Elena Ray',
    projectName: 'Office Tower A',
    action: 'Generated Engineer Certificate',
    status: 'Success'
  }
];

const StatusBadge = ({ status }: { status: string }) => {
  const isSuccess = status.toLowerCase() === 'success';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border 
      ${isSuccess
        ? 'border-green-200 bg-green-100 text-green-800'
        : 'border-yellow-200 bg-yellow-100 text-yellow-800'
      }`}>
      {status}
    </span>
  );
};



export default function SimpleSubmissionLogsTable() {
  return (
    <div className="md:px-12 min-h-screen">
      {/* Header */}
      <div className="py-4 border-gray-200 flex justify-between">
        <h2 className="text-lg md:text-[32px] font-semibold text-gray-900">Transaction History</h2>

        <Link className='bg-neutral-950 px-4 py-3 text-white  rounded-lg' to={"/admin/document-template/add-templete"}>
          See more
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        {/* Table Header */}
        <div className="min-w-[1100px]">
          <div className="bg-primary px-6 rounded-t-lg">
            <div className="grid grid-cols-8 gap-4 py-3 text-white text-md font-semibold lg:text-xl ">
              <div className="col-span-1  flex items-center">Date <CgArrowsV className="my-auto ml-1" /></div>
              <div className="col-span-1  flex items-center">Plan Name<CgArrowsV className="my-auto ml-1" /></div>
              <div className="col-span-1  flex items-center">Plan type <CgArrowsV className="my-auto ml-1" /></div>
              <div className="col-span-1  flex items-center ">User Name <CgArrowsV className="my-auto ml-1" /></div>
              <div className="col-span-1  flex items-center">Email Address<CgArrowsV className="my-auto ml-1" /></div>
              <div className="col-span-1  flex items-center">Pay type <CgArrowsV className="my-auto ml-1" /></div>
              <div className="col-span-1  flex items-center ">Billing Status <CgArrowsV className="my-auto ml-1" /></div>
              <div className="col-span-1  flex items-center">Action <CgArrowsV className="my-auto ml-1" /></div>
        
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {logsData.map((log) => (
              <div key={log.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-8 gap-4 items-center text-sm md:text-[16px] text-info">
                  <div className="col-span-1">{log.timestamp}</div>
                  <div className="col-span-1">{log.userName}</div>
                  <div className="col-span-1">{log.projectName}</div>
                  <div className="col-span-1">{log.userName}</div>
                  <div className="col-span-1">{log.projectName}</div>
                  <div className="col-span-1">{log.projectName}</div>
                  <div className="col-span-1">{log.action}</div>
                  <div className="col-span-1"><StatusBadge status={log.status} /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}