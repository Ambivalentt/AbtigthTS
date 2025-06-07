import { useState } from "react";
import ProfileHeader from "./sections/ProfileHeader.jsx";
import ProfileInfoList from "./sections/ProfileInfoList.jsx";
import ProfileComments from "./sections/ProfileComments.jsx";
import EditProfileModal from "./sections/EditProfileModal.jsx";
import FriendsSection from "./sections/FriendSection.jsx";

const ShowDetails = ({ userProfile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile);

  const handleChange = (field, value) => {
    setEditedProfile({ ...editedProfile, [field]: value });
  };

  const handleSave = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-[#131316] text-white p-6 sm:p-8 rounded-2xl border border-[#2c2c30] shadow-2xl mt-6 relative">
      <ProfileHeader user={editedProfile} onEditClick={() => setIsModalOpen(true)} />
      <ProfileInfoList user={editedProfile} />
      <FriendsSection />
      <ProfileComments />
      {isModalOpen && (
        <EditProfileModal
          user={editedProfile}
          onChange={handleChange}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ShowDetails;
