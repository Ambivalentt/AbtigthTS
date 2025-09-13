import { useState } from "react";
import { Image, Send } from "lucide-react";
import { nanoid } from "nanoid";

export default function PostCreator({ user, posts, content }) {
    const { avatar_url, full_name } = user;
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const [postForm, setPostForm] = useState({
        idPost: nanoid(),
        content: "",
        createdAt: null,
        userInfo: {
            full_name: full_name,
            avatar_url: avatar_url
        }
    });

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


    const handlePost = async () => {
        const updatedPost = {
            ...postForm,
            content: text,
        };
        setPostForm(updatedPost);
        await content(updatedPost);
        setText("");
        setImage(null);
        setPreview(null);
    };

    return (
        <section className="w-full max-w-2xl mx-auto px-4">
            <div className="w-full max-w-2xl mx-auto bg-[#1a1a1d] border border-[#2a2a2e] rounded-xl p-4 shadow-md text-white">
                {/* Área de creación de post */}
                <div className="flex items-start gap-3">
                    <div className="flex-1">
                        <section className="flex-1 flex gap-3">
                            <img
                                src={avatar_url}
                                alt="Avatar"
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-600"
                            />
                            <textarea
                                className="w-full pt-3 bg-transparent border-none resize-none outline-none text-white placeholder-gray-400 text-sm sm:text-base"
                                rows={3}
                                placeholder="¿Qué estás pensando?"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />

                        </section>
                        <section className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mt-3 gap-2">
                            <label className="flex items-center gap-2 text-cyan-400 cursor-pointer text-sm">
                                <Image className="w-5 h-5" />
                                <span>Foto</span>
                                <input
                                    // type="file"
                                    // accept="image/*"
                                    // onChange={handleImageChange}
                                    className="hidden"
                                    onClick={(e) => { alert("Funcionalidad en desarrollo") }}
                                />
                            </label>
                            <button
                                onClick={handlePost}
                                className="bg-cyan-600 cursor-pointer hover:bg-cyan-500 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 w-full sm:w-auto justify-center"
                            >
                                <Send className="w-4 h-4" />
                                Publicar
                            </button>
                        </section>
                    </div>
                </div>
            </div>
            {posts.map(post => (
                <section key={post.idPost} className="mt-6 w-full bg-[#1a1a1d] border border-[#2a2a2e] rounded-xl p-4 shadow-md text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <img
                            src={post.userInfo.avatar_url || avatar_url}
                            alt="Avatar"
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-gray-600"
                        />
                        <div className="flex flex-col">
                            <p className="font-semibold text-sm sm:text-base">
                                {post.userInfo.full_name}
                            </p>
                            <p className="text-gray-400 text-xs">
                                {post.createdAt
                                    ? `${new Date(post.createdAt).toLocaleDateString(undefined, {
                                        day: "2-digit",
                                        month: "short"
                                    })} ${new Date(post.createdAt).toLocaleTimeString(undefined, {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}`
                                    : "Justo ahora"}
                            </p>
                        </div>
                    </div>
                    <p className="text-sm sm:text-base">{post.content}</p>
                    {post.imageUrl && <img
                        src={post.imageUrl}
                        alt="Post"
                        className="mt-2 w-full max-h-[400px] object-cover rounded-lg border border-gray-600"
                    />}
                </section>
            ))}
        </section>
    );
}
