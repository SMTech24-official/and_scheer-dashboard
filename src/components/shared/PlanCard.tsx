import { FaCheckCircle, FaEuroSign, FaUsers, FaTimes } from "react-icons/fa";
import { Plan } from "../../types/AllTypes";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { useDeletePlanMutation, useUpdatePlanMutation } from "../../redux/features/Subscription/subscriptionSlice";
import { toast } from "sonner";
import Swal from 'sweetalert2'


interface PlanCardProps {
  plan: Plan;
  buttonText: string;
  onButtonClick?: () => void;
}

export default function PlanCard({
  plan,

}: PlanCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPlan, setEditedPlan] = useState(plan);

  const [deletePlan] = useDeletePlanMutation();
  const [updatePlan]=useUpdatePlanMutation()

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async(id:string) => {
    // Update logic here, e.g., API call to update the plan
    console.log("Updated Plan:", editedPlan);
    const res = await updatePlan({id,data:editedPlan})
    if (res && res.data) {
      toast.success("Plan Updated Successfully!");
    } else {
      // Check if res.error is defined before accessing it
      const errorMessage:any= res.error || "Failed to update plan";
      toast.error(errorMessage);
    }
    setIsEditing(false); // Exit editing mode
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { name, value } = e.target;

        // If the name is 'amount', convert it to a number
        if (name === "amount" || name === "intervalCount") {
            if (isNaN(Number(value))) return;
            setEditedPlan({
                ...plan,
                [name]: value ? Number(value) : 0, 
            });
        } else {
            setEditedPlan({ ...plan, [name]: value });
        }
  };

  const handleAddFeature = () => {
    setEditedPlan({
      ...editedPlan,
      features: [...editedPlan.features, ""], // Add empty string for a new feature
    });
  };

  const handleFeatureChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFeatures = [...editedPlan.features];
    updatedFeatures[index] = e.target.value;
    setEditedPlan({ ...editedPlan, features: updatedFeatures });
  };

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = editedPlan.features.filter((_, i) => i !== index);
    setEditedPlan({ ...editedPlan, features: updatedFeatures });
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28C76F",
      cancelButtonColor: "#6A7282",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {

        try {
          const res = await deletePlan(id);
          if (res.data) {
            toast.success("Plan Deleted!")
          }
        } catch (error) {

        }
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success"
        // });
      }
    });


  }

  return (
    <div className="md:max-w-[457px] w-full border border-gray-100  bg-white  rounded-lg shadow-md px-8 py-5 flex flex-col relative justify-between">
      {/* Price & Plan Type */}
      <div className="mb-5 md:mb-12">
        <div className="flex items-end">
          <span className="text-primary text-2xl md:text-4xl xl:text-[56px] font-bold flex items-center">
            <FaEuroSign />
            {isEditing ? (
              <input
                type=""
                name="amount"
                value={editedPlan.amount}
                onChange={handleChange}
                className="text-primary text-2xl md:text-4xl xl:text-[56px] font-bold bg-transparent border-none w-full"
              />
            ) : (
              editedPlan.amount
            )}
          </span>
          {editedPlan.interval && (isEditing ? (
            <input
              type="text"
              name="interval"
              value={editedPlan.interval}
              onChange={handleChange}
              className="bg-transparent border-none"
            />
          ) : (
            `/${editedPlan.interval}`
          ))}
        </div>
      </div>

      {/* Package Name */}
      <p className="text-sm text-gray-500">{editedPlan.planType}</p>
      <h1 className="text-2xl md:text-4xl text-black font-bold mb-8">
        {isEditing ? (
          <input
            type="text"
            name="planName"
            value={editedPlan.planName}
            onChange={handleChange}
            className="bg-transparent border-none w-full"
          />
        ) : (
          editedPlan.planName
        )}
      </h1>

      {/* Features */}
      <ul className="space-y-4 text-gray-700 mb-6">
        <p className="text-sm text-gray-500">Permissions:</p>
        {editedPlan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <FaCheckCircle className="text-green-500 mt-1" />
            {isEditing ? (
              <div className="flex gap-2 items-center w-full">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e)}
                  className=" border-none w-full bg-gray-100"
                />
                <button
                  onClick={() => handleRemoveFeature(index)}
                  className="text-red-500"
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <span>{feature}</span>
            )}
          </li>
        ))}
      </ul>

      {/* Add Feature Button */}
      {isEditing && (
        <button
          className="md:text-lg flex items-center text-primary gap-2 font-semibold rounded pr-4 py-2 mb-4 text-start cursor-pointer hover:text-green-600 transition-all duration-300"
          onClick={handleAddFeature}
        >
          <BsFillPatchPlusFill />Add Feature
        </button>
      )}

      {/* Button */}
      {isEditing ? (
        <div className="flex justify-between">
          <button
            className="bg-gray-500 text-white rounded px-4 py-2 mb-4 cursor-pointer"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
          <button
            className="bg-primary text-white rounded px-4 py-2 mb-4 cursor-pointer"
            onClick={()=>handleUpdate(editedPlan.id)}
          >
            Update
          </button>
        </div>
      ) : (
        <div>


          {/* <button
          className="bg-primary text-white rounded px-4 py-2 mb-4"
          onClick={onButtonClick}
          disabled={!onButtonClick}
        >
          {buttonText}
        </button> */}
        </div>
      )}

      <div className="flex justify-between border-t pt-3 border-gray-300 items-center">
        <p className="underline flex">
          <FaUsers className="my-auto mr-2 text-primary" />
          Total {editedPlan.totalSubscribers} Subscriber
        </p>

        <button className="flex items-center text-red-500 hover:bg-red-200 p-2 rounded cursor-pointer transition-all duration-300 group" onClick={() => handleDelete(editedPlan.id)}><MdDeleteOutline className="size-6 group-hover:rotate-6" /></button>

      </div>
      {/* Edit Button */}
      {!isEditing && (
        <button
          className="mt-4 text-black cursor-pointer absolute right-5 top-0 flex items-center gap-1 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition"
          onClick={handleEdit}
        >
          <FiEdit /> Edit
        </button>
      )}
    </div>
  );
}
