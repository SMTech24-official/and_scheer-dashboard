
import React, { useState } from "react";

import ExperienceAddModal from "./modal/ExperienceAddModal";
import ExperienceEditModal from "./modal/ExperienceEditModal";

interface ExperienceSectionProps {
  experiences: Experience[];
}

interface Experience {
  title: string;
  company: string;
  date: string;
  description: string;
  hugs?: number | null;
  ExperienceNumber: string;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false);
  const experienceData = [
    {
      experienceNumber: "Experience 1",
      title: "Mid-Level UI/UX Designer",
      company: "SM Technology (betopia Group)",
      date: "08/08/2024 - Till Now",
      description:
        "I am very happy to get the opportunity for UI/UX designer intern. I strive to bring creativity, diligence, and fresh perspectives to every project. Eager to learn, I embrace challenges and aim to exceed expectations with my innovative designs and user-centric approach.",
      hugs: 125,
    },
    {
      experienceNumber: "Experience 2",
      title: "Jr. UI/UX Designer",
      company: "SM Technology (betopia Group)",
      date: "20/04/2024 - 31/07/2024",
      description:
        "I am very happy to get the opportunity for UI/UX designer intern. I strive to bring creativity, diligence, and fresh perspectives to every project. Eager to learn, I embrace challenges and aim to exceed expectations with my innovative designs and user-centric approach.",
      hugs: 26,
    },
    {
      experienceNumber: "Experience 3",

      title: "Intern UI/UX Designer",
      company: "SM Technology (betopia Group)",
      date: "20/01/2024 - 18/04/2024",
      description:
        "I am very happy to get the opportunity for UI/UX designer intern. I strive to bring creativity, diligence, and fresh perspectives to every project. Eager to learn, I embrace challenges and aim to exceed expectations with my innovative designs and user-centric approach.",
      hugs: null,
    },
  ];

  return (
    <section>
      <div>
        <div className="flex border-b pb-3 border-b-[#cfcbcb] items-center justify-between mb-4">
          <h2 className="lg:text-4xl md:text-2xl text-xl font-medium flex items-center gap-1">
            Work Experience
          </h2>
          {/* <button
            className="text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add Experience</span>
          </button> */}
        </div>
        <div className="  ">
          {experienceData.map((exp, index) => (
            <div key={index} className="space-y-2 mt-6">
              <div className="flex justify-between mb-2">
                <h2 className="md:text-2xl text-xl font-bold text-secondary mb-2">
                  {exp.experienceNumber}
                </h2>{" "}
                {/* <button
                  onClick={() => setIsModalOpenEdit(true)}
                  className=" flex items-center gap-2 text-subtitle mb-2 cursor-pointer"
                >
                  <LuPencilLine className="text-lg" /> Edit
                </button> */}
              </div>
              <div className="flex justify-between">
                <div className="space-y-2">
                  <h3 className="md:text-lg text-base  font-semibold text-secondary">
                    {exp.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {exp.company}
                  </p>
                </div>
                <div>
                  <p className="text-sm sm:text-base text-gray-500">
                    {exp.date}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="md:text-lg text-base font-semibold text-subtitle">
                  Experience Summary
                </h3>
                <p className="mt-1 text-gray-700 text-sm sm:text-base ">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <ExperienceAddModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <ExperienceEditModal
          isModalOpenEdit={isModalOpenEdit}
          setIsModalOpenEdit={setIsModalOpenEdit}
        />
      </div>
    </section>
  );
};

export default ExperienceSection;
