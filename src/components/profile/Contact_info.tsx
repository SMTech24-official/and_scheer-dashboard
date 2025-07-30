'use client'
import { useState } from "react";
import { Link } from "react-router-dom";
import SocialLinksAddModal from "./modal/SocialLinksAddModal";
import SocialLinksEditModal from "./modal/SocialLinksEditModal";

// Define the type for social links
type SocialLinks = {
  linkedin_profile_url?: string;
  personal_website_url?: string;
  other_social_media?: string;
  other_social_media_url?: string;
};

interface ContactInfoProfileProps {
  socialLinks?: SocialLinks; // Making socialLinks optional in case it's not provided
}

const ContactInfoProfile: React.FC<ContactInfoProfileProps> = ({ socialLinks }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 border-b border-[#ccc] pb-3">
        <h2 className="lg:text-4xl md:text-2xl text-xl font-medium flex items-center gap-1">
          Contact Information & Social Links
        </h2>
      </div>

      {/* Social Links */}
      <div>
        {socialLinks?.linkedin_profile_url && (
          <div className="flex justify-between items-start pb-4">
            <div className="space-y-2">
              <p className="text-base text-secondary font-medium">LinkedIn:</p>
              <Link
                to={socialLinks.linkedin_profile_url}
                className="text-sm text-[#009DFF] underline cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                {socialLinks.linkedin_profile_url}
              </Link>
            </div>
          </div>
        )}

        {socialLinks?.personal_website_url && (
          <div className="flex justify-between items-start pb-4">
            <div className="space-y-2">
              <p className="text-base text-secondary font-medium">Personal Website:</p>
              <Link
                to={socialLinks.personal_website_url}
                className="text-sm text-[#009DFF] underline cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                {socialLinks.personal_website_url}
              </Link>
            </div>
          </div>
        )}

        {socialLinks?.other_social_media && socialLinks?.other_social_media_url && (
          <div className="flex justify-between items-start pb-4">
            <div className="space-y-2">
              <p className="text-base text-secondary font-medium">{socialLinks.other_social_media}:</p>
              <Link
                to={socialLinks.other_social_media_url}
                className="text-sm text-[#009DFF] underline cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                {socialLinks.other_social_media_url}
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modals */}
      <SocialLinksAddModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <SocialLinksEditModal isModalOpenEdit={isModalOpenEdit} setIsModalOpenEdit={setIsModalOpenEdit} />
    </div>
  );
};

export default ContactInfoProfile;
