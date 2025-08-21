'use client';

import { useMemo, useState } from 'react';
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

// Mapping from display headers to actual data property names
const columnMapping: Record<string, string> = {
  'Date': 'paymentDate',
  'Plan Name': 'planName',
  'Plan Type': 'planType',
  'User Name': 'userName',
  'Email Address': 'email',
  'Pay Type': 'payType',
  'Billing Status': 'billingStatus'
};

export default function PaymentHistory() {
  const { data, isLoading } = useGetAllTransactionQuery({});
  const transactions = data?.data || [];

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortColumn, setSortColumn] = useState<string>('planName');

  // Sort transactions based on selected column and order
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      if (sortColumn === 'paymentDate') {
        const dateA = new Date(a.paymentDate);
        const dateB = new Date(b.paymentDate);
        return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      } else {
        // Handle string sorting for other columns
        const valueA = String(a[sortColumn] || '').toLowerCase();
        const valueB = String(b[sortColumn] || '').toLowerCase();
        return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
    });
  }, [transactions, sortColumn, sortOrder]);

  const handleSort = (header: string) => {
    // Don't sort the Date column
    if (header === 'Date') return;
    
    const column = columnMapping[header];
    
    if (!column) return;
    
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const headers = [
    'Date',
    'Plan Name',
    'Plan Type',
    'User Name',
    'Email Address',
    'Pay Type',
    'Billing Status',
  ];

  return (
    <div className="md:px-12 mt-8 min-h-screen">
      <div className="py-4 border-gray-200 flex justify-between">
        <h2 className="text-lg md:text-[32px] font-semibold text-gray-900">Transaction History</h2>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table className="w-full min-w-[1000px]">
          <thead className="bg-primary">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className={`font-normal py-3 text-left text-base lg:text-xl text-white ${
                    header !== 'Date' ? 'cursor-pointer hover:bg-primary/90' : ''
                  }`}
                  onClick={() => handleSort(header)}
                >
                  <div className={`flex items-center ${header === 'Date' ? 'ml-3' : ''}`}>
                    {header}
                    {/* Show sort arrows for sortable columns only */}
                    {header === 'Date' ? (
                      <CgArrowsV className="ml-1 opacity-30" />
                    ) : (
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
            ) : (
              sortedTransactions.map((entry: any) => (
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
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}