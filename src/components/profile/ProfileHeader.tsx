import { Phone, Mail, MapPin, Edit2 } from "lucide-react";
import HeadAboutModal from "./modal/HeadAboutModal";
import { useState } from "react";
import ButtonChange from "../shared/ButtonChange";
import { Link } from "react-router-dom";

const ProfileHeade = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleAboutMode = () => {
    setIsModalOpen(true);
    console.log("yes");
  };
  return (
    <div className=" mx-auto bg-white shadow-sm border border-[#9191914D] rounded-lg p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
      {/* Profile Image */}

      <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
    
        <div className="w-20 h-20 bg-blue-200 rounded-full"></div>
      </div>

      {/* Profile Info */}
      <div className="flex-1 w-full ">
        {/* Header */}
        <div className="flex justify-between items-center md:items-start flex-col sm:flex-row gap-3">
          <div>
            <h2 className="text-xl lg:text-4xl xl:text-[48px] font-bold">SAIFUR RAHMAN</h2>
            <p className="text-subtitle text-sm md:text-[28px]">UI/UX Designer.</p>
          </div>

          <div className="flex flex-col gap-4">
            <Link to="/dashboard/candidates-list/interview-call">
            <ButtonChange title="Select Candidate " />
            </Link>
            
            <button
              onClick={handleAboutMode}
              className="px-3 py-[11px] border border-red-500 bg-red-50 text-red-500 font-semibold rounded-md hover:bg-red-100 cursor-pointer"
            >
              <Edit2 size={14} className="inline-block mr-1" />
              Reject Candidate
            </button>

          </div>

        </div>

        {/* Contact Details */}
        <div className=" mt-4 flex flex-col sm:flex-row sm:divide-x divide-gray-300 gap-5 text-sm text-gray-700 ">
          {/* Phone */}
          <div className=" sm:pb-0 sm:pr-4">
            <div className="flex items-center gap-1">
              <Phone size={14} />
              <span className="font-medium">Phone:</span>
            </div>

            <span className="ml-1 block text-gray-600 ">+8801567808747</span>
          </div>
          {/* Phone */}
          <div className=" sm:pb-0 sm:pr-4">
            <div className="flex items-center gap-1">
              <Mail size={14} />
              <span className="font-medium">Email:</span>
            </div>

            <span className="ml-1 block text-gray-600">
              ux.saifur.info@gmail.com
            </span>
          </div>

          {/* Phone */}
          <div className=" sm:pb-0 sm:pr-4">
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span className="font-medium">Location:</span>
            </div>

            <span className="ml-1 block text-gray-600">Dhaka, Bangladesh</span>
          </div>
        </div>

      </div>
      <HeadAboutModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default ProfileHeade;
