"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import profileImg from '../../../assets/profile.jpg'
import ButtonChange from "../../shared/ButtonChange"

export default function SettingsContent() {
  const [contactMethod, setContactMethod] = useState("Email")
  const [assignRole, setAssignRole] = useState("Admin")

  // Forms for each section
  const {
    register: registerAdminInfo,
    handleSubmit: handleAdminInfoSubmit,
  } = useForm()

  const {
    register: registerInviteAdmin,
    handleSubmit: handleInviteAdminSubmit,
  } = useForm()

  const {
    register: registerContactInfo,
    handleSubmit: handleContactInfoSubmit,
  } = useForm()

  const {
    register: registerPasswordChange,
    handleSubmit: handlePasswordChangeSubmit,
  } = useForm()

  // Handlers
  const onAdminInfoSubmit = (data: any) => {
    console.log("Admin Info:", data)
  }

  const onInviteAdminSubmit = (data: any) => {
    console.log("Invite Admin:", { ...data, assignRole })
  }

  const onContactInfoSubmit = (data: any) => {
    console.log("Contact Info:", { ...data, contactMethod })
  }

  const onPasswordChangeSubmit = (data: any) => {
    console.log("Change Password:", data)
  }

  return (
    <div className="lg:px-12 min-h-screen grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        {/* Admin Information Section */}
        <form onSubmit={handleAdminInfoSubmit(onAdminInfoSubmit)} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-12">
          <h2 className="text-lg md:text-2xl text-black font-semibold">Admin Information</h2>
          <div className="mt-6 space-y-6">
            <div>
              <label className="text-sm md:text-[18px] text-black mb-2 block">Profile Picture:</label>
              <div className="relative w-[234px] h-[234px]">
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-full h-full object-cover border-neutral-100"
                />
              </div>
            </div>

            <div>
              <label htmlFor="adminName" className="text-sm md:text-[18px] text-black mb-2 block">Admin Name:</label>
              <input
                {...registerAdminInfo("adminName")}
                id="adminName"
                type="text"
                placeholder="Saifur Rahman"
                className="w-full px-[17px] py-4 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="emailAddress" className="text-sm md:text-[18px] text-black mb-2 block">Email Address:</label>
              <input
                {...registerAdminInfo("emailAddress")}
                id="emailAddress"
                type="email"
                placeholder="ex.saifur.info@gmail.com"
                className="w-full px-[17px] py-4 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="text-sm md:text-[18px] text-black mb-2 block">Phone Number:</label>
              <input
                {...registerAdminInfo("phoneNumber")}
                id="phoneNumber"
                type="tel"
                placeholder="+880 1967268747"
                className="w-full px-[17px] py-4 border border-gray-300 rounded-md"
              />
            </div>

            <p className="text-end">
              <ButtonChange type="submit"  />
            </p>
          </div>
        </form>

        {/* Invite Admin Section */}
        <form onSubmit={handleInviteAdminSubmit(onInviteAdminSubmit)} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-12">
          <h2 className="text-lg md:text-2xl text-black font-semibold">Invite Admin</h2>
          <div className="pt-6 space-y-6">
            <div>
              <label htmlFor="inviteEmail" className="text-sm md:text-[18px] text-black mb-2 block">Enter Email:</label>
              <input
                {...registerInviteAdmin("inviteEmail")}
                id="inviteEmail"
                type="email"
                placeholder="ex.saifur.info@gmail.com"
                className="w-full px-[17px] py-4 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="assignRole" className="text-sm md:text-[18px] text-black mb-2 block">Assign Role:</label>
              <div className="relative">
                <select
                  id="assignRole"
                  value={assignRole}
                  onChange={(e) => setAssignRole(e.target.value)}
                  className="w-full px-[17px] py-4 border border-gray-300 rounded-md appearance-none bg-white"
                >
                  <option value="Admin">Admin</option>
                  <option value="Moderator">Moderator</option>
                  <option value="User">User</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <p className="text-end">
              <ButtonChange type="submit" title="Invite Now" />
            </p>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        {/* Contact Information Section */}
        <form onSubmit={handleContactInfoSubmit(onContactInfoSubmit)} className="bg-white rounded-lg shadow-sm border border-gray-200 max-w-[750px] p-4 md:p-12">
          <h2 className="text-lg md:text-2xl text-black font-semibold">Contact Information</h2>
          <p className="text-[16px] text-black mt-1">
            Ensure that your contact details are accurate for appointment confirmations, reminders, and support.
          </p>
          <div className="pt-6 space-y-6">
            <div>
              <label htmlFor="businessAddress" className="text-sm md:text-[18px] text-black mb-2 block">Business Address:</label>
              <textarea
                {...registerContactInfo("businessAddress")}
                id="businessAddress"
                rows={3}
                placeholder="Section-06, House-70/80..."
                className="w-full px-[17px] py-4 border border-gray-300 rounded-md resize-none"
              />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="text-sm md:text-[18px] text-black mb-2 block">City:</label>
                <input
                  {...registerContactInfo("city")}
                  id="city"
                  type="text"
                  placeholder="Dhaka"
                  className="w-full px-[17px] py-4 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="zipCode" className="text-sm md:text-[18px] text-black mb-2 block">Zip Code:</label>
                <input
                  {...registerContactInfo("zipCode")}
                  id="zipCode"
                  type="text"
                  placeholder="1216"
                  className="w-full px-[17px] py-4 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contactMethod" className="text-sm md:text-[18px] text-black mb-2 block">Preferred Contact Method:</label>
                <div className="relative">
                  <select
                    id="contactMethod"
                    value={contactMethod}
                    onChange={(e) => setContactMethod(e.target.value)}
                    className="w-full px-[17px] py-4 border border-gray-300 rounded-md appearance-none bg-white"
                  >
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                    <option value="SMS">SMS</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="emailAddr" className="text-sm md:text-[18px] text-black mb-2 block">Email Address:</label>
                <input
                  {...registerContactInfo("emailAddr")}
                  id="emailAddr"
                  type="email"
                  placeholder="contact@example.com"
                  className="w-full px-[17px] py-4 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <p className="text-end">
              <ButtonChange type="submit" />
            </p>
          </div>
        </form>

        {/* Change Password Section */}
        <form onSubmit={handlePasswordChangeSubmit(onPasswordChangeSubmit)} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-12">
          <h2 className="text-lg md:text-2xl text-black font-semibold">Change Password:</h2>
          <p className="text-sm md:text-[16px] text-black mt-1">
            If you wish to update your password, enter a new one below.
          </p>
          <div className="pt-6 space-y-6">
            <div>
              <label htmlFor="currentPassword" className="text-sm md:text-[18px] text-black mb-2 block">Current Password:</label>
              <input
                {...registerPasswordChange("currentPassword")}
                id="currentPassword"
                type="password"
                placeholder="Current Password"
                className="w-full px-[17px] py-4 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="text-sm md:text-[18px] text-black mb-2 block">New Password:</label>
              <input
                {...registerPasswordChange("newPassword")}
                id="newPassword"
                type="password"
                placeholder="New Password"
                className="w-full px-[17px] py-4 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="text-sm md:text-[18px] text-black mb-2 block">Confirm Password:</label>
              <input
                {...registerPasswordChange("confirmPassword")}
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="w-full px-[17px] py-4 border border-gray-300 rounded-md"
              />
            </div>

            <p className="text-end">
              <ButtonChange type="submit" title="Change Password" />
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
