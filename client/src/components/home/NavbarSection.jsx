import { useEffect, useRef, useState } from "react";
import { User, LogOut, Search, Users, Bell, Home, MessageCircle, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/user.jsx";
import { logOut } from '../../api/user.jsx';
import LoginModal from "./Login.jsx";
import RegisterModal from "./Register.jsx";
export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [msgOpen, setMsgOpen] = useState(false);
    const dropdownRef = useRef(null);
    const notifRef = useRef(null);
    const msgRef = useRef(null);
    const { user, setUser } = useStateContext();
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const navigate = useNavigate();
    const notifications = ["Comentario nuevo", "Like en tu post"];
    const messages = ["Mensaje de Juan", "Mensaje de Ana"];

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setDropdownOpen(false);
        }
        if (notifRef.current && !notifRef.current.contains(e.target)) {
            setNotifOpen(false);
        }
        if (msgRef.current && !msgRef.current.contains(e.target)) {
            setMsgOpen(false);
        }
    };

    const handleEscape = (e) => {
        if (e.key === "Escape") {
            setDropdownOpen(false);
            setNotifOpen(false);
            setMsgOpen(false);
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

    const handleLogOut = async () => {
        try {
            const response = await logOut();
            console.log("Sesión cerrada correctamente:", response);
            setDropdownOpen(false);
            setUser(null);
            navigate("/");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <nav className="w-full bg-[#0e0e10] text-white border-b border-[#2a2a2e] shadow-sm px-4 py-3 flex items-center justify-between">
            <Link to="/" className="text-5xl w-12 font-bold text-cyan-400">A</Link>

            {user ? (
                <>
                    <div className="flex gap-6 lg:gap-x-15 items-center">
                        <Link to="/" className="hover:text-cyan-400 sm:block hidden">
                            <Home className="w-8 h-8" />
                        </Link>
                        <Link to="/friends" className="hover:text-cyan-400 sm:block hidden">
                            <Users className="w-8 h-8" />
                        </Link>

                        {/* Mensajes */}
                        <div className="relative" ref={msgRef}>
                            <button
                                onClick={() => {
                                    setMsgOpen(!msgOpen);
                                    setNotifOpen(false);
                                    setDropdownOpen(false);
                                }}
                                className="relative hover:text-cyan-400"
                            >
                                <MessageCircle className="w-8 h-8" />
                                {messages.length > 0 && (
                                    <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
                                        {messages.length}
                                    </span>
                                )}
                            </button>
                            {msgOpen && (
                                <div className="absolute -right-35 md:right-0 mt-2 w-64 bg-[#1a1a1d] border border-[#2a2a2e] rounded-xl shadow-lg py-2 z-50">
                                    {messages.map((msg, index) => (
                                        <div key={index} className="px-4 py-2 hover:bg-[#2a2a2e] text-sm">
                                            {msg}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Notificaciones */}
                        <div className="relative" ref={notifRef}>
                            <button
                                onClick={() => {
                                    setNotifOpen(!notifOpen);
                                    setMsgOpen(false);
                                    setDropdownOpen(false);
                                }}
                                className="relative hover:text-cyan-400"
                            >
                                <Bell className="w-8 h-8" />
                                {notifications.length > 0 && (
                                    <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
                                        {notifications.length}
                                    </span>
                                )}
                            </button>
                            {notifOpen && (
                                <div className="absolute -right-24 md:right-0 mt-2 w-64 bg-[#1a1a1d] border border-[#2a2a2e] rounded-xl shadow-lg py-2 z-50">
                                    {notifications.map((notif, index) => (
                                        <div key={index} className="px-4 py-2 hover:bg-[#2a2a2e] text-sm">
                                            {notif}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Avatar y menú de usuario */}
                    <div className="flex items-center gap-4">
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => {
                                    setDropdownOpen(!dropdownOpen);
                                    setNotifOpen(false);
                                    setMsgOpen(false);
                                }}
                                className="w-12 h-12 rounded-full bg-cyan-600 flex items-center justify-center hover:bg-cyan-500 focus:outline-none"
                            >
                                <img
                                    src={user.avatar_url}
                                    alt="Avatar"
                                    className="w-full h-full rounded-full object-cover border-2 border-gray-600"
                                />
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-[#1a1a1d] border border-[#2a2a2e] rounded-xl shadow-lg py-2 z-50">
                                    <Link to={`/${user.username}`} className="flex items-center gap-2 px-4 py-2 hover:bg-[#2a2a2e]">
                                        <User className="w-4 h-4" /> Mi perfil
                                    </Link>
                                    <Link to="/friends" className="flex items-center gap-2 px-4 py-2 hover:bg-[#2a2a2e]">
                                        <Users className="w-4 h-4" /> Buscar amigos
                                    </Link>
                                    <Link to="/settings" className="flex items-center gap-2 px-4 py-2 hover:bg-[#2a2a2e]">
                                        <Settings className="w-4 h-4" /> Configuración
                                    </Link>
                                    <button
                                        onClick={handleLogOut}
                                        className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-[#2a2a2e]"
                                    >
                                        <LogOut className="w-4 h-4" /> Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowLogin(true)}
                            to="/login"
                            className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                        >
                            Iniciar sesión
                        </button>
                        <button
                            onClick={() => setShowRegister(true)}
                            to="/register"
                            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                        >
                            Registrarse
                        </button>
                    </div>

                    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
                    {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
                </>
            )}
        </nav>
    );
}
