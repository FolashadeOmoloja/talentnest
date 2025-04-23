import { FaCamera } from "react-icons/fa";
import { useRef, ChangeEvent } from "react";
import { userObject, userCompanyObject } from "@/utilities/constants/typeDef";
import {
  uploadCompanyProfilePhoto,
  uploadTalentProfilePhoto,
} from "@/hooks/upload-photo hook";
import { Loader2 } from "lucide-react";

interface ProfilePhotoProps {
  user: userObject | userCompanyObject;
  talent?: boolean;
}

const ProfilePhotoHandler: React.FC<ProfilePhotoProps> = ({ user, talent }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { handleProfilePhotoUpload, loading } = talent
    ? uploadTalentProfilePhoto()
    : uploadCompanyProfilePhoto();

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Function to handle file change (when a file is selected)
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleProfilePhotoUpload(file); // Pass the file to the upload handler
    }
  };

  return (
    <div className="relative">
      <div className="h-[200px] w-[200px] rounded-full overflow-hidden border border-[#000080]">
        {user?.profileImage ? (
          <img
            src={user?.profileImage}
            alt="Profile"
            className="object-center object-cover w-full h-full"
          />
        ) : (
          <div
            className={`w-full h-full text-white text-8xl font-bold centered`}
            style={{ background: user?.hex }}
          >
            {talent
              ? user?.firstName[0]
              : (user as userCompanyObject)?.companyName[0]}
          </div>
        )}

        {loading ? (
          <div
            className="w-10 h-10 rounded-full border-4 border-white text-white absolute bottom-[-15px] cursor-pointer left-[40%] z-10 centered"
            style={{ background: user?.hex }}
          >
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <div
            className="w-10 h-10 rounded-full border-4 border-white text-white absolute bottom-[-15px] cursor-pointer left-[40%] z-10 centered"
            style={{ background: user?.hex }}
            onClick={handleCameraClick}
          >
            <FaCamera />
          </div>
        )}

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};
export default ProfilePhotoHandler;
