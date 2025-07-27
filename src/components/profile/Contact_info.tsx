import  { useState } from "react";

// import Link from "next/link";
import SocialLinksAddModal from "./modal/SocialLinksAddModal";
import SocialLinksEditModal from "./modal/SocialLinksEditModal";
import { Link } from "react-router-dom";

const ContactInfoProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false);
  return (
    <div>
      <div className="flex items-center justify-between mb-4 border-b border-[#ccc] pb-3">
        <h2 className="lg:text-4xl md:text-2xl text-xl font-medium flex items-center gap-1">
          Contact Information & Social Links
        </h2>
        {/* <button
          onClick={() => setIsModalOpen(true)}
          className="text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors duration-300"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">Add</span>
        </button> */}
      </div>
      {/* Social link  */}
      <div>
        {/* Social one  */}
        <div className="flex justify-between  items-start pb-4">
          <div className="space-y-2">
            <p className="text-base text-secondary font-medium ">LinkedIn:</p>
            <Link
              to={"linkedin.com/in/ux_saifur_info"}
              className="text-sm text-[#009DFF] underline cursor-pointer"
            >
              linkedin.com/in/ux_saifur_info
            </Link>
          </div>
          {/* <button
            onClick={() => setIsModalOpenEdit(true)}
            className="text-subtitle hover:text-gray-700 mt-2"
          >
            ✎ Edit
          </button> */}
        </div>

        {/* Social one  */}
        <div className="flex justify-between  items-start pb-4">
          <div className="space-y-2">
            <p className="text-base text-secondary font-medium ">Portfolio:</p>
            <Link
              to={"linkedin.com/in/ux_saifur_info"}
              className="text-sm text-[#009DFF] underline cursor-pointer"
            >
              linkedin.com/in/ux_saifur_info
            </Link>
          </div>
          {/* <button className="text-subtitle hover:text-gray-700 mt-2">
            ✎ Edit
          </button> */}
        </div>
        {/* Social one  */}
        <div className="flex justify-between  items-start pb-4">
          <div className="space-y-2">
            <p className="text-base text-secondary font-medium ">Facebook:</p>
            <Link
              to={"linkedin.com/in/ux_saifur_info"}
              className="text-sm text-[#009DFF] underline cursor-pointer"
            >
              linkedin.com/in/ux_saifur_info
            </Link>
          </div>
          {/* <button className="text-subtitle hover:text-gray-700 mt-2">
            ✎ Edit
          </button> */}
        </div>
      </div>
      <SocialLinksAddModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      {/* edit Social contact info  */}
      <SocialLinksEditModal
        isModalOpenEdit={isModalOpenEdit}
        setIsModalOpenEdit={setIsModalOpenEdit}
      />
    </div>
  );
};

export default ContactInfoProfile;
