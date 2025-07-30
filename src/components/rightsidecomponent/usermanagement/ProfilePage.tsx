"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProfileByIdQuery } from "../../../redux/features/userManger/userApi";
import AboutSection from "../../profile/AboutSection";
import ContactInfoProfile from "../../profile/Contact_info";
import EducationSection from "../../profile/EducationSection";
import ExperienceSection from "../../profile/Experience";
import ProfileHeader from "../../profile/ProfileHeader";
import SkillsSection from "../../profile/SkillsSection";
import { Profile } from "../../../types/AllTypes";

const ProfilePage: React.FC = () => {
  const { id } = useParams();
 

  const [profileData, setProfileData] = useState<Profile>({});

  const { data } = useGetProfileByIdQuery(id);
  

  useEffect(() => {
    if (data?.success) {
     
      setProfileData(data?.data);
    }
  }, [id, data]);


  return (
    <div className=" my-8 xl:mx-12 p-5 md:p-12 section-gap bg-white">
      <ProfileHeader
        firstName={profileData.firstName}
        lastName={profileData.lastName}
        phoneNumber={profileData.phoneNumber}
        city={profileData.city}
        countryRegion={profileData.countryRegion}
        JobTitle={profileData.JobTitle}
        email={profileData.email}
      />

      <div className="my-12 ">
        <AboutSection
          JobTitle={profileData?.JobTitle || ""}
          aboutMe={profileData?.aboutMe || ""}
        />
      </div>

      <div className="flex w-full gap-12 flex-col md:flex-row items-start">
        <div className="md:w-1/2 flex flex-col ">
          <EducationSection education={profileData?.education}  certifications={profileData.certifications} />
          <ContactInfoProfile socialLinks={profileData.socialMedia as any} />
        </div>

        <div className="md:w-1/2">

          <ExperienceSection jobExperience={profileData.jobExperience } />
          <SkillsSection  skills={profileData.skills}/>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
