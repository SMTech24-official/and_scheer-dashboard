"use client";
import { useEffect, useState } from "react";
import { useGetSubscriptionPlansQuery } from "./src/redux/features/Subscription/subscriptionSlice";
import PlanCard from "./src/components/shared/PlanCard";
import { Plan } from "./src/types/AllTypes";
import { Link } from "react-router-dom";



export default function JobSeekerPlan() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<
    "Job_Seeker_Plan" | "payPerJob" | "Employer_Plan"
  >("Job_Seeker_Plan");

  const { data: apiResponse } = useGetSubscriptionPlansQuery();

  useEffect(() => {
    if (apiResponse) {
      setPlans(
        apiResponse.filter((plan: Plan) => plan.description === selectedMetric)
      );
    }
  }, [apiResponse, selectedMetric]);

  return (
    <div className="md:px-12 mt-8">
      <div className="py-4 border-gray-200 flex justify-between">
        <h2 className="text-lg md:text-[32px] font-semibold text-gray-900">
          Subscription
        </h2>
        <div>
          <div className="flex items-center gap-4">
          <Link to="/dashboard/subscription/create" className="px-4 py-2 bg-primary text-white rounded-md cursor-pointer">Add</Link>
            <select
              value={selectedMetric}
              onChange={(e) =>
                setSelectedMetric(
                  e.target.value as "Job_Seeker_Plan" | "payPerJob" | "Employer_Plan"
                )
              }
              className="px-4 py-2 border bg-background-dark text-white rounded-md"
            >
              <option value="Job_Seeker_Plan">Job_Seeker_Plan</option>
              {/* <option value="payPerJob">Pay Per Job</option> */}
              <option value="Employer_Plan">Employer_Plan</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            buttonText="Select Plan"
            onButtonClick={() => console.log(`Selected plan: ${plan.planName}`)}
          />
        ))}
      </div>
    </div>
  );
}



