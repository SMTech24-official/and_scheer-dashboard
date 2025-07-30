








const EducationSection = ({ education ,certifications}:any) => {

 
  return (
    <section>
      <div>
        <div className="flex items-center justify-between mb-4 border-b border-[#ccc] pb-3">
          <h2 className="lg:text-4xl md:text-2xl text-xl font-medium flex items-center gap-1">
            Education & Certifications
          </h2>
          
        </div>
      
        <div className="mt-7">
          <h2 className="lg:text-2xl text-lg font-medium text-secondary mb-3">
            EDUCATIONS
          </h2>
          <div className="space-y-6">
            <div className="flex justify-between  items-start pb-4">
              <div className="space-y-2">
                

                   {education?.map((edu:any, index:any) => (
            <div className="space-y-2" key={index}>
              <h3 className="md:text-lg text-base font-semibold text-secondary">{edu?.degree}</h3>
              <p className="text-subtitle">{edu?.institution_name || "Institution name not provided"}</p>
              <p className="text-base text-secondary font-medium ">{edu?.major || "Major not specified"}</p>
              <p className="text-sm text-subtitle">{edu?.startDate} - {edu?.endDate}</p>
            </div>
          ))}


              </div>
             
            </div>
            <div className="flex justify-between items-start pb-2">
              <div className="space-y-2">
                <h3 className="md:text-lg text-base  text-secondary font-semibold">
                  Bachelor of Arts in Communications
                </h3>
                <p className="text-base text-secondary font-medium ">
                  Graduated:
                </p>
                <p className="text-sm text-subtitle">
                  Start Date: Jun 25, 2016 - End Date: Jun 25, 2016
                </p>
              </div>
              {/* <button className="text-subtitle hover:text-gray-700 mt-2">
                ✎ Edit
              </button> */}
            </div>
          </div>
        </div>
        {/* two card eduction  */}
        {/* <div className="mt-7">
          <h2 className="lg:text-2xl text-xl font-medium text-secondary mb-3">
            CERTIFICATIONS
          </h2>
          <div className="space-y-6">
            <div className="flex justify-between  items-start pb-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-secondary">
                  Master of Business Administration (MBA), Marketing
                </h3>
                <p className="text-subtitle">
                  University of Berlin | Berlin, Germany
                </p>
                <p className="text-base text-secondary font-medium ">
                  Graduated:
                </p>
                <p className="text-sm text-subtitle">
                  Start Date: Jun 25, 2016 - End Date: Jun 25, 2016
                </p>
              </div>
            
            </div>
            <div className="flex justify-between items-start pb-2">
              <div className="space-y-2">
                <h3 className="text-lg text-secondary font-semibold">
                  Bachelor of Arts in Communications
                </h3>
                <p className="text-base text-secondary font-medium ">
                  Graduated:
                </p>
                <p className="text-sm text-subtitle">
                  Start Date: Jun 25, 2016 - End Date: Jun 25, 2016
                </p>
              </div>
            
            </div>
          </div>
        </div> */}

           {/* Certifications Section */}
        <div className="mt-7">
          <h2 className="lg:text-2xl text-xl font-medium text-secondary mb-3">CERTIFICATIONS</h2>
          <div className="space-y-6">
            {certifications?.map((cert:any, index:any) => (
              <div key={index} className="space-y-2 pb-4">
                <h3 className="text-lg font-semibold text-secondary">{cert.certification_name}</h3>
                <p className="text-sm text-gray-600">{cert.issuing_organization}</p>
                <p className="text-base text-secondary font-medium">
                  Issue Date: {cert.issue_date ? new Date(cert.issue_date).toLocaleDateString() : "Not Provided"}
                </p>
                <p className="text-base text-secondary font-medium">
                  Expiry Date: {cert.expiry_date ? new Date(cert.expiry_date).toLocaleDateString() : "Not Provided"}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

   
    </section>
  );
};

export default EducationSection;
