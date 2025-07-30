


const AboutSection = ({ JobTitle, aboutMe }:{JobTitle:string, aboutMe:string}) => {
  

  return (
    <section className="">
      <div>
        <div className="flex border-b pb-3 border-b-[#cfcbcb] items-center justify-between mb-4">
          <h2 className="lg:text-4xl md:text-2xl text-xl font-medium flex items-center gap-1">
            Career Summary
          </h2>
        </div>
        <div className="w-full  mx-auto bg-white rounded-lg   space-y-2">
          {/* Job Title */}
          <div>
            <p className="text-xl font-semibold text-secondary mb-2">
              Job Title:
            </p>
            <p className="text-sm text-gray-400">{JobTitle}</p>
          </div>

          {/* Professional Summary */}
          <div>
            <p className="text-xl font-semibold text-secondary mt-2">
              Professional Summary:
            </p>
            <p className="text-base text-subtitle leading-relaxed">{aboutMe}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
