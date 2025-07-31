
import { useEffect, useState } from "react";
import { useGetStatisticsQuery } from "../../../redux/features/statistics/statisticsSlice";
import { StatisticData } from "../../../types/AllTypes";

import activeEmploye from "../../../assets/activeEmploye.png";
import activeJobs from "../../../assets/activeJob.png";
import job from "../../../assets/job.png";
import regiUser from "../../../assets/regiser.png";
import company from "../../../assets/total-company.png";



export default function Statistics({}) {

  const [stateData, setStateData] = useState<StatisticData>({} as StatisticData)

  const {data:state} =useGetStatisticsQuery({})
  console.log(state)


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
          image: <img src={regiUser} className="size-[56px] " />,
        },
        {
          label: "Active Job Seekers",
          value: stateData?.users?.activeJobSeekers ?? 0,
          delta: "",
          image: <img src={activeJobs} className="size-[56px] " />,
        },
        {
          label: "Active Employers",
          value: stateData?.users?.activeEmployers ?? 0,
          delta: "",
          image:  <img src={activeEmploye} className="size-[56px] " />,
        },
        {
          label: "Jobs Posted Today",
          value: stateData?.jobs?.totalPostedToday ?? 0,
          delta: "",
          image: <img src={job} className="size-[56px] " />,
        },
        {
          label: "Total Registered Companies",
          value: stateData?.companies?.totalRegistered ?? 0,
          delta: "",
          image: <img src={company} className="size-[56px] " />,
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
            <div className="size-12">{item.image}</div>
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


