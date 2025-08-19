import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDeleteUserMutation, useProfileSuspendMutation } from "../../redux/features/userManger/userApi";
import { Profile } from "../../types/AllTypes";
import ButtonChange from "../shared/ButtonChange";
import HeadAboutModal from "./modal/HeadAboutModal";

const ProfileHeader = ({
  firstName,
  lastName,
  JobTitle,
  phoneNumber,
  city,
  countryRegion,
  email
}:Partial<Profile>) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
 

  const {id}=useParams()
 

const [profileId,]=useProfileSuspendMutation()

  const handleSuspend =async()=>{
     if (id) {
      try {
        const response = await profileId(id);
        if (response?.data.success) {
          toast.success("account suspended successfully");
        } else {
          toast.error("Failed to suspend ");
        }
      } catch (error) {
        toast.error("An error occurred while suspending the account");
      }
    }
  }


    
  const [deleteId]=useDeleteUserMutation()

   const handledelete =async()=>{
     if (id) {
      try {
        const response = await deleteId(id);
    
        if (response?.data.success) {
          toast.success("Account Delete successfully");
        } else {
          toast.error("Failed to Delete ");
        }
      } catch (error) {
        toast.error("An error occurred while Delete the account");
      }
    }
  }


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
            <h2 className="text-xl lg:text-4xl xl:text-[48px] font-bold">
              {firstName} {lastName}
            </h2>
            <p className="text-subtitle text-sm md:text-[28px]">
             {JobTitle}
            </p>
          </div>

          <div className="flex flex-col gap-4">
         
              <ButtonChange onClick={handleSuspend} title="Suspend Account" />
         

            <button
              onClick={handledelete}
              className="px-3 py-[11px] border border-red-500 bg-red-50 text-red-500 font-semibold rounded-md hover:bg-red-100 cursor-pointer">Delete User</button>
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

            <span className="ml-1 block text-gray-600 ">{phoneNumber}</span>
          </div>
          {/* Phone */}
          <div className=" sm:pb-0 sm:pr-4">
            <div className="flex items-center gap-1">
              <Mail size={14} />
              <span className="font-medium">Email:</span>
            </div>

            <span className="ml-1 block text-gray-600">
              {email}
            </span>
          </div>

          {/* Phone */}
          <div className=" sm:pb-0 sm:pr-4">
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span className="font-medium">Location:</span>
            </div>

            <span className="ml-1 block text-gray-600">{city}, {countryRegion}</span>
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

export default ProfileHeader;
