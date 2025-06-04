import { useState } from "react";

export default function BuscarAmigos({users}) {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) =>
    `${user.full_name} ${user.username}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddFriend = (userId) => {
    console.log(`Solicitud de amistad enviada a ID: ${userId}`);
  };

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
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="flex flex-col items-center p-4 bg-[#1f1f23] rounded-2xl border border-[#2c2c30] hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={user.avatar_url}
                alt={`${user.full_Name} avatar`}
                className="w-20 h-20 rounded-full object-cover border-2 border-cyan-500 shadow-md mb-4"
              />
              <h3 className="text-xl font-bold text-center">{user.full_name}</h3>
              <p className="text-cyan-400">@{user.username}</p>
              <p className="text-gray-400 mt-1 text-sm text-center">{user.bio || 'Sin biogafria'}</p>
              <button
                onClick={() => handleAddFriend(user._id)}
                className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl transition-colors w-full"
              >
                Agregar amigo
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-lg">No se encontraron amigos.</p>
        )}
      </div>
    </div>
  );
}
