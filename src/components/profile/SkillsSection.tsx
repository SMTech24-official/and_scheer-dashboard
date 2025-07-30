


const SkillsSection= ({skills}:any) => {
  
 

  return (
    <section>
      <div>
        <div className="flex items-center justify-between mb-4 border-b border-[#ccc] pb-3">
          <h2 className="lg:text-4xl md:text-2xl text-xl font-medium flex items-center gap-1">
            Skills
          </h2>
          
        </div>
        <div className="flex flex-wrap gap-3 space-x-4 pb-4">

         {skills?.map((skill:any, index:any) => (
            <button
              key={index}
              className="px-6 py-2 bg-gray-100 text-secondary rounded-full shadow hover:bg-gray-200"
            >
              {skill}
            </button>
          ))}
         
        </div>
      </div>

    
    </section>
  );
};

export default SkillsSection;
