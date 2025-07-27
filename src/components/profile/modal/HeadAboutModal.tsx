
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  name: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  image: File | null;
}

interface HeadModal {
  isModalOpen: boolean;
  setIsModalOpen: any;
}

const HeadAboutModal: React.FC<HeadModal> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: "Saifur Rahman",
      title: "UI/UX Designer",
      phone: "+880 1567-808747",
      email: "ux.saifur.info@gmail.com",
      location: "Dhaka, Bangladesh",
      image: null,
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

  return (
    <div className="">
      {isModalOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  {...register("name")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Name"
                />
              </div>
              <div>
                <label className="block text-gray-700">Title</label>
                <input
                  {...register("title")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Title"
                />
              </div>
              <div>
                <label className="block text-gray-700">Phone</label>
                <input
                  {...register("phone")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Phone"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  {...register("email")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Email"
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
                <label className="block text-gray-700">Image</label>
                <input
                  {...register("image")}
                  type="file"
                  className="bg-[#ccc] px-4 py-2 rounded-md mt-2"
                  placeholder="Location"
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
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-green-800"
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

export default HeadAboutModal;
