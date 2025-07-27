
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
  isModalOpenEdit: boolean;
  setIsModalOpenEdit: any;
}

const EductionEditModal: React.FC<EductionAddModal> = ({
  isModalOpenEdit,
  setIsModalOpenEdit,
}) => {
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      title: "Education",
      degree: "Master of Business Administration (MBA), Marketing",
      university: "University of Berlin",
      location: "Berlin, Germany",
      startDate: "Jun 25, 2016",
      endDate: "Jun 25, 2016",
      summary:
        "Graduated with a focus on marketing strategies, management studies, and commercial education.",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    setIsModalOpenEdit(false); // Close modal after submission
    reset(data); // Update default values with submitted data
  };

  // const handleEdit = () => {
  //   setIsModalOpenEdit(true);
  // };

  const handleCancel = () => {
    setIsModalOpenEdit(false);
    reset();
  };

  // const { defaultValues } = formState;

  return (
    <div className="">
      {isModalOpenEdit && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
            <h2 className="text-xl font-bold mb-4">Edit Education</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-gray-700">Title</label>
                <input
                  {...register("title")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Title"
                />
              </div>
              <div>
                <label className="block text-gray-700">Degree</label>
                <input
                  {...register("degree")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Degree"
                />
              </div>
              <div>
                <label className="block text-gray-700">University</label>
                <input
                  {...register("university")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="University"
                />
              </div>
              <div>
                <label className="block text-gray-700">Location</label>
                <input
                  {...register("location")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Location"
                />
              </div>
              <div>
                <label className="block text-gray-700">Start Date</label>
                <input
                  {...register("startDate")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Start Date"
                />
              </div>
              <div>
                <label className="block text-gray-700">End Date</label>
                <input
                  {...register("endDate")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="End Date"
                />
              </div>
              <div>
                <label className="block text-gray-700">Summary</label>
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

export default EductionEditModal;
