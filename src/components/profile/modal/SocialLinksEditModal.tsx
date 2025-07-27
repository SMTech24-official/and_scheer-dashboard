
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  title: string;
  linkedin: string;
}

interface SocailContactModal {
  isModalOpenEdit: boolean;
  setIsModalOpenEdit: any;
}

const SocialLinksEditModal: React.FC<SocailContactModal> = ({
  isModalOpenEdit,
  setIsModalOpenEdit,
}) => {
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      title: "LinkedIn",
      linkedin: "linkedin.com/in/ux.saifur.info",
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit LinkedIn</h2>
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
                <label className="block text-gray-700">LinkedIn URL</label>
                <input
                  {...register("linkedin")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Enter LinkedIn URL"
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
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-green-600"
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

export default SocialLinksEditModal;
