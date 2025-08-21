"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import profileImg from "../../../assets/User.jpg";
import {
  useChangePasswordMutation,
  useGetCurrentUserQuery,
  useMakeAdminMutation,
  useUpdateContactInfoMutation,
} from "../../../redux/features/auth/auth";
import { useUpdateUserMutation } from "../../../redux/features/userManger/userApi";
import ButtonChange from "../../shared/ButtonChange";

export default function SettingsContent() {
  const [preferredContactMethod, setPreferredContactMethod] = useState("phone");
  const { data } = useGetCurrentUserQuery({});
  

 const [users,setUsers]= useState<any>(null)
 
useEffect(()=>{
  if(data){
    setUsers(data)
  }
},[data])

  

  // Forms for each section
  const {
    register: registerAdminInfo,
    handleSubmit: handleAdminInfoSubmit,
    formState: { errors: adminInfoErrors },
    reset: resetAdminInfo,
  } = useForm();

  const {
    register: registerInviteAdmin,
    handleSubmit: handleInviteAdminSubmit,
    formState: { errors: inviteAdminErrors },
    reset: resetInviteAdmin,
  } = useForm();

  const {
    register: registerContactInfo,
    handleSubmit: handleContactInfoSubmit,
    formState: { errors: contactInfoErrors },
    reset: resetContactInfo,
  } = useForm();

  const {
    register: registerPasswordChange,
    handleSubmit: handlePasswordChangeSubmit,
    formState: { errors: passwordChangeErrors },
    watch,
    reset: resetPassword,
  } = useForm();

  // Handlers
  const [updateUser, { isLoading: loading }] = useUpdateUserMutation();
  const onAdminInfoSubmit = async (data: any) => {
    const formData = new FormData();

    if (data.fullName) {
      formData.append("fullName", data.fullName);
    }
    if (data.adminPhoto && data.adminPhoto[0]) {
      formData.append("file", data.adminPhoto[0]);
    }

    try {
      await updateUser(formData).unwrap();
      toast.success("Admin updated successfully");
      resetAdminInfo();
    } catch (error) {
      toast.error("Failed to update admin");
      console.error("Admin update error:", error);
    }
  };

  const [makeAdmin, { isLoading: makeAdminLoading }] = useMakeAdminMutation();
  const onInviteAdminSubmit = async (data: any) => {
    try {
      const res = await makeAdmin(data.inviteEmail).unwrap();
      if (res.success) {
        toast.success("Admin invited successfully");
        resetInviteAdmin();
      }
    } catch (error) {
      toast.error("Failed to invite admin");
      console.error("Invite admin error:", error);
    }
  };

  console.log(preferredContactMethod)
  const [updateContact] = useUpdateContactInfoMutation();
  const onContactInfoSubmit = async (data: any) => {
    try {
      await updateContact({ ...data, preferredContactMethod }).unwrap();
      toast.success("Contact information updated successfully");
      resetContactInfo();
    } catch (error) {
      toast.error("Failed to update contact information");
      console.error("Contact info error:", error);
    }
  };

  const [changePassword, { isLoading: passwordLoading }] =
    useChangePasswordMutation();
  const onPasswordChangeSubmit = async (data: any) => {
    try {
      await changePassword(data).unwrap();
      toast.success("Password changed successfully");
      resetPassword();
    } catch (error) {
      toast.error("Failed to change password");
      console.error("Password change error:", error);
    }
  };

  // Watch password for confirmation validation
  const newPassword = watch("newPassword");

  console.log(users)

  return (
    <div className="lg:px-12 min-h-screen grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        {/* Admin Information Section */}
        <form
          onSubmit={handleAdminInfoSubmit(onAdminInfoSubmit)}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-12"
        >
          <h2 className="text-lg md:text-2xl text-black font-semibold">
            Admin Information
          </h2>
          <div className="mt-6 space-y-6">
            <div>
              <label className="text-sm md:text-[18px] text-black mb-2 block">
                Profile Picture:
              </label>
              <div className="relative w-[234px] h-[234px] ">
                <img
                  src={users?.data?.profilePic || profileImg}
                  alt="Profile"
                  className="w-full h-full object-cover border-neutral-100 rounded-full"
                />
              </div>
            </div>

            <div className="relative p-2 my-2">
              <input
                type="file"
                {...registerAdminInfo("adminPhoto", {})}
                id="adminPhoto"
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4 file:rounded-md
                  file:border-0 file:text-sm file:font-semibold
                  file:bg-pink-50 file:text-primary
                  hover:file:bg-pink-100 cursor-pointer"
              />
              {adminInfoErrors.adminPhoto && (
                <p className="text-red-500 text-sm mt-1">
                  {adminInfoErrors.adminPhoto.message as string}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="fullName"
                className="text-sm md:text-[18px] text-black mb-2 block"
              >
                Admin Name:
              </label>
              <input
                {...registerAdminInfo("fullName", {
                  required: "Full name is required",
                })}
                id="fullName"
                type="text"
                defaultValue={users?.data?.fullName}
                placeholder="admin"
                className="w-full px-[17px] py-4 border border-gray-300 rounded-md"
              />
              {adminInfoErrors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {adminInfoErrors.fullName.message as string}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="emailAddress"
                className="text-sm md:text-[18px] text-black mb-2 block"
              >
                Email Address:
              </label>
              <input
                {...registerAdminInfo("emailAddress")}
                id="emailAddress"
                type="email"
                value={users?.data?.email || ""}
                placeholder="ex.saifinfo@gmail.com"
                readOnly
                className="w-full px-[17px] py-4 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>

            <p className="text-end">
              <ButtonChange disabled={loading} type="submit" />
            </p>
          </div>
        </form>

        {/* Invite Admin Section */}
        <form
          onSubmit={handleInviteAdminSubmit(onInviteAdminSubmit)}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-12"
        >
          <h2 className="text-lg md:text-2xl text-black font-semibold">
            Make Admin
          </h2>
          <div className="pt-6 space-y-6">
            <div>
              <label
                htmlFor="inviteEmail"
                className="text-sm md:text-[18px] text-black mb-2 block"
              >
                Enter Email:
              </label>
              <input
                {...registerInviteAdmin("inviteEmail", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                id="inviteEmail"
                type="email"
                placeholder="ex.saifur.info@gmail.com"
                className="w-full px-[17px] py-4 border border-gray-300 rounded-md"
              />
              {inviteAdminErrors.inviteEmail && (
                <p className="text-red-500 text-sm mt-1">
                  {inviteAdminErrors.inviteEmail.message as string}
                </p>
              )}
            </div>

            <p className="text-end">
              <ButtonChange
                disabled={makeAdminLoading}
                type="submit"
                title="Invite Now"
              />
            </p>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        {/* Contact Information Section */}
        <form
          onSubmit={handleContactInfoSubmit(onContactInfoSubmit)}
          className="bg-white rounded-lg shadow-sm border border-gray-200 max-w-[750px] p-4 md:p-12"
        >
          <h2 className="text-lg md:text-2xl text-black font-semibold">
            Contact Information
          </h2>
          <p className="text-[16px] text-black mt-1">
            Ensure that your contact details are accurate for appointment
            confirmations, reminders, and support.
          </p>
          <div className="pt-6 space-y-6">
            <div>
              <label
                htmlFor="address"
                className="text-sm md:text-[18px] text-black mb-2 block"
              >
                Business Address:
              </label>
              <textarea
                {...registerContactInfo("address", {
                  required: "Address is required",
                })}
                id="address"
                defaultValue={users?.data?.address}
                rows={3}
                placeholder="10117 Berlin ,Germany"
                className="w-full px-[17px] py-4 border border-gray-300 rounded-md resize-none"
              />
              {contactInfoErrors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {contactInfoErrors.address.message as string}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="city"
                  className="text-sm md:text-[18px] text-black mb-2 block"
                >
                  City:
                </label>
                <input
                  {...registerContactInfo("city", {
                    required: "City is required",
                  })}
                  id="city"
                  type="text"
                  defaultValue={users?.data?.city}
                  placeholder="Berlin"
                  className="w-full px-[17px] py-4 border border-gray-300 rounded-md"
                />
                {contactInfoErrors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {contactInfoErrors.city.message as string}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="zipCode"
                  className="text-sm md:text-[18px] text-black mb-2 block"
                >
                  Zip Code:
                </label>
                <input
                  {...registerContactInfo("zipCode", {
                    required: "Zip code is required",
                    pattern: {
                      value: /^\d{5}(?:[-\s]\d{4})?$/,
                      message: "Invalid zip code",
                    },
                  })}
                  id="zipCode"
                  type="text"
                  defaultValue={users?.data?.zipCode}
                  placeholder="1216"
                  className="w-full px-[17px] py-4 border border-gray-300 rounded-md"
                />
                {contactInfoErrors.zipCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {contactInfoErrors.zipCode.message as string}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="preferredContactMethod"
                  className="text-sm md:text-[18px] text-black mb-2 block"
                >
                  Preferred Contact Method:
                </label>
                <div className="relative">
                  <select
                    id="preferredContactMethod"
                    value={preferredContactMethod}
                    onChange={(e) => setPreferredContactMethod(e.target.value)}
                    className="w-full px-[17px] py-4 border border-gray-300 rounded-md appearance-none bg-white"
                  >
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="text-sm md:text-[18px] text-black mb-2 block"
                >
                {preferredContactMethod==="phone" && "Phone Number"}
                {preferredContactMethod==="email" && "Email"}
                </label>
                {
                  preferredContactMethod==="phone" &&(<input
                  {...registerContactInfo("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value:
                        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                      message: "Invalid phone number",
                    },
                  })}
                  id="phone"
                  type="tel"
              
                  placeholder={users?.data?.phone}
                  className="w-full px-[17px] py-4 border border-gray-300 rounded-md"
                />) }{ preferredContactMethod==="email"&&(<input
                 
                  id="email"
                  type="email"
                  value={users?.data?.email}
                  readOnly
                  title="Not Changeable"
                  placeholder="exm.abc@gmail.com"
                  className="w-full px-[17px] py-4 border border-gray-300 rounded-md cursor-not-allowed"
                />)
                }
               
                {contactInfoErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {contactInfoErrors.phone.message as string}
                  </p>
                )}
              </div>
            </div>

            <p className="text-end">
              <ButtonChange type="submit" />
            </p>
          </div>
        </form>

        {/* Change Password Section */}
        <form
          onSubmit={handlePasswordChangeSubmit(onPasswordChangeSubmit)}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-12"
        >
          <h2 className="text-lg md:text-2xl text-black font-semibold">
            Change Password:
          </h2>
          <p className="text-sm md:text-[16px] text-black mt-1">
            If you wish to update your password, enter a new one below.
          </p>
          <div className="pt-6 space-y-6">
            <div>
              <label
                htmlFor="currentPassword"
                className="text-sm md:text-[18px] text-black mb-2 block"
              >
                Current Password:
              </label>
              <input
                {...registerPasswordChange("currentPassword", {
                  required: "Current password is required",
                })}
                id="currentPassword"
                type="password"
                placeholder="Current Password"
                className="w-full px-[17px] py-4 border border-gray-300 rounded-md"
              />
              {passwordChangeErrors.currentPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {passwordChangeErrors.currentPassword.message as string}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="text-sm md:text-[18px] text-black mb-2 block"
              >
                New Password:
              </label>
              <input
                {...registerPasswordChange("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                id="newPassword"
                type="password"
                placeholder="New Password"
                className="w-full px-[17px] py-4 border border-gray-300 rounded-md"
              />
              {passwordChangeErrors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {passwordChangeErrors.newPassword.message as string}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="text-sm md:text-[18px] text-black mb-2 block"
              >
                Confirm Password:
              </label>
              <input
                {...registerPasswordChange("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="w-full px-[17px] py-4 border border-gray-300 rounded-md"
              />
              {passwordChangeErrors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {passwordChangeErrors.confirmPassword.message as string}
                </p>
              )}
            </div>

            <p className="text-end">
              <ButtonChange
                type="submit"
                title="Change Password"
                disabled={passwordLoading}
              />
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
