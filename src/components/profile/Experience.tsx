

const ExperienceSection = ({ jobExperience }: any) => {
  console.log(jobExperience);

  return (
    <section>
      <h2 className="lg:text-4xl md:text-2xl text-xl font-medium">Work Experience</h2>
      {jobExperience?.map((exp: any, index: any) => (
        <div key={index} className="mt-6">
          <h3 className="font-semibold text-lg">{exp.job_title}</h3>
          <p className="text-sm text-gray-600">{exp.company_name}</p>

          <div className="text-sm text-gray-500">
            {/* Just display the dates directly */}
            <p>
              {new Date(exp.start_date).toLocaleDateString()} - {new Date(exp.end_date).toLocaleDateString()}
            </p>
          </div>

          <p>{exp.job_description}</p>

          <div className="mt-2">
            <h4 className="font-semibold text-sm">Skills:</h4>
            <ul className="list-disc pl-5">
              {exp?.skills?.map((skill: any, idx: any) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className="mt-2">
            <h4 className="font-semibold text-sm">Achievements:</h4>
            {exp.achievements.length > 0 ? (
              <ul className="list-disc pl-5">
                {exp.achievements?.map((achievement: any, idx: any) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </ul>
            ) : (
              <p>No achievements listed.</p>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default ExperienceSection;
