import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useGetAllUsersQuery } from '../../../redux/features/userManger/userApi';

const performanceData = [
  { name: 'Jan', sales: 4000, revenue: 2400, users: 1200 },
  { name: 'Feb', sales: 3000, revenue: 1398, users: 1400 },
  { name: 'Mar', sales: 2000, revenue: 9800, users: 1600 },
  { name: 'Apr', sales: 2780, revenue: 3908, users: 1800 },
  { name: 'May', sales: 1890, revenue: 4800, users: 2000 },
  { name: 'Jun', sales: 2390, revenue: 3800, users: 2200 },
  { name: 'Jul', sales: 3490, revenue: 4300, users: 2400 },
  { name: 'Aug', sales: 4200, revenue: 5200, users: 2600 },
  { name: 'Sep', sales: 3800, revenue: 4800, users: 2800 },
  { name: 'Oct', sales: 4500, revenue: 5500, users: 3000 },
  { name: 'Nov', sales: 4800, revenue: 6200, users: 3200 },
  { name: 'Dec', sales: 5200, revenue: 6800, users: 3400 },
];

// Custom dot for end points
interface CustomDotProps {
  cx?: number;
  cy?: number;
  index?: number;
  dataKey?: string;
}

const CustomDot: React.FC<CustomDotProps> = (props) => {
  const { cx, cy, index, dataKey } = props;

  if (index === performanceData.length - 1) {
    const colors = {
      sales: '#10b981',
      revenue: '#f59e0b',
      users: '#8b5cf6'
    };

    return (
      <circle
        cx={cx}
        cy={cy}
        r={5}
        stroke={colors[dataKey as keyof typeof colors]}
        strokeWidth={2}
        fill="white"
      />
    );
  } else if (index === 0) {
    const colors = {
      sales: '#10b981',
      revenue: '#f59e0b',
      users: '#8b5cf6'
    };

    return (
      <circle
        cx={cx}
        cy={cy}
        r={4}
        stroke={colors[dataKey as keyof typeof colors]}
        strokeWidth={2}
        fill="white"
      />
    );
  }
  return null;
};

export default function PerformanceChart() {
  const [isClient, setIsClient] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('all');

  const { data: userInfo } = useGetAllUsersQuery();
  console.log(userInfo?.data);

  const calculatePerformanceData = (data:any) => {
    // Group users by month based on createdAt
    const monthlyData: { [month: string]: { sales: number; revenue: number } } = {};

    data?.forEach((user:any) => {
      const date = new Date(user.createdAt);
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });

      if (!monthlyData[monthName]) {
        monthlyData[monthName] = { sales: 0, revenue: 0 }; // sales = employees, revenue = job seekers
      }

      if (user.role === 'EMPLOYEE') {
        monthlyData[monthName].sales += 1;
      } else if (user.role === 'JOB_SEEKER') {
        monthlyData[monthName].revenue += 1;
      }
    });

    // Convert to array format
    const performanceData = Object.entries(monthlyData)?.map(([name, counts]) => ({
      name,
      sales: counts.sales,     // employees
      revenue: counts.revenue  // job seekers
    }));

    return performanceData;
  };

  // Calculate the performance data
  const performanceData = calculatePerformanceData(userInfo?.data);


  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-[500px] p-4 flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-gray-500">Loading chart...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] p-6 rounded-lg bg-white shadow-lg border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Login User</h2>
        <div className="flex items-center gap-4">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-4 py-2 border bg-primary text-white rounded-md border-primary "
          >
            <option value="all">All Metrics</option>
            <option value="sales">Sales Only</option>
            <option value="revenue">Revenue Only</option>

          </select>

        </div>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          data={performanceData}
          margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            horizontal={true}
            vertical={false}
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            label={{
              value: 'Value',
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle' }
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value, name) => [
              new Intl.NumberFormat().format(value as number),
              name === 'sales' ? 'Sales' : name === 'revenue' ? 'Revenue' : 'Users'
            ]}
          />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingBottom: '20px' }}
          />

          {(selectedMetric === 'all' || selectedMetric === 'sales') && (
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#10b981"
              strokeWidth={3}
              name="For Employer"
              dot={<CustomDot dataKey="sales" />}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2, fill: 'white' }}
              isAnimationActive={true}
            />
          )}

          {(selectedMetric === 'all' || selectedMetric === 'revenue') && (
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#FF0000"
              strokeWidth={3}
              name="Job Seeker "
              dot={<CustomDot dataKey="revenue" />}
              activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2, fill: 'white' }}
              isAnimationActive={true}
            />
          )}


        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}