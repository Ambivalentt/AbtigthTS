const friends = [
  { id: 1, name: "Pedro González", avatar: "https://i.pravatar.cc/40?img=4" },
  { id: 2, name: "Lucía Ramírez", avatar: "https://i.pravatar.cc/40?img=5" },
  { id: 3, name: "Santiago Ruiz", avatar: "https://i.pravatar.cc/40?img=6" },
];

const FriendsSection = () => (
  <div className="mt-10">
    <h3 className="text-xl font-bold mb-4 text-cyan-400">Amigos</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {friends.map((friend) => (
        <div key={friend.id} className="flex items-center gap-3 bg-[#1f1f23] p-3 rounded-xl border border-[#2c2c30]">
          <img
            src={friend.avatar}
            alt={friend.name}
            className="w-10 h-10 rounded-full object-cover border border-gray-600"
          />
          <span className="text-white">{friend.name}</span>
        </div>
      ))}
    </div>
  </div>
);

export default FriendsSection;
