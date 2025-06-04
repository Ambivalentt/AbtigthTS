import { useState } from "react";
import { Image, Send } from "lucide-react";

export default function PostCreator() {
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    // 🔹 Post simulado para vista previa
    const mockPost = {
        avatar: "https://i.pravatar.cc/300",
        username: "Juan Pérez",
        text: "¡Hoy fue un gran día para entrenar piernas! 💪🔥",
        image:
            "https://images.unsplash.com/photo-1594737625785-c92a050c2235?auto=format&fit=crop&w=800&q=80",
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePost = () => {
        // Simulación de publicación
        setText("");
        setImage(null);
        setPreview(null);
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-[#1a1a1d] border border-[#2a2a2e] rounded-xl p-4 shadow-md text-white">
            {/* Área de creación de post */}
            <div className="flex items-start gap-3">
                <img
                    src="https://i.pravatar.cc/300"
                    alt="Avatar"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-600"
                />
                <div className="flex-1">
                    <textarea
                        className="w-full bg-transparent border-none resize-none outline-none text-white placeholder-gray-400 text-sm sm:text-base"
                        rows={3}
                        placeholder="¿Qué estás pensando?"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="preview"
                            className="mt-2 w-full max-h-64 object-cover rounded-lg border border-gray-600"
                        />
                    )}
                    <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mt-3 gap-2">
                        <label className="flex items-center gap-2 text-cyan-400 cursor-pointer text-sm">
                            <Image className="w-5 h-5" />
                            <span>Foto</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                        <button
                            onClick={handlePost}
                            className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 w-full sm:w-auto justify-center"
                        >
                            <Send className="w-4 h-4" />
                            Publicar
                        </button>
                    </div>
                </div>
            </div>

            {/* Post de ejemplo */}
            <div className="mt-6 border-t border-[#2a2a2e] pt-4">
                <div className="flex items-center gap-3 mb-2">
                    <img
                        src={mockPost.avatar}
                        alt="Avatar"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-gray-600"
                    />
                    <span className="font-semibold text-sm sm:text-base">
                        {mockPost.username}
                    </span>
                </div>
                <p className="text-sm sm:text-base">{mockPost.text}</p>
                <img
                    src={mockPost.image}
                    alt="Post"
                    className="mt-2 w-full max-h-[400px] object-cover rounded-lg border border-gray-600"
                />
            </div>
        </div>
    );
}
