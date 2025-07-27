import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  skill: string;
  index: number;
}

interface SkillAddModal {
  isModalOpen: boolean;
  setIsModalOpen: any;
}

const SkillsAddModal: React.FC<SkillAddModal> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [skills, setSkills] = useState<string[]>([
    "UI Designer",
    "UX Designer",
    "Figma",
    "Social Media",
    "Adobe Photoshop",
    "Adobe Illustrator",
  ]);
  // const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      skill: "",
      index: -1,
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (data.index >= 0 && data.index < skills.length) {
      const updatedSkills = [...skills];
      updatedSkills[data.index] = data.skill;
      setSkills(updatedSkills);
    }
    setIsModalOpen(false); // Close modal after submission
    reset({ skill: "", index: -1 }); // Reset form
  };

  // const handleEdit = (index: number) => {
  //   setSelectedIndex(index);
  //   reset({ skill: skills[index], index });
  //   setIsModalOpen(true);
  // };

  const handleCancel = () => {
    setIsModalOpen(false);
    reset({ skill: "", index: -1 });
  };

  // const handleAddSkill = () => {
  //   setSkills([...skills, ""]);
  //   setSelectedIndex(skills.length);
  //   reset({ skill: "", index: skills.length });
  //   setIsModalOpen(true);
  // };

  return (
    <div className="">
      {isModalOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Skill</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-gray-700"></label>
                <input
                  {...register("skill", { required: true })}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Enter skill"
                />
              </div>
              <input {...register("index")} type="hidden" />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsAddModal;
