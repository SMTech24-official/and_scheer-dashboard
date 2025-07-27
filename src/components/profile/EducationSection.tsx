
import React, { useState } from "react";


// import {
//   useCreateEducationMutation,
//   useDeleteEducationMutation,
//   useUpdateEducationMutation,
// } from "@/redux/api/profile/profileApi";

import EductionAddModal from "./modal/EductionAddModal";
import EductionEditModal from "./modal/EductionEditModal";

interface EducationSectionProps {
  education: Education[];
}

type Education = {
  institute: string;
  degree: string;
  startDate: string;
  endDate: string;
  descriptions: string;
};

const EducationSection: React.FC<EducationSectionProps> = () => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false);

  return (
    <section>
      <div>
        <div className="flex items-center justify-between mb-4 border-b border-[#ccc] pb-3">
          <h2 className="lg:text-4xl md:text-2xl text-xl font-medium flex items-center gap-1">
            Education & Certifications
          </h2>
          {/* <button
            className="text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add</span>
          </button> */}
        </div>
        {/* one card eduction  */}
        <div className="mt-7">
          <h2 className="lg:text-2xl text-lg font-medium text-secondary mb-3">
            EDUCATIONS
          </h2>
          <div className="space-y-6">
            <div className="flex justify-between  items-start pb-4">
              <div className="space-y-2">
                <h3 className="md:text-lg text-base font-semibold text-secondary">
                  Master of Business Administration (MBA), Marketing
                </h3>
                <p className="text-subtitle">
                  University of Berlin | Berlin, Germany
                </p>
                <p className="text-base text-secondary font-medium ">
                  Graduated:
                </p>
                <p className="text-sm text-subtitle">
                  Start Date: Jun 25, 2016 - End Date: Jun 25, 2016
                </p>
              </div>
              {/* <button
                onClick={() => setIsModalOpenEdit(true)}
                className="text-subtitle hover:text-gray-700 mt-2"
              >
                ✎ Edit
              </button> */}
            </div>
            <div className="flex justify-between items-start pb-2">
              <div className="space-y-2">
                <h3 className="md:text-lg text-base  text-secondary font-semibold">
                  Bachelor of Arts in Communications
                </h3>
                <p className="text-base text-secondary font-medium ">
                  Graduated:
                </p>
                <p className="text-sm text-subtitle">
                  Start Date: Jun 25, 2016 - End Date: Jun 25, 2016
                </p>
              </div>
              {/* <button className="text-subtitle hover:text-gray-700 mt-2">
                ✎ Edit
              </button> */}
            </div>
          </div>
        </div>
        {/* two card eduction  */}
        <div className="mt-7">
          <h2 className="lg:text-2xl text-xl font-medium text-secondary mb-3">
            CERTIFICATIONS
          </h2>
          <div className="space-y-6">
            <div className="flex justify-between  items-start pb-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-secondary">
                  Master of Business Administration (MBA), Marketing
                </h3>
                <p className="text-subtitle">
                  University of Berlin | Berlin, Germany
                </p>
                <p className="text-base text-secondary font-medium ">
                  Graduated:
                </p>
                <p className="text-sm text-subtitle">
                  Start Date: Jun 25, 2016 - End Date: Jun 25, 2016
                </p>
              </div>
              {/* <button className="text-subtitle hover:text-gray-700 mt-2">
                ✎ Edit
              </button> */}
            </div>
            <div className="flex justify-between items-start pb-2">
              <div className="space-y-2">
                <h3 className="text-lg text-secondary font-semibold">
                  Bachelor of Arts in Communications
                </h3>
                <p className="text-base text-secondary font-medium ">
                  Graduated:
                </p>
                <p className="text-sm text-subtitle">
                  Start Date: Jun 25, 2016 - End Date: Jun 25, 2016
                </p>
              </div>
              {/* <button className="text-subtitle hover:text-gray-700 mt-2">
                ✎ Edit
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* add eduction  */}
      <EductionAddModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      {/* edit eduction  */}
      <EductionEditModal
        isModalOpenEdit={isModalOpenEdit}
        setIsModalOpenEdit={setIsModalOpenEdit}
      />
    </section>
  );
};

export default EducationSection;
