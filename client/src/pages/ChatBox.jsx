// pages/ChatBox.jsx
import { useEffect, useState, useRef } from "react";
import {
  getConversations,
  getMessages,
  sendMessage,
  createConversation,
  socketapi
} from "../api/socketio.jsx";
import { io } from "socket.io-client";
import FriendList from "../components/chatbox/FrienList.jsx";
import ChatWindow from "../components/chatbox/ChatWindow.jsx";
import { X } from "lucide-react";
import  useOnlineUsers  from "../components/chatbox/hooks/useOnlineUsers.jsx";
import  useSocketMessages from "../components/chatbox/hooks/useSocketMessages.jsx";


export default function ChatBox({ user, getAllFriendsByUser }) {
  const [open, setOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [openChats, setOpenChats] = useState([]);
  const [messagesByConvId, setMessagesByConvId] = useState({});
  const [friends, setFriends] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [onlineLoaded, setOnlineLoaded] = useState(false);
  const socketRef = useRef(null);

  // Inicializa el socket solo una vez
  useEffect(() => {
    socketRef.current = io('https://abtigthts-production.up.railway.app', {
      withCredentials: true,
      transports: ['websocket']
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Usa los hooks personalizados, pasando el socket local
  useOnlineUsers(socketRef.current, setOnlineUsers, setOnlineLoaded);
  useSocketMessages(socketRef.current, setMessagesByConvId);

  // Cargar amigos y conversaciones al abrir chat
  useEffect(() => {
    if (open) {
      getAllFriendsByUser()
        .then((data) => setFriends(data || []))
        .catch(() => setFriends([]));

      getConversations()
        .then((data) => setConversations(data || []))
        .catch(() => setConversations([]));
    }
  }, [open, getAllFriendsByUser]);

  // Cargar mensajes para un chat específico
  const loadMessages = async (convId) => {
    try {
      const msgs = await getMessages(convId);
      setMessagesByConvId((prev) => ({ ...prev, [convId]: msgs || [] }));
    } catch {
      setMessagesByConvId((prev) => ({ ...prev, [convId]: [] }));
    }
  };

  // Abrir nuevo chat o enfocar uno existente
  const handleFriendClick = async (friendId) => {
    let existing = conversations.find((conv) =>
      conv.members.some((m) => m._id === friendId)
    );

    if (!existing) {
      existing = await createConversation(friendId);
      setConversations((prev) => [...prev, existing]);
    }

    // Si no está abierto, abrirlo
    if (!openChats.find((chat) => chat._id === existing._id)) {
      setOpenChats((prev) => [...prev, existing]);
      await loadMessages(existing._id);
    }
  };

  // Cerrar un chat abierto
  const handleCloseChat = (convId) => {
    setOpenChats((prev) => prev.filter((chat) => chat._id !== convId));
    setMessagesByConvId((prev) => {
      const copy = { ...prev };
      delete copy[convId];
      return copy;
    });
  };

  // Enviar mensaje para un chat específico
  const handleSend = async (convId, text) => {
    if (!text.trim()) return;

    // Busca la conversación y el destinatario
    const conv = conversations.find(c => c._id === convId);
    if (!conv) return;

    // El destinatario es el miembro que NO es el usuario actual
    const receiver = conv.members.find(m => String(m._id) !== String(user._id));
    if (!receiver) return;

    // Envía el mensaje al backend (guarda en BD)
    const newMsg = await sendMessage(convId, text);

    // Emite el mensaje por socket, agregando receiverId
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("send_message", {
        ...newMsg,
        receiverId: receiver._id,
        senderId: user._id,
      });
    } else {
      console.error("Socket no conectado, no se puede enviar el mensaje");
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white text-xl sm:w-[350px] px-5 py-2 rounded-xl shadow-md hover:bg-blue-700 transition z-50"
      >
        Abrir chat
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 flex items-end gap-4 z-50 max-h-[600px]">
      {/* Chats abiertos a la izquierda */}
      <div className="flex flex-row-reverse gap-4 rounded-lg overflow-x-auto max-w-[calc(100vw-360px)] max-h-[600px]">
        {openChats.map((conv) => (
          <div key={conv._id} className="w-[350px] h-[560px] flex flex-col rounded-2xl shadow-lg bg-[#1f1f23]">
            <ChatWindow
              conversation={conv}
              messages={messagesByConvId[conv._id] || []}
              currentUserId={String(user._id)}
              onBack={() => handleCloseChat(conv._id)}
              onSend={(text) => handleSend(conv._id, text)}
            />
          </div>
        ))}
      </div>

      {/* Contenedor fijo para lista de amigos y botón */}
      <div className="flex flex-col items-center">
        {open && (
          <div className="w-[300px] max-h-[600px] bg-[#1f1f23] rounded-2xl border border-[#2c2c30] flex flex-col overflow-hidden mb-2">
            <div className="flex justify-between items-center bg-[#27272a] px-4 py-3 border-b border-[#3a3a3a] text-white font-medium">
              Amigos
              <button
                onClick={() => setOpen(false)}
                className="hover:text-red-500 transition"
                aria-label="Cerrar chat"
              >
                <X size={18} />
              </button>
            </div>
            <FriendList friends={friends} onSelect={handleFriendClick} onlineUsers={onlineUsers} onlineLoaded={onlineLoaded} />
          </div>
        )}

        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 text-white text-xl sm:w-[300px] px-5 py-2 rounded-xl shadow-md hover:bg-blue-700 transition"
          >
            Abrir chat
          </button>
        )}
      </div>
    </div>
  );
}