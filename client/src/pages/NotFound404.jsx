import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0e0e10] text-white px-6">
            <div className="text-center">
                <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h1 className="text-5xl font-bold text-cyan-400 mb-2">404</h1>
                <p className="text-xl font-semibold mb-4">Página no encontrada</p>
                <p className="text-gray-400 mb-8">
                    Lo sentimos, la página que estás buscando no existe o fue movida.
                </p>
                <Link
                    to="/"
                    className="inline-block bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2 px-6 rounded-lg transition">
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}
