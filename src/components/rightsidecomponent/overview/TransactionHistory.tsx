'use client';
import { Link } from "react-router-dom";
import { useGetAllTransactionQuery } from "../../../redux/features/Subscription/subscriptionSlice";
import { CgArrowsV } from "react-icons/cg";
const StatusBadge = ({ status }: { status: string }) => {
  const isSuccess = status === 'success';
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

  const { data, isLoading, error } = useGetAllTransactionQuery({});

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="py-4 border-gray-200 flex justify-between">
        <h2 className="text-lg md:text-[32px] font-semibold text-gray-900">Transaction History</h2>
        <Link className='underline mt-6' to={"/admin/document-template/add-templete"}>
          See more
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <div className="min-w-[1100px]">
          {/* Table Header */}
          <div className="bg-primary px-6 rounded-t-lg">
            <div className="grid grid-cols-8 gap-4 py-3 text-white text-md  lg:text-xl ">
              <div className="col-span-1 flex items-center">Date <CgArrowsV className="my-auto ml-1" /></div>
              <div className="col-span-1 flex items-center">Plan Name<CgArrowsV className="my-auto ml-1" /></div>
              <div className="col-span-1 flex items-center">Plan type <CgArrowsV className="my-auto ml-1" /></div>
              <div className="col-span-1 flex items-center ">User Name <CgArrowsV className="my-auto ml-1" /></div>
              <div className="col-span-1 flex items-center">Email Address<CgArrowsV className="my-auto ml-1" /></div>
              <div className="col-span-1 flex items-center">Pay type <CgArrowsV className="my-auto ml-1" /></div>
              <div className="col-span-1 flex items-center ">Billing Status <CgArrowsV className="my-auto ml-1" /></div>
              
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {isLoading && <div className="px-6 py-4">Loading...</div>}
            {error && <div className="px-6 py-4 text-red-500">Error loading data</div>}
            {data?.data.map((log: any) => (
              <div key={log.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-7 gap-4 items-center text-sm md:text-[16px] text-info">
                  {/* paymentData date fns use */}
                  <div className="col-span-1"> 
                    {new Date(log.paymentDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: '2-digit',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="col-span-1">{log.planName}</div>
                  <div className="col-span-1">{log.planType}</div>
                  <div className="col-span-1">{log.userName}</div>
                  <div className="col-span-1 overflow-auto">{log.email}</div>
                  <div className="col-span-1">{log.payType}</div>
                  <div className="col-span-1">{log.billingStatus}</div>
                 
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
