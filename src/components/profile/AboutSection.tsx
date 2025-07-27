import React, { useState } from "react";


import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  jobTitle: string;
  professionalSummary: string;
}
const AboutSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      jobTitle: "Senior Marketing Specialist",
      professionalSummary:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Doloremque magnam tempore doloribus amet. Cum voluptates veritatistotam, distinctio excepturi at adipisci? Nam nostrum cum laboriosam sequi quia vel nobis explicabo? deome",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
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
    <section className="">
      <div>
        <div className="flex border-b pb-3 border-b-[#cfcbcb] items-center justify-between mb-4">
          <h2 className="lg:text-4xl md:text-2xl text-xl font-medium flex items-center gap-1">
            Career Summary
          </h2>
          {/* <button
            className={`text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors duration-300  "cursor-not-allowed opacity-70" : ""
            }`}
            onClick={() => setIsModalOpen(true)}
          >
            <>
              <Edit className="w-4 h-4" />
              <span className="text-sm">Edit Bio</span>
            </>
          </button> */}
        </div>
        <div className="w-full  mx-auto bg-white rounded-lg   space-y-2">
          {/* Job Title */}
          <div>
            <p className="text-xl font-semibold text-secondary mb-2">
              Job Title:
            </p>
            <p className="text-sm text-gray-400">Senior Marketing Specialist</p>
          </div>

          {/* Professional Summary */}
          <div>
            <p className="text-xl font-semibold text-secondary mt-2">
              Professional Summary:
            </p>
            <p className="text-base text-subtitle leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque magnam tempore doloribus amet. Cum voluptates veritatis
              totam, distinctio excepturi at adipisci? Nam nostrum cum
              laboriosam sequi quia vel nobis explicabo?
            </p>
          </div>
        </div>
      </div>
      {/* modal  */}
      <div className="">
        {isModalOpen && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
              <h2 className="text-xl font-bold mb-4">Edit Job Details</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block font-semibold text-gray-700">
                    Job Title
                  </label>
                  <input
                    {...register("jobTitle")}
                    className="w-full border-b border-gray-300 focus:outline-none"
                    placeholder="Job Title"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700">
                    Professional Summary
                  </label>
                  <textarea
                    {...register("professionalSummary")}
                    className="w-full border-b border-gray-300 focus:outline-none resize-none h-24"
                    placeholder="Professional Summary"
                  />
                </div>
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
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-green-700 cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
