import React, { useEffect, useRef, useState } from "react";
import BirthdaySelector from "./BirtdayInput";
import { createUser, loginUser } from "../../api/user";
import { UserContext } from "../../context/user";

export default function RegisterModal({ onClose }) {
  const [fileName, setFileName] = useState("Seleccionar avatar");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    full_name: "",
    password: "",
    email: "",
    avatar_url: null,
    birthdate: "",
  });
  const { setUser } = React.useContext(UserContext);
  const modalRef = useRef(null);
  const fileInputRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("full_name", form.full_name);
      formData.append("password", form.password);
      formData.append("email", form.email);
      if (form.avatar_url) {
        formData.append("avatar_url", form.avatar_url);
      }
      formData.append("birthdate", form.birthdate);

      const response = await createUser(formData);
      const loginResponse = await loginUser({
        username: form.username,
        password: form.password,
      });
      setUser(loginResponse);
      onClose()
    } catch (error) {
      const errorMessage = error.message || "Error al registrarse";
      setError(errorMessage);
    } finally {
      setLoading(null);
    }
  };

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

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFileName(file.name);
      setForm({ ...form, avatar_url: file });
    } else {
      setFileName("No avatar selected");
      setForm({ ...form, avatar_url: null });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-[#1a1a1d] p-8 rounded-2xl max-w-md w-full border border-[#2a2a2e] shadow-lg"
      >
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Registrarse</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-600 text-white rounded">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="User (único)"
            className="w-full p-3 rounded-md bg-[#0e0e10] border border-[#2a2a2e] text-white"
            required
            disabled={loading}
          />
          <input
            type="text"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            placeholder="Nombre completo"
            className="w-full p-3 rounded-md bg-[#0e0e10] border border-[#2a2a2e] text-white"
            required
            disabled={loading}
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Contraseña"
            className="w-full p-3 rounded-md bg-[#0e0e10] border border-[#2a2a2e] text-white"
            required
            disabled={loading}
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="email"
            className="w-full p-3 rounded-md bg-[#0e0e10] border border-[#2a2a2e] text-white"
            required
            disabled={loading}
          />

          {/* file input */}
          <input
            name="avatar_url"
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            disabled={loading}
          />
          <button
            type="button"
            onClick={handleClick}
            disabled={loading}
            className={`w-full p-3 rounded-md bg-[#0e0e10] border border-[#2a2a2e] text-white flex flex-start flex-row items-center text-sm ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            <span className="bg-[#2a2a2e] text-nowrap py-1 px-3 rounded-lg text-white hover:bg-[#1a1a1b]">
              Upload Avatar
            </span>
            <span className="ml-2 truncate text-start text-xs lg:text-[1rem] font-light text-zinc-400 w-full">
              {fileName}
            </span>
          </button>

          <BirthdaySelector
            value={form.birthdate}
            onChange={(date) => setForm({ ...form, birthdate: date })}
            disabled={loading}
          />

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Registrando..." : "Registrarse"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2 border border-gray-600 hover:border-white text-gray-300 hover:text-white rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
