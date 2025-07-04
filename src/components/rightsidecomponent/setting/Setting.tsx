"use client"

import { useState } from "react"
import profileImg from '../../../assets/profile.jpg'
import ButtonChange from "../../shared/ButtonChange"

export default function SettingsContent() {
  const [contactMethod, setContactMethod] = useState("Email")
  const [assignRole, setAssignRole] = useState("Admin")

  return (
    <div className="px-3 lg:px-12  min-h-screen grid grid-cols-1 md:grid-cols-2 gap-6">


      <div className="space-y-6">


        {/* Admin Information Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
          <div className="">
            <h2 className="text-lg md:text-2xl  text-black font-semibold ">
              Admin Information

            </h2>
          </div>
          <div className="mt-6  space-y-6">
            <div>
              <label className="text-sm md:text-[18px]  text-black mb-2 block">Profile Picture:</label>
              <div className="relative w-[234px] h-[234px]">
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-full h-full object-cover   border-neutral-100"
                />
                {/* <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div> */}
              </div>
            </div>

            <div>
              <label htmlFor="adminName" className="text-sm md:text-[18px]  text-black mb-2 block">
                Admin Name:
              </label>
              <input
                id="adminName"
                type="text"
                placeholder="Saifur Rahman"
                className="w-full px-[17px] py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="emailAddress" className="text-sm md:text-[18px]  text-black mb-2 block">
                Email Address:
              </label>
              <input
                id="emailAddress"
                type="email"
                placeholder="ex.saifur.info@gmail.com"
                className="w-full px-[17px] py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="text-sm md:text-[18px]  text-black mb-2 block">
                Phone Number:
              </label>
              <input
                id="phoneNumber"
                type="tel"
                placeholder="+880 1967268747"
                className="w-full px-[17px] py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
              />
            </div>

            <p className="text-end">
              <ButtonChange />
            </p>

          </div>
        </div>


        {/* Invite Admin Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
          <div className=" ">
            <h2 className="text-lg md:text-2xl  text-black font-semibold ">Invite Admin</h2>
          </div>
          <div className="pt-6 space-y-6">
            <div>
              <label htmlFor="inviteEmail" className="text-sm md:text-[18px]  text-black mb-2 block">
                Enter Email:
              </label>
              <input
                id="inviteEmail"
                type="email"
                placeholder="ex.saifur.info@gmail.com"
                className="w-full px-[17px] py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="assignRole" className="text-sm md:text-[18px]  text-black mb-2 block">
                Assign Role:
              </label>
              <div className="relative">
                <select
                  id="assignRole"
                  value={assignRole}
                  onChange={(e) => setAssignRole(e.target.value)}
                  className="w-full px-[17px] py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent appearance-none bg-white"
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
              <ButtonChange title="Invite Now" />
            </p>
          </div>
        </div>

      </div>

      <div className=" space-y-6 ">
        {/* Contact Information Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 max-w-[750px]  p-12">
          <div className="">
            <h2 className="text-lg md:text-2xl  text-black font-semibold ">Contact Information</h2>
            <p className="text-[16px] text-black mt-1">
              Ensure that your contact details are accurate for appointment confirmations, reminders, and support.
            </p>
          </div>
          <div className="pt-6 space-y-6">
            <div>
              <label htmlFor="businessAddress" className="text-sm md:text-[18px]  text-black mb-2 block">
                Business Address:
              </label>
              <textarea
                id="businessAddress"
                placeholder="Section-06, House-70/80, Road-8/1, Block- C(Ka), Mirpur, Dhaka, Bangladesh."
                rows={3}
                className="w-full px-[17px] py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="text-sm md:text-[18px]  text-black mb-2 block">
                  City:
                </label>
                <input
                  id="city"
                  type="text"
                  placeholder="ex.saifur.info@gmail.com"
                  className="w-full px-[17px] py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="zipCode" className="text-sm md:text-[18px]  text-black mb-2 block">
                  Zip Code:
                </label>
                <input
                  id="zipCode"
                  type="text"
                  placeholder="+880 1967268747"
                  className="w-full px-[17px] py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="contactMethod" className="text-sm md:text-[18px]  text-black mb-2 block">
                  Preferred Contact Method:
                </label>
                <div className="relative">
                  <select
                    id="contactMethod"
                    value={contactMethod}
                    onChange={(e) => setContactMethod(e.target.value)}
                    className="w-full px-[17px] py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent appearance-none bg-white"
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
                <label htmlFor="emailAddr" className="text-sm md:text-[18px]  text-black mb-2 block">
                  Email Address:
                </label>
                <input
                  id="emailAddr"
                  type="email"
                  placeholder="ex.saifur.info@gmail.com"
                  className="w-full px-[17px] py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
                />
              </div>
            </div>

            
            <p className="text-end">
              <ButtonChange />
            </p>
          </div>
        </div>


        {/* Change Password Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
          <div className=" ">
            <h2 className="text-lg md:text-2xl  text-black font-semibold ">Change Password:</h2>
            <p className="text-sm md:text-[16px] text-black mt-1">If you wish to update your password, enter a new one below.</p>
          </div>
          <div className="pt-6 space-y-6">
            <div>
              <label htmlFor="currentPassword" className="text-sm md:text-[18px]  text-black mb-2 block">
                Current Password:
              </label>
              <input
                id="currentPassword"
                type="password"
                placeholder="dargusLJOB#5"
                className="w-full px-[17px] py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="text-sm md:text-[18px]  text-black mb-2 block">
                New Password:
              </label>
              <input
                id="newPassword"
                type="password"
                placeholder="dargusLJOB#5ot"
                className="w-full px-[17px] py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="text-sm md:text-[18px]  text-black mb-2 block">
                Confirm Password:
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="dargusLJOB#5ot"
                className="w-full px-[17px] py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
              />
            </div>

            
            <p className="text-end">
              <ButtonChange title="Change Password" />
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
