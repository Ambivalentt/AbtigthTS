import React from "react";
import RegisterModal from "./Register.jsx";
import LoginModal from "./Login.jsx";
import { useState, useEffect } from "react";

export default function HomeNoUser() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="min-h-screen bg-[#0e0e10] text-white flex flex-col items-center justify-between px-4 py-8">
      <header className="w-full max-w-6xl flex justify-between items-center py-4 border-b border-[#2a2a2e]">
        <h1 className="text-2xl font-bold tracking-tight text-cyan-400">Abrigth</h1>
        <nav className="flex gap-1 md:gap-4"></nav>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl mt-12 gap-12">
        <div className="text-center lg:text-left max-w-xl">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Exprésate con libertad. <br className="hidden md:block" /> Comparte lo que importa.
          </h2>
          <p className="text-gray-400 mb-8">
            En Abrigth, la conversación es auténtica, el contenido es tuyo y la conexión es real. Únete a la red social que pone tus ideas primero.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={() => setShowLogin(true)}
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md font-medium transition"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => setShowRegister(true)}
              className="px-6 py-3 border border-gray-600 hover:border-white text-gray-300 hover:text-white rounded-md font-medium transition"
            >
              Registrarse
            </button>
          </div>
        </div>

        <div className="w-full max-w-md p-6 bg-[#1a1a1d] rounded-2xl shadow-xl border border-[#2a2a2e]">
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">Qué puedes hacer en Abrigth:</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center gap-2">
              <span className="text-cyan-400">•</span> Publicar pensamientos sin filtros
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cyan-400">•</span> Seguir personas que te inspiran
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cyan-400">•</span> Participar en temas relevantes
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cyan-400">•</span> Crear tu comunidad
            </li>
          </ul>
        </div>
      </main>

      <footer className="w-full max-w-6xl mt-16 py-6 text-center text-sm text-gray-500 border-t border-[#2a2a2e]">
        © 2025 Abrigth — Tu espacio, tu voz
      </footer>

      {/* Modales */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </div>
  );
}