import { useEffect } from "react";

export default function useSocketMessages(socket, setMessagesByConvId) {
  useEffect(() => {
    if (!socket) return;

    function handleReceiveMessage(msg) {
      setMessagesByConvId(prev => {
        const convMsgs = prev[msg.conversation_id] || [];
        return { ...prev, [msg.conversation_id]: [...convMsgs, msg] };
      });
    }
    socket.on("receive_message", handleReceiveMessage);
    return () => socket.off("receive_message", handleReceiveMessage);
  }, [socket, setMessagesByConvId]);
}