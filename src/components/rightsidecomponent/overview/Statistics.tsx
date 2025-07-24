import { FaUserClock, FaUserPlus, FaUserTie } from "react-icons/fa";

import { useEffect, useState } from "react";
import { CiBag1 } from "react-icons/ci";
import { RiShoppingBag4Line } from "react-icons/ri";
import { useGetStatisticsQuery } from "../../../redux/features/statistics/statisticsSlice";
import { StatisticData } from "../../../types/AllTypes";





export default function Statistics({}) {

  const [stateData, setStateData] = useState<StatisticData>({} as StatisticData)

  const {data:state} =useGetStatisticsQuery({})


  useEffect(()=>{
     if(state?.data){
      setStateData(state.data)
   
     }
  },[state?.data])

  


// const data = [
//   { label: 'Total Revenue', value: '1,200', delta: '+12%', image:  <CiBag1 className="size-10 text-green-600" /> },
//   { label: 'Total Registered Users', value: '600', delta: '+8%', image: <FaUserPlus className="size-10 text-green-600" /> },
//   { label: 'Active Job Seekers', value: '1,252', delta: '+15%', image: <FaUserClock className="size-10 text-green-600" /> },
//   { label: 'Active Employers', value: '09', delta: '+3%', image:  <FaUserTie className="size-10 text-green-600"/>},
//   { label: 'Jobs Posted Today', value: '12', delta: '+9%', image: <RiShoppingBag4Line className="size-10 text-green-600"/>
// },
// ];
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-4">
      {[
        {
          label: "Total Registered Users",
          value: stateData?.users?.totalVerified ?? 0,
          delta: "",
          image: <FaUserPlus className="size-10 text-green-600" />,
        },
        {
          label: "Active Job Seekers",
          value: stateData?.users?.activeJobSeekers ?? 0,
          delta: "",
          image: <FaUserClock className="size-10 text-green-600" />,
        },
        {
          label: "Active Employers",
          value: stateData?.users?.activeEmployers ?? 0,
          delta: "",
          image: <FaUserTie className="size-10 text-green-600" />,
        },
        {
          label: "Jobs Posted Today",
          value: stateData?.jobs?.totalPostedToday ?? 0,
          delta: "",
          image: <RiShoppingBag4Line className="size-10 text-green-600" />,
        },
        {
          label: "Total Registered Companies",
          value: stateData?.companies?.totalRegistered ?? 0,
          delta: "",
          image: <CiBag1 className="size-10 text-green-600" />,
        },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-white py-6 px-4 rounded-xl shadow flex justify-between gap-3 flex-col"
        >
          <div className="flex justify-between mr-3 gap-2">
            <span className="text-xl xl:text-[42px] font-bold text-zinc-800">
              {item.value}
            </span>
            <p className="size-6">{item.image}</p>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-sm text-zinc-500">{item.label}</span>
            <span className="text-green-600 font-medium">{item.delta}</span>
          </div>
        </div>
      ))}
    </section>
  );
}


