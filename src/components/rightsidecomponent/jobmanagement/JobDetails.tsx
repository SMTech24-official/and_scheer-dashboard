"use client"

import { CiLocationOn } from "react-icons/ci"

export default function JobDetails() {
  return (
    <div className=" min-h-screen p-6 w-full">
      <div className="mx-auto bg-white rounded-lg shadow-sm md:px-12 py-8">
        {/* Header Section */}
        <div className="relative p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between">
            <div className="flex flex-col md:flex-row items-start space-x-4">
              <div className="w-20 h-20 md:w-[180px] md:h-[180px] bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-2xl md:text-[65px] font-bold">SMT</span>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">SM Technology</h1>
                <div className="mt-2">
                  <h2 className="text-xl font-semibold text-gray-800 inline">UI / UX Designer</h2>
                  <span className="ml-2 text-green-600 font-medium">(Onsite)</span>
                </div>

                {/* Job Info */}
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CiLocationOn className="mr-1" />
                    <span>Dhaka, Bangladesh</span>
                  </div>
                  <span>•</span>
                  <span>1-2 Yr</span>
                  <span>•</span>
                  <span>Uploaded 2 days ago</span>
                  <span>•</span>
                  <span>Over 100 applicants</span>
                </div>

                {/* Skills */}
                <div className="mt-3">
                  <span className="text-sm font-medium text-gray-700">Skill Needed: </span>
                  <span className="text-sm text-gray-600">
                    Figma • Adobe Illustrator • Adobe Photoshop • Adobe XD(optional)
                  </span>
                </div>

                {/* Application Deadline */}
                <div className="mt-2">
                  <span className="text-sm font-medium text-gray-700">Application Deadline: </span>
                  <span className="text-sm text-gray-600">Aug 25, 2025</span>
                </div>

                {/* Salary */}
                <div className="mt-4">
                  <span className="text-3xl font-bold text-green-600">$4,500</span>
                  <span className="text-lg text-gray-600 ml-1">/Month</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-4 lg:mt-0">
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                Suspend Job
              </button>
              <button className="border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded-md text-sm font-medium">
                Delete Job
              </button>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg md:text-[28px] font-semibold  mb-3">Job Description:</h3>
          <p className="text-gray-700 leading-relaxed">
            We are looking for a talented UI/UX Designer to join our onsite team in Dhaka. You'll work closely with
            product managers and developers to create intuitive, user-friendly digital experiences.
          </p>
        </div>

        {/* Responsibilities */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg md:text-[28px] font-semibold  mb-3">Responsibilities:</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Design user-centric interfaces for web and mobile applications
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Conduct user research and usability testing
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Create wireframes, prototypes, and high-fidelity mockups
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Collaborate with cross-functional teams to implement designs
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Maintain brand consistency across all platforms
            </li>
          </ul>
        </div>

        {/* Requirements */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg md:text-[28px] font-semibold  mb-3">Requirements:</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              2+ years of experience in UI/UX design
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Proficient in tools like Figma, Adobe XD, or Sketch
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Strong portfolio of design projects
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Excellent communication and problem-solving skills
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Bachelor's degree in Design, Computer Science, or related field
            </li>
          </ul>
        </div>

        {/* Why Join SM Technology */}
        <div className="p-6">
          <h3 className="text-lg md:text-[28px] font-semibold  mb-3">Why Join SM Technology?</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Competitive salary and benefits
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Opportunity to work on innovative products
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Professional growth and development support
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Collaborative and inclusive work culture
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
