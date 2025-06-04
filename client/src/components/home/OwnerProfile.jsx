import { useState } from "react";
import {
  Users,
  Calendar,
  Mail,
  User,
  MessageCircle,
  Pencil,
  X,
  Check,
} from "lucide-react";

import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
const ShowDetails = ({ userProfile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile);

  const { avatar_url, full_name, username, birthdate, email } = editedProfile;
  const formattedBirthdate = birthdate ? format(parseISO(birthdate), "d 'de' MMMM 'de' yyyy", { locale: es }) : 'Agregar fecha de nacimiento';
  const comments = [
    {
      id: 1,
      author: "María López",
      avatar: "https://i.pravatar.cc/40?img=1",
      text: "¡Feliz cumple, Juan! 🎉🎂",
    },
    {
      id: 2,
      author: "Carlos Rivera",
      avatar: "https://i.pravatar.cc/40?img=2",
      text: "Buena charla ayer, bro 💬",
    },
    {
      id: 3,
      author: "Ana Torres",
      avatar: "https://i.pravatar.cc/40?img=3",
      text: "¡Qué buena foto la de tu viaje! 📸",
    },
  ];

  const handleChange = (field, value) => {
    setEditedProfile({ ...editedProfile, [field]: value });
  };

  const handleSave = () => {
    // Aquí puedes hacer una petición para guardar los datos editados si lo deseas.
    setIsModalOpen(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#131316] text-white p-6 sm:p-8 rounded-2xl border border-[#2c2c30] shadow-2xl mt-6 relative">
      {/* Botón editar */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute top-4 right-4 text-cyan-400 hover:text-white transition"
        title="Editar perfil"
      >
        <Pencil className="w-6 h-6" />
      </button>

      {/* Header */}
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

      {/* Info */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-base sm:text-lg">
        <div className="flex items-center gap-3 bg-[#1f1f23] p-4 rounded-xl border border-[#2c2c30]">
          <Mail className="w-6 h-6 text-cyan-400" />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-3 bg-[#1f1f23] p-4 rounded-xl border border-[#2c2c30]">
          <Calendar className="w-6 h-6 text-cyan-400" />
          <span>
            Fecha de nacimiento: {formattedBirthdate}
          </span>
        </div>
        <div className="flex items-center gap-3 bg-[#1f1f23] p-4 rounded-xl border border-[#2c2c30]">
          <User className="w-6 h-6 text-cyan-400" />
          <span>Edad: 23 años</span>
        </div>
        <div className="flex items-center gap-3 bg-[#1f1f23] p-4 rounded-xl border border-[#2c2c30]">
          <Users className="w-6 h-6 text-cyan-400" />
          <span>23 amigos</span>
        </div>
      </div>

      {/* Comentarios */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-cyan-400" />
          Comentarios del perfil
        </h3>
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex items-start gap-4 bg-[#1f1f23] p-4 rounded-xl border border-[#2c2c30]"
            >
              <img
                src={comment.avatar}
                alt="Avatar autor"
                className="w-10 h-10 rounded-full object-cover border border-gray-600"
              />
              <div>
                <p className="font-semibold text-cyan-300">{comment.author}</p>
                <p className="text-gray-300">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-[#1f1f23] border border-[#2c2c30] text-white p-6 rounded-2xl w-full max-w-md shadow-xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">Editar perfil</h2>

            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm text-cyan-300">
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={full_name}
                  onChange={(e) => handleChange("full_name", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#131316] border border-[#2c2c30] focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-cyan-300">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#131316] border border-[#2c2c30] focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-cyan-300">
                  Fecha de nacimiento
                </label>
                <input
                  type="date"
                  value={birthdate || ""}
                  onChange={(e) => handleChange("birthdate", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#131316] border border-[#2c2c30] focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            <button
              onClick={handleSave}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-lg transition"
            >
              <Check className="w-5 h-5" />
              Guardar cambios
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowDetails;
