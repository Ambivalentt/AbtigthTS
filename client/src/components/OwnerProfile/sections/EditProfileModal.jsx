import { useEffect } from "react";
import { X, Check } from "lucide-react";

const EditProfileModal = ({ user, onChange, onClose, onSave }) => {
  const { full_name, email, birthdate } = user;

  // Cerrar modal con Escape
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Detener que el clic dentro del modal burbujee al fondo
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose} // clic en el fondo cierra modal
    >
      <div
        className="bg-[#1f1f23] border border-[#2c2c30] text-white p-6 rounded-2xl w-full max-w-md shadow-xl relative"
        onClick={handleModalClick} // evitar cerrar modal clic dentro
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4">Editar perfil</h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-cyan-300">Nombre completo</label>
            <input
              type="text"
              value={full_name}
              onChange={(e) => onChange("full_name", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#131316] border border-[#2c2c30] focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-cyan-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => onChange("email", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#131316] border border-[#2c2c30] focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-cyan-300">Fecha de nacimiento</label>
            <input
              type="date"
              value={birthdate || ""}
              onChange={(e) => onChange("birthdate", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#131316] border border-[#2c2c30] focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        <button
          onClick={onSave}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-lg transition"
        >
          <Check className="w-5 h-5" />
          Guardar cambios
        </button>
      </div>
    </div>
  );
};

export default EditProfileModal;
