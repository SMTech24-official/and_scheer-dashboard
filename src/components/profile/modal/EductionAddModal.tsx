import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  title: string;
  degree: string;
  university: string;
  location: string;
  startDate: string;
  endDate: string;
  summary: string;
}

interface EductionAddModal {
  isModalOpen: boolean;
  setIsModalOpen: any;
}

const EductionAddModal: React.FC<EductionAddModal> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      title: "",
      degree: "",
      university: "",
      location: "",
      startDate: "",
      endDate: "",
      summary: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    
    setIsModalOpen(false); // Close modal after submission
    reset(data); // Update default values with submitted data
  };

  // const handleEdit = () => {
  //   setIsModalOpen(true);
  // };

  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
  };

  // const { defaultValues } = formState;

  return (
    <div className="">
      {isModalOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
            <h2 className="text-xl font-bold mb-4">Add Education</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold">
                  Title
                </label>
                <input
                  {...register("title")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Title"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">
                  Degree
                </label>
                <input
                  {...register("degree")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Degree"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">
                  University
                </label>
                <input
                  {...register("university")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="University"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">
                  Location
                </label>
                <input
                  {...register("location")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Location"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">
                  Start Date
                </label>
                <input
                  {...register("startDate")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Start Date"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">
                  End Date
                </label>
                <input
                  {...register("endDate")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="End Date"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">
                  Summary
                </label>
                <textarea
                  {...register("summary")}
                  className="w-full border-b border-gray-300 focus:outline-none resize-none h-24"
                  placeholder="Summary"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded hover:bg-gray-400 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-green-600 cursor-pointer"
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

export default EductionAddModal;
