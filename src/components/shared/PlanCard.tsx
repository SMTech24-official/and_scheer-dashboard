import { FaCheckCircle, FaUsers } from "react-icons/fa";
import { Plan } from "../../types/AllTypes";


interface PlanCardProps {
    plan: Plan;
    buttonText: string;
    onButtonClick?: () => void;
}

export default function PlanCard({
    plan,
    buttonText,
    onButtonClick,
}: PlanCardProps) {
    return (
        <div className="md:max-w-[457px] w-full border border-gray-100  bg-white  rounded-lg shadow-md px-8 py-5 flex flex-col">
            {/* Price & Plan Type */}
            <div className="text-center mb-12">
                <div>
                    <span className="text-green-600 text-2xl md:text-4xl font-semibold">
                        {plan.currency} {plan.amount}
                    </span>
                    {plan.interval ? `/${plan.interval}` : ""}
                </div>
            </div>

            {/* Package Name */}
            <p className="text-sm text-gray-500">{plan.planType}</p>
            <h1 className="text-2xl md:text-4xl text-black font-bold mb-8">{plan.planName}</h1>

            {/* Features */}
            <ul className="space-y-4 text-gray-700 mb-6">
                <p className="text-sm text-gray-500">Permissions :</p>
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                        <FaCheckCircle className="text-green-500 mt-1" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            {/* Button */}
            <button
                className="bg-primary text-white rounded px-4 py-2 mb-4"
                onClick={onButtonClick}
                disabled={!onButtonClick}
            >
                {buttonText}
            </button>

            <p className="underline flex">
                <FaUsers className="my-auto mr-2 text-primary" />
                Total {plan.totalSubscribers} Subscriber
            </p>
        </div>
    );
}