import { useEffect, useRef, useState, memo } from "react";
import { X } from "lucide-react";
import MessageInput from "./MessageInput.jsx";

function ChatWindow({ conversation, messages, currentUserId, onBack, onSend }) {

  const messagesEndRef = useRef();
  const containerRef = useRef();
  const messageInputRef = useRef();
  const [isActive, setIsActive] = useState(false);

  const friend = conversation?.members?.find((m) => m._id !== currentUserId);
console.log("🔁 ChatWindow render - mensajes:", messages.length);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    function handleFocus() {
      setIsActive(true);
    }
    function handleBlur() {
      setIsActive(false);
    }

    const el = containerRef.current;
    if (el) {
      el.addEventListener("focusin", handleFocus);
      el.addEventListener("focusout", handleBlur);
    }

    return () => {
      if (el) {
        el.removeEventListener("focusin", handleFocus);
        el.removeEventListener("focusout", handleBlur);
      }
    };
  }, []);

  useEffect(() => {
    messageInputRef.current?.focusInput();
  }, [conversation]);

  useEffect(() => {
    if (!isActive) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onBack();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, onBack]);

  if (!friend) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-white bg-[#1e1e21] rounded-xl shadow-lg">
        <p>No se encontró al miembro del chat.</p>
        <button onClick={onBack} className="mt-4 text-blue-400 underline hover:text-blue-600">
          Volver
        </button>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="flex flex-col h-full rounded-xl bg-[#1e1e21] shadow-lg outline-none"
    >
      <div className="flex items-center space-x-2 p-3 border-b bg-[#27272a] text-white">
        <img src={friend.avatar_url} alt="avatar" className="w-8 h-8 rounded-full" />
        <div className="font-medium">{friend.full_name || friend.username}</div>
        <button onClick={onBack} className="ml-auto text-xs cursor-pointer hover:bg-[#141416] rounded-full p-1 transition">
          <X size={25} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 bg-[#131316]">
        {messages.map((msg) => {
          const senderId = typeof msg.sender_id === "object" ? msg.sender_id._id : msg.sender_id;
          const isCurrentUser = String(senderId) === String(currentUserId);

          return (
            <div key={msg._id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl text-base shadow ${
                  isCurrentUser ? "bg-blue-600 text-white" : "bg-[#2a2a2e] text-gray-200"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput ref={messageInputRef} onSend={onSend} />
    </div>
  );
}

export default ChatWindow
