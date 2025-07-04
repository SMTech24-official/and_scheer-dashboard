'use client';

import { CgArrowsV } from 'react-icons/cg';
import { FaBarsStaggered } from "react-icons/fa6";


const billingData = [
  {
    id: 1,
    date: 'Jul 02, 2025',
    planName: 'Pro Plan',
    planType: 'Job Seeker',
    userName: 'Rafiq Islam',
    email: 'rafiq@example.com',
    payType: 'Card',
    billingStatus: 'Paid',
  },
  {
    id: 2,
    date: 'Jul 01, 2025',
    planName: 'Premium Plan',
    planType: 'Employer',
    userName: 'Nusrat Jahan',
    email: 'nusrat@example.com',
    payType: 'Paypal',
    billingStatus: 'Pending',
  },
];

const BillingStatusBadge = ({ status }: { status: string }) => {
  const isPaid = status === 'Paid';
  const bg = isPaid ? 'bg-green-100' : 'bg-yellow-100';
  const text = isPaid ? 'text-green-800' : 'text-yellow-800';
  const border = isPaid ? 'border-green-200' : 'border-yellow-200';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text} ${border} border`}>
      {status}
    </span>
  );
};

export default function PaymentHistory() {
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
                'Action',
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
            {billingData.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 text-sm md:text-[16px] text-info ml-3">
                  <div className='ml-3'>
                    {entry.date}
                  </div>
                </td>
                <td className="py-4 text-sm md:text-[16px] text-info">{entry.planName}</td>
                <td className="py-4 text-sm md:text-[16px] text-info">{entry.planType}</td>
                <td className="py-4 text-sm md:text-[16px] text-info">{entry.userName}</td>
                <td className="py-4 text-sm md:text-[16px] text-info">{entry.email}</td>
                <td className="py-4 text-sm md:text-[16px] text-info">{entry.payType}</td>
                <td className="py-4 text-sm md:text-[16px] text-info">
                  <BillingStatusBadge status={entry.billingStatus} />
                </td>
                <td className="py-4 text-sm md:text-[16px] text-info cursor-pointer hover:underline text-primary">
                  <FaBarsStaggered />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
