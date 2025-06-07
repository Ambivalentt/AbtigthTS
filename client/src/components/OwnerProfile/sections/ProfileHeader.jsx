import { Pencil } from "lucide-react";

const ProfileHeader = ({ user, onEditClick }) => {
  const { avatar_url, full_name, username } = user;

  return (
    <>
      <button
        onClick={onEditClick}
        className="absolute top-4 right-4 text-cyan-400 hover:text-white transition"
        title="Editar perfil"
      >
        <Pencil className="w-6 h-6" />
      </button>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={avatar_url}
          alt="Avatar"
          className="w-36 h-36 rounded-full object-cover border-4 border-cyan-500 shadow-lg"
        />
        <div className="text-center sm:text-left space-y-1">
          <h2 className="text-3xl font-extrabold">{full_name}</h2>
          <p className="text-cyan-400 text-lg">@{username}</p>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
