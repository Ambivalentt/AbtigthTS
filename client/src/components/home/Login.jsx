import React, { useEffect, useRef, useState } from "react";
import { loginUser } from "../../api/user"; // Asegúrate de tener esta función en tu API
import { UserContext } from "../../context/user";


export default function LoginModal({ onClose }) {
  const { setUser } = React.useContext(UserContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const modalRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      const response = await loginUser(form);
      setUser(response)
      onClose();
    } catch (error) {
      setError(error.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };


  const handleEscape = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-[#1a1a1d] p-8 rounded-2xl max-w-md w-full border border-[#2a2a2e] shadow-lg"
      >

        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Iniciar sesión</h2>
        {error && <div className="bg-red-500 text-white p-3 rounded-md mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Usuario"
            className="w-full p-3 rounded-md bg-[#0e0e10] border border-[#2a2a2e] text-white"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Contraseña"
            className="w-full p-3 rounded-md bg-[#0e0e10] border border-[#2a2a2e] text-white"
            required
          />
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md font-medium transition"
            >
              Iniciar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-600 hover:border-white text-gray-300 hover:text-white rounded-md transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
