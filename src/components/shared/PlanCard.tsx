
import { FaCheckCircle, FaUsers } from "react-icons/fa";


interface PackageCardProps {
    price: string;
    planType: string;
    packageName: string;
    permissions: string[];
    buttonText: string;
    onButtonClick?: () => void;
}

export default function PlanCard({
    price,
    planType,
    packageName,
    permissions,
    // buttonText,
    // onButtonClick,
}: PackageCardProps) {
    return (
        <div className=" md:max-w-[457px] w-full border border-gray-100  bg-white  rounded-lg shadow-md px-8 py-5 flex flex-col">
            {/* Price & Plan Type */}
            <div className="text-center mb-12">
                <div className=" "><span className="text-green-600 text-2xl md:text-4xl  font-semibold">{price}</span>/month</div>

            </div>

            {/* Package Name */}
            <p className="text-sm text-gray-500">{planType}</p>
            <h1 className="text-2xl md:text-4xl  text-black font-bold  mb-8">{packageName}</h1>

            {/* Permissions */}
            <ul className="space-y-4 text-gray-700 mb-6">
                <p className="text-sm text-gray-500">Permisssons :</p>
                {permissions.map((permission, index) => (
                    <li key={index} className="flex items-start gap-2">
                        <FaCheckCircle className="text-green-500 mt-1" />
                        <span>{permission}</span>
                    </li>
                ))}
            </ul>

            {/* Button */}

            <p className="underline flex"><FaUsers className="my-auto mr-2 text-primary"/> Total 250 Subscriber</p>
        </div>
    );
}