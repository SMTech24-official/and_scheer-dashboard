  "use client"

  import { CgPhone } from "react-icons/cg"
  import { CiLocationOn } from "react-icons/ci"
  import { MdEmail } from "react-icons/md"
  import ButtonChange from "../../shared/ButtonChange"
import { useParams } from "react-router-dom"
import { useGetCompanyByIdQuery } from "../../../redux/features/company/companySlice"

  export default function CompanyDetails() {
    const {id} = useParams()
    console.log("Company ID:", id);
    const {data:company,isLoading }=useGetCompanyByIdQuery(id as string)
    console.log("Company :", company);
    const jobData = [
      {
        appId: "AFGJJ012",
        postingDate: "Jan 25, 2025 | 08:52 AM",
        salaryRange: "25,000 BDT",
        position: "UI/UX Designer",
        status: "Active",
        applicants: "120 Person",
        deadline: "Aug 25, 2025",
        time: "12 Days",
      },
      {
        appId: "AFGJJ012",
        postingDate: "Jan 25, 2025 | 08:52 AM",
        salaryRange: "25,000 BDT",
        position: "UI/UX Designer",
        status: "Active",
        applicants: "90 Person",
        deadline: "Aug 25, 2025",
        time: "8 Days",
      },
      {
        appId: "AFGJJ012",
        postingDate: "Jan 25, 2025 | 08:52 AM",
        salaryRange: "25,000 BDT",
        position: "UI/UX Designer",
        status: "Active",
        applicants: "70 Person",
        deadline: "Aug 25, 2025",
        time: "15 Days",
      },
      {
        appId: "AFGJJ012",
        postingDate: "Jan 25, 2025 | 08:52 AM",
        salaryRange: "25,000 BDT",
        position: "UI/UX Designer",
        status: "Pending",
        applicants: "99 Person",
        deadline: "Aug 25, 2025",
        time: "8 Days",
      },
    ]

    return (
      <div className="bg-gray-50 min-h-screen p-6">
        <div className=" mx-auto bg-white rounded-lg shadow-sm">
          {/* Header Section */}
          <div className="relative p-6 border-b border-gray-200">
            <div className=" flex flex-col lg:flex-row lg:items-start justify-center lg:justify-between">
              <div className="flex flex-col lg:flex-row items-center space-x-4">
                <div className=" w-20 h-20 md:w-[250px] md:h-[250px] bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl md:text-[86px] font-bold">SMT</span>
                </div>

                {/* Name & Title */}
                <div className="flex flex-col justify-center lg:block items-center">

                  <h2 className="text-xl md:text-5xl  font-bold">SM Technology</h2>
                  <p className=' md:text-[28px] mt-2 md:mb-6 text-subtitle'>Freelancer Based Company</p>

                  {/* Contact Info */}
                  <div className="text-xl flex flex-col md:flex-row items-center  gap-6 md:divide-x md:divide-gray-300 scale-70 lg:scale-100">
                    <p className="md:pr-6 flex flex-col"><p className='text-scheer-primary-dark flex'> <CgPhone className="my-auto mr-2" /> Phone:</p> +880 1567-808747</p>
                    <p className="md:pr-6 flex flex-col ml-12 md:ml-0"><p className='text-scheer-primary-dark'><MdEmail /> Email:</p> ux.saifur.info@gmail.com</p>
                    <p className=" flex flex-col"><p className='text-scheer-primary-dark'><CiLocationOn /> Location:</p> Dhaka, Bangladesh</p>
                  </div>





                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 md:static md:translate-x-0 flex md:justify-end space-x-3 scale-90">
                <button className="bg-primary hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                  Suspend Account
                </button>

                <button className="border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded-md text-sm font-medium">
                  Delete User
                </button>
              </div>

            </div>


          </div>

          {/* Company Description */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Company Description</h2>
            <p className="text-gray-700 leading-relaxed">
              A results-oriented marketing professional with 5+ years of experience in digital marketing, SEO, content
              creation, and data analysis. Passionate about driving growth through creative marketing strategies and
              data-driven decisions. Skilled in managing cross-functional teams and building strong brand presence through
              digital platforms. A results-oriented marketing professional with 5+ years of experience in digital
              marketing, SEO, content creation, and data analysis. Passionate about driving growth through creative
              marketing strategies and data-driven decisions. Skilled in managing cross-functional teams and building
              strong brand presence through digital platforms.
            </p>
          </div>

          {/* Location */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
            <div>
              <p className="text-gray-900 font-medium">Bangladesh, Dhaka</p>
              <p className="text-gray-600 text-sm">Section-06, Mirpur, Dhaka-1216</p>
            </div>
          </div>

          {/* Subscription Plan */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Subscription Plan</h2>
            <div>
              <p className="text-gray-600 text-sm mb-1">Plan Name</p>
              <p className="text-gray-900 font-medium">Pay-per-Job</p>
            </div>
          </div>

          {/* Job List */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Job List</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-4 py-3 text-left text-sm font-medium">App. ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Posting Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Salary Range ↕</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Position</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">No. of Applicants</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Deadline</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Time</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {jobData.map((job, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{job.appId}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{job.postingDate}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{job.salaryRange}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{job.position}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${job.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }`}
                        >
                          {job.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{job.applicants}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{job.deadline}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{job.time}</td>
                      <td className="px-4 py-3">
                        <button className="text-primary hover:text-green-800 text-sm font-medium">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
