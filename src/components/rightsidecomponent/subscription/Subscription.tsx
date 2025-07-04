
import { useState } from 'react';
import PlanCard from '../../shared/PlanCard'


export default function JobSeekerPlan() {
  const SeekerPlan = [
    {
      price: "$0",
      planType: "Job_Seeker_Plan",
      packageName: "Free Plan",
      permissions: [
        "Limited job applications",
        "Basic profile visibility",
        "No resume feedback",
        "All free tier benifits included",
        "Receive up to 5 job suggestions"
      ]
    },

    {
      price: "$9.99",
      planType: "Job_Seeker_Plan",
      packageName: "Premium Plan",
      permissions: [
        "Limited job applications",
        "Standard profile visibility",
        "Basic resume feedback",
        "All free tier benifits included",
        "Receive up to 10 job suggestions"
      ]
    },
    {
      price: "$29.99",
      planType: "Job_Seeker_Plan",
      packageName: "Pro Plan",
      permissions: [
        "Unlimited job applications",
        "Priority profile visibility",
        "AI resume feedback",
        "All free tier benifits included",
        "Receive up to 25 job suggestions"
      ]
    }

  ]


  const EmployerPlan = [

    {
      price: "$19.99",
      planType: "Job Seeker Plan",
      packageName: "Standard Plan",
      permissions: [
        "Limited job applications",
        "Standard profile visibility",
        "Basic resume feedback",
        "All free tier benifits included",
        "Receive up to 10 job suggestions"
      ]
    },
    {
      price: "$29.99",
      planType: "Job Seeker Plan",
      packageName: "Premium Plan",
      permissions: [
        "Unlimited job applications",
        "Priority profile visibility",
        "AI resume feedback",
        "All free tier benifits included",
        "Receive up to 25 job suggestions"
      ]
    },

  ]

    type Plan = {
      price: string;
      planType: string;
      packageName: string;
      permissions: string[];
    };

    const [currentPlan, setCurrentPlan] = useState<Plan[]>([]);
    const [selectedMetric, setSelectedMetric] = useState('Job_Seeker_Plan');
    console.log(currentPlan)
    return (
      <div className='md: px-12 mt-8'>
        <div className="py-4 border-gray-200 flex justify-between">
          <h2 className="text-lg md:text-[32px] font-semibold text-gray-900">{selectedMetric}</h2>
          <div>
            <div className="flex items-center gap-4">
              <select
                value={selectedMetric}
                onChange={(e) => {
                  setSelectedMetric(e.target.value);
                  setCurrentPlan(e.target.value === 'Job_Seeker_Plan' ? SeekerPlan : EmployerPlan);
                }}
                className="px-4 py-2 border bg-background-dark text-white rounded-md   "
              >

                <option value="Job_Seeker_Plan">Job_Seeker_Plan</option>
                <option value="Employer_Plan">Employer_Plan</option>

              </select>

            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6  ">

          {currentPlan.map((plan, index) => (
            <div key={index} className="md:flex justify-center">
              <PlanCard
                price={plan.price}
                planType={plan.planType}
                packageName={plan.packageName}
                permissions={plan.permissions}
                buttonText="Choose Plan"
                onButtonClick={() => console.log(`Selected ${plan.packageName}`)}
              />
            </div>
          ))}
        </div>
      </div>

    )
  }