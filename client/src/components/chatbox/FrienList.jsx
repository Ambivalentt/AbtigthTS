import { memo } from "react";

function FriendList({ friends = [], onSelect, isConnected }) {
  if (!Array.isArray(friends)) return null;

  return (
    <div className="overflow-y-auto">
      {friends.map((friend) => (
        <button
          key={friend._id}
          onClick={() => onSelect(friend._id)}
          className="flex items-center gap-2 w-full px-4 py-2 hover:bg-[#2e2e33] text-left text-white transition"
        >
          <img src={friend.avatar_url} alt={friend.username} className="w-8 h-8 rounded-full" />
          <div>
            <div className="font-medium text-sm">
              {friend.full_name || friend.username}
            </div>
            <div className={`text-xs ${isConnected ? "text-green-400" : "text-gray-400"}`}>
              {isConnected ? "En línea" : "Desconectado"}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default memo(FriendList);
