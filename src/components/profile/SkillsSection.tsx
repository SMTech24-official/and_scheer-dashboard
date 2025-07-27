import React, { useState } from "react";

import SkillsAddModal from "./modal/SkillsAddModal";

interface SkillsSectionProps {
  skills: string[];
  onSkillsUpdate: (skills: string[]) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = () => {
  // const [newSkill, setNewSkill] = useState("");
  // const [isAdding, setIsAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // const handleAddSkill = () => {
  //   if (!newSkill.trim()) return;

  //   // Check if skill already exists
  //   if (skills.includes(newSkill.trim())) {
  //     alert("This skill already exists in your profile");
  //     return;
  //   }

  //   onSkillsUpdate([...skills, newSkill.trim()]);
  //   setNewSkill("");
  //   setIsAdding(false);
  // };

  // const handleRemoveSkill = (skillToRemove: string) => {
  //   onSkillsUpdate(skills.filter((skill) => skill !== skillToRemove));
  // };

  return (
    <section>
      <div>
        <div className="flex items-center justify-between mb-4 border-b border-[#ccc] pb-3">
          <h2 className="lg:text-4xl md:text-2xl text-xl font-medium flex items-center gap-1">
            Skills
          </h2>
          {/* <button
            className="text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add</span>
          </button> */}
        </div>
        <div className="flex flex-wrap gap-3 space-x-4 pb-4">
          <button className="px-6 py-2 bg-gray-100 text-secondary rounded-full  shadow hover:bg-gray-200">
            UI Designer
          </button>
          <button className="px-6 py-2 bg-gray-100 text-secondary rounded-full  shadow hover:bg-gray-200">
            UX Designer
          </button>
          <button className="px-6 py-2 bg-gray-100 text-secondary rounded-full  shadow hover:bg-gray-200">
            Figma
          </button>
          <button className="px-6 py-2 bg-gray-100 text-secondary rounded-full  shadow hover:bg-gray-200">
            Social Media
          </button>
          <button className="px-6 py-2 bg-gray-100 text-secondary rounded-full  shadow hover:bg-gray-200">
            Adobe Photoshop
          </button>
          <button className="px-6 py-2 bg-gray-100 text-secondary rounded-full  shadow hover:bg-gray-200">
            Adobe Illustrator
          </button>
        </div>
      </div>

      <SkillsAddModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </section>
  );
};

export default SkillsSection;
