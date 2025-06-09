import React, { useState, useImperativeHandle, forwardRef, useRef, useEffect } from "react";

const MessageInput = forwardRef(({ onSend }, ref) => {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      inputRef.current?.focus();
    }
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text.trim());
      setText("");
    }
  };


  return (
    <form onSubmit={handleSubmit} className="flex p-3 border-t border-gray-700 bg-[#27272a]">
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe un mensaje..."
        className="flex-grow rounded-md bg-[#1e1e21] text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoComplete="off"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition"
      >
        Enviar
      </button>
    </form>
  );
});

export default MessageInput;
