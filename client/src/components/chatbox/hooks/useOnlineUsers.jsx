import { useEffect } from "react";

export default function useOnlineUsers(socket, setOnlineUsers, setOnlineLoaded) {
  useEffect(() => {
    if (!socket) return;

    function handleOnlineUsers(userIds) {
      const usersObj = {};
      userIds.forEach(id => { usersObj[String(id)] = true; });
      setOnlineUsers(usersObj);
      setOnlineLoaded(true);
    }
    function handleUserOnline(userId) {
      setOnlineUsers(prev => ({ ...prev, [String(userId)]: true }));
    }
    function handleUserOffline(userId) {
      setOnlineUsers(prev => {
        const copy = { ...prev };
        delete copy[String(userId)];
        return copy;
      });
    }
    function handleConnect() {
      socket.emit("get_online_users");
    }

    socket.on("connect", handleConnect);
    socket.on("online_users", handleOnlineUsers);
    socket.on("user_online", handleUserOnline);
    socket.on("user_offline", handleUserOffline);

    if (socket.connected) handleConnect();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("online_users", handleOnlineUsers);
      socket.off("user_online", handleUserOnline);
      socket.off("user_offline", handleUserOffline);
    };
  }, [socket, setOnlineUsers, setOnlineLoaded]);
}