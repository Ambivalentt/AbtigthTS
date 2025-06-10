import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createRequest, allRequestsendedByUser } from "../../api/friendship.jsx";
import { useStateContext } from "../../context/user.jsx";


export default function BuscarAmigos({ users }) {
  const [search, setSearch] = useState("");
  const [sentRequests, setSentRequests] = useState([]);
  const { user } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSentRequests = async () => {
      try {
        const response = await allRequestsendedByUser(); // debe devolver [{ receiver_id, status }]
        setSentRequests(response || []); // Filtrar solicitudes enviadas al usuario actual
      } catch (error) {
        console.error("Error fetching sent requests:", error);
      }
    };

    fetchSentRequests();
  }, []);


  const handleAddFriend = async (userId) => {
    try {
      const response = await createRequest(userId);
      if (response.status === 201) {
        setSentRequests((prev) => [...prev, { receiver_id: userId, status: "pending" }]);
      }
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
    }
  };

 const getRequestStatus = (targetUserId) => {
  const request = sentRequests.find(r => r.receiver_id === targetUserId || r.requester_id === targetUserId);
  return request ? request.status : null;
};
  const filteredUsers = users.filter((u) => u._id !== user._id).filter((u) =>
    `${u.full_name} ${u.username}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="w-full max-w-5xl mx-auto text-white p-6 sm:p-8">
      <h2 className="text-3xl font-extrabold mb-6">Buscar amigos</h2>

      <input
        type="text"
        placeholder="Buscar por nombre o usuario"
        className="w-full p-4 rounded-xl border border-[#2c2c30] bg-[#1f1f23] placeholder-gray-500 text-white mb-8 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => {
            const status = getRequestStatus(user._id);

            let buttonText = "Agregar amigo";
            let buttonClasses =
              "bg-cyan-600 hover:bg-cyan-700 cursor-pointer";
            let disabled = false;

            if (status === "pending") {
              buttonText = "Solicitud enviada";
              buttonClasses = "bg-gray-500 pointer-events-none";
              disabled = true;
            } else if (status === "accepted") {
              buttonText = "Es tu amigo";
              buttonClasses = "bg-green-600 pointer-events-none";
              disabled = true;
            }

            return (
              <div
                key={user._id}
                className="flex flex-col items-center p-4 bg-[#1f1f23] rounded-2xl border border-[#2c2c30] hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  onClick={() => navigate(`/${user.username}`)}
                  src={user.avatar_url}
                  alt={`${user.full_name} avatar`}
                  className="w-20 h-20 rounded-full object-cover border-2 border-cyan-500 shadow-md mb-4 cursor-pointer"
                />
                <h3 className="text-xl font-bold text-center">{user.full_name}</h3>
                <p className="text-cyan-400">@{user.username}</p>
                <p className="text-gray-400 mt-1 text-sm text-center">
                  {user.bio || "Sin biografía"}
                </p>
                <button
                  onClick={() => handleAddFriend(user._id)}
                  disabled={disabled}
                  className={`mt-4 px-4 py-2 rounded-xl w-full text-white transition-colors ${buttonClasses}`}
                >
                  {buttonText}
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-gray-400 text-lg">No se encontraron amigos.</p>
        )}
      </div>
    </div>
  );
}
