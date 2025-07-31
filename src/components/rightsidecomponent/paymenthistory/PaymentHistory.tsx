'use client';

import { CgArrowsV } from 'react-icons/cg';
import { useGetAllTransactionQuery } from '../../../redux/features/Subscription/subscriptionSlice';

const BillingStatusBadge = ({ status }: { status: string }) => {
  const isActive = status === 'Active';
  const bg = isActive ? 'bg-green-100' : 'bg-yellow-100';
  const text = isActive ? 'text-green-800' : 'text-yellow-800';
  const border = isActive ? 'border-green-200' : 'border-yellow-200';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text} ${border} border`}>
      {status}
    </span>
  );
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  });
}

export default function PaymentHistory() {
  const { data ,isLoading} = useGetAllTransactionQuery({});
  const transactions = data?.data || [];

  return (
    <div className="md:px-12 mt-8 min-h-screen">
      <div className="py-4 border-gray-200 flex justify-between">
        <h2 className="text-lg md:text-[32px] font-semibold text-gray-900">Transaction History</h2>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table className="w-full min-w-[1000px]">
          <thead className="bg-primary">
            <tr>
              {[
                'Date',
                'Plan Name',
                'Plan Type',
                'User Name',
                'Email Address',
                'Pay Type',
                'Billing Status',
                // 'Action',
              ].map((header) => (
                <th
                  key={header}
                  className="font-normal py-3 text-left text-base lg:text-xl text-white"
                >
                  <div className={`flex ${header === 'Date' ? 'ml-3' : ''}`}>
                    {header}
                    <CgArrowsV className="my-auto ml-1" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">

              {isLoading ? (
              <tr>
                <td colSpan={7} className="py-4">
                  {/* Skeleton Loader */}
                  <div className="animate-pulse space-y-4">
                       <div className="h-8 bg-gray-300 rounded w-[98%] mx-auto"></div>
                    <div className="h-8 bg-gray-300 rounded w-[98%] mx-auto"></div>
                    <div className="h-8 bg-gray-300 rounded w-[98%] mx-auto"></div>
                    <div className="h-8 bg-gray-300 rounded w-[98%] mx-auto"></div>
                    <div className="h-8 bg-gray-300 rounded w-[98%] mx-auto"></div>
                  </div>
                </td>
              </tr>
            ) :


            (transactions.map((entry: any) => (
              <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 text-sm md:text-[16px] text-info ml-3">
                  <div className='ml-3'>
                    {formatDate(entry.paymentDate)}
                  </div>
                </td>
                <td className="py-4 text-sm md:text-[16px] text-info">{entry.planName}</td>
                <td className="py-4 text-sm md:text-[16px] text-info">{entry.planType.replace(/_/g, ' ')}</td>
                <td className="py-4 text-sm md:text-[16px] text-info">{entry.userName}</td>
                <td className="py-4 text-sm md:text-[16px] text-info">{entry.email}</td>
                <td className="py-4 text-sm md:text-[16px] text-info">{entry.payType}</td>
                <td className="py-4 text-sm md:text-[16px] text-info">
                  <BillingStatusBadge status={entry.billingStatus} />
                </td>
                {/* <td className="py-4 text-sm md:text-[16px] text-info cursor-pointer hover:underline text-primary">
                  <FaBarsStaggered />
                </td> */}
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
