/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AboutSection from "../../profile/AboutSection";
import ContactInfoProfile from "../../profile/Contact_info";
import EducationSection from "../../profile/EducationSection";
import ExperienceSection from "../../profile/Experience";
import ProfileHeade from "../../profile/ProfileHeader";
import SkillsSection from "../../profile/SkillsSection";




const ProfilePage: React.FC = () => {
  // const [bioLoading, setBioLoading] = useState(false);

  function updateProfileData(field: string, value: any): void {
    // Here you would typically update the profile data, e.g., via API call or local state update.
    // For now, we'll just log the update for demonstration.
    console.log(`Updating profile field "${field}" with value:`, value);
    // Example: setBioLoading(true); // if you want to show a loading state
    // TODO: Implement actual update logic (e.g., API call)
  }

  // const updateProfileData = async (data: any) => {
  //   console.log(data);

  //   const formData = new FormData();
  // };

  return (
    <div className=" my-8 xl:mx-12 p-5 md:p-12 section-gap bg-white">
      <ProfileHeade />

      <div className="my-12 ">
        <AboutSection />
      </div>

      <div className="flex w-full gap-12 flex-col md:flex-row items-start">
        <div className="md:w-1/2 flex flex-col ">
          <EducationSection education={[]} />
          <ContactInfoProfile />
        </div>

        <div className="md:w-1/2">
          <ExperienceSection experiences={[]} />
          <SkillsSection
            skills={[]}
            onSkillsUpdate={(skills) => updateProfileData("skills", skills)}
          />
        </div>

      </div>







    </div>
  );
};

export default ProfilePage;
