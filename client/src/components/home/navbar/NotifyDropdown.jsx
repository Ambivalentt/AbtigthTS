import { Check, X } from "lucide-react";
import { friendShipRequest, acceptFriendshipRequest } from "../../../api/friendship.jsx";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export default function NotifyDropDown({ setNotifyLength }) {
  const [friendshipRequests, setFriendshipRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const dateNotify = (date) => {
    const formattedBirthdate = format(parseISO(date), "d 'de' MMMM 'del' yyyy", { locale: es })
    return formattedBirthdate;
  }

  const handleAcceptRequest = async (requestId) => {
    try {
      await acceptFriendshipRequest(requestId);
      setFriendshipRequests(prevRequests => prevRequests.filter(req => req._id !== requestId));
      setNotifyLength(friendShipRequest.length)
    } catch (error) {
      console.error("Error accepting friendship request:", error);
    }
  }


  useEffect(() => {
    const getFriendshipRequests = async () => {
      try {
        const response = await friendShipRequest();
        setFriendshipRequests(response)
      } catch (error) {
        console.error("Error fetching friendship requests:", error);
      } finally {
        setLoading(false);
      }
    }
    getFriendshipRequests();
  }, [])


  return (
    <div className="absolute right-0 mt-2 w-96 bg-[#1f1f23] border border-[#2c2c30] rounded-xl shadow-xl z-50 overflow-hidden">
      <div className="px-4 py-3 border-b border-[#2c2c30] text-cyan-400 font-semibold text-lg">
        Notificaciones
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-cyan-500 border-opacity-50"></div>
        </div>
      ) : (
        <ul className="max-h-80 overflow-y-auto">
          {friendshipRequests.map((n) => (
            <li key={n._id}
              className="px-4 py-3 hover:bg-[#2a2a2f] transition cursor-pointer border-b border-[#2c2c30] flex items-start gap-3">
              <Link to={`/${n.user.username}`}>
                <img
                  src={n.user.avatar_url}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full object-cover border border-gray-600"
                />
              </Link>
              <div className="flex-1">
                <p className="text-sm text-gray-300">
                  <span className="font-semibold text-cyan-300">{n.user.username}</span> te añadió como amigo.
                </p>
                <p className="text-xs text-gray-500 mt-1">{dateNotify(n.created_at)}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAcceptRequest(n._id);
                    }}
                    className="flex items-center gap-1 px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white text-sm rounded-md">
                    <Check className="w-4 h-4" /> Aceptar
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-md">
                    <X className="w-4 h-4" /> Declinar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="px-4 py-3 text-center text-sm text-cyan-400 hover:underline cursor-pointer">
        Ver todas
      </div>
    </div>
  );
}
