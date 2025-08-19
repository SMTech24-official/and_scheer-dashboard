import { FaCheckCircle, FaEuroSign, FaTimes } from "react-icons/fa";
import { useState } from "react";

import { BsFillPatchPlusFill } from "react-icons/bs";
import { useCreatePlanMutation } from "../../../redux/features/Subscription/subscriptionSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


export default function PlanCard() {

    const [plan, setPlan] = useState({
        description: "Job_Seeker_Plan",
        planName: "Pro Plan",
        amount: 0,
        features: [""],
        intervalCount: 1,
        planType: "subscription",
        interval: "month",
        totalSubscribers: 0,
    });

    const navigate =useNavigate()

    const [createPlan] = useCreatePlanMutation()

    const handleUpdate = async () => {
        try {
            const res = await createPlan(plan);
            console.log(res);

            if (res && res.data) {
                toast.success("Plan Added Successfully!");
                navigate("/dashboard/subscription")
            } else {
                // Check if res.error is defined before accessing it
                const errorMessage = "Failed to add plan";

                if (errorMessage) {
                    toast.error(errorMessage);
                } else {
                    toast.error("An unknown error occurred");
                }
            }
        } catch (error) {
            // Handle any unexpected errors that might occur outside the expected response structure
            console.error(error);
            toast.error("An error occurred while adding the plan");
        }


    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // If the name is 'amount', convert it to a number
        if (name === "amount") {
            if (isNaN(Number(value))) return;
            setPlan({
                ...plan,
                [name]: value ? Number(value) : 0, // Convert to number or default to 0 if value is empty
            });
        } else {
            setPlan({ ...plan, [name]: value });
        }
    };

    const handleAddFeature = () => {
        setPlan({
            ...plan,
            features: [...plan.features, ""], // Add empty string for a new feature
        });
    };

    const handleFeatureChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedFeatures = [...plan.features];
        updatedFeatures[index] = e.target.value;
        setPlan({ ...plan, features: updatedFeatures });
    };

    const handleRemoveFeature = (index: number) => {
        const updatedFeatures = plan.features.filter((_, i) => i !== index);
        setPlan({ ...plan, features: updatedFeatures });
    };

    return (
        <div className="flex justify-center items-center">


            <div className="md:max-w-[457px] w-full border border-gray-100 bg-white rounded-lg shadow-md px-8 py-5 flex flex-col relative justify-between">
                <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                    {/* Price & Plan Type */}
                    <div className="mb-5 md:mb-12">
                        <div className="flex items-end">
                            <span className="text-primary text-2xl md:text-4xl xl:text-[56px] font-bold flex items-center ">
                                <FaEuroSign />
                                <input
                                    type="text"
                                    name="amount"
                                    value={plan.amount}
                                    onChange={handleChange}
                                    className="text-primary text-2xl md:text-4xl xl:text-[56px] font-bold bg-transparent border-none w-full"
                                />
                            </span>
                            <span className="mb-2">/</span>
                            <input
                                type="text"
                                name="interval"
                                value={plan.interval}
                                onChange={handleChange}
                                className="bg-transparent border-none mb-2"
                                placeholder="Interval"
                            />
                        </div>
                    </div>

                    {/* Plan Name */}
                    <h1 className="text-2xl md:text-4xl text-black font-bold mb-8">
                        <input
                            type="text"
                            name="planName"
                            value={plan.planName}
                            onChange={handleChange}
                            className="bg-transparent border-none w-full"
                            placeholder="Plan Name"
                        />
                    </h1>

                    {/* Description */}
                    <div className="mb-5">
                        <label className="text-sm text-gray-500">Description:</label>
                        <select
                            name="description"
                            value={plan.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="Job_Seeker_Plan">Job Seeker Plan</option>
                            <option value="Employer_Plan">Employer Plan</option>
                        </select>
                    </div>

                    {/* Plan Type */}
                    <div className="mb-5">
                        <label className="text-sm text-gray-500">Plan Type:</label>
                        <select
                            name="planType"
                            value={plan.planType}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="subscription">Subscription</option>
                            <option value="payPerJob">Pay Per Job</option>
                        </select>
                    </div>

                    {/* Interval Count */}
                    <div className="mb-5">
                        <label className="text-sm text-gray-500">Interval Count:</label>
                        <input
                            type="number"
                            name="intervalCount"
                            value={plan.intervalCount}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            placeholder="Interval Count"
                        />
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 text-gray-700 mb-6">
                        <p className="text-sm text-gray-500">Permissions:</p>
                        {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <FaCheckCircle className="text-green-500 mt-1" />
                                <div className="flex gap-2 items-center w-full">
                                    <input
                                        type="text"
                                        value={feature}
                                        onChange={(e) => handleFeatureChange(index, e)}
                                        className="border-none w-full bg-gray-100"
                                        placeholder="Feature"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveFeature(index)}
                                        className="text-red-500"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Add Feature Button */}
                    <button
                        type="button"
                        className="md:text-lg flex items-center text-primary gap-2 font-semibold rounded pr-4 py-2 mb-4 text-start cursor-pointer hover:text-green-600 transition-all duration-300"
                        onClick={handleAddFeature}
                    >
                        <BsFillPatchPlusFill /> Add Permissions
                    </button>

                    {/* Create Button */}
                    <button
                        type="submit"
                        className="bg-primary text-white rounded px-4 py-2 mb-4 cursor-pointer"
                    >
                        create
                    </button>
                </form>
            </div>
        </div>
    );
}
