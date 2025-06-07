import { MessageCircle } from "lucide-react";

const ProfileComments = () => {
  const comments = [
    {
      id: 1,
      author: "María López",
      avatar: "https://i.pravatar.cc/40?img=1",
      text: "¡Feliz cumple, Juan! 🎉🎂",
    },
    {
      id: 2,
      author: "Carlos Rivera",
      avatar: "https://i.pravatar.cc/40?img=2",
      text: "Buena charla ayer, bro 💬",
    },
    {
      id: 3,
      author: "Ana Torres",
      avatar: "https://i.pravatar.cc/40?img=3",
      text: "¡Qué buena foto la de tu viaje! 📸",
    },
  ];

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <MessageCircle className="w-6 h-6 text-cyan-400" />
        Comentarios del perfil
      </h3>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex items-start gap-4 bg-[#1f1f23] p-4 rounded-xl border border-[#2c2c30]"
          >
            <img
              src={comment.avatar}
              alt="Avatar autor"
              className="w-10 h-10 rounded-full object-cover border border-gray-600"
            />
            <div>
              <p className="font-semibold text-cyan-300">{comment.author}</p>
              <p className="text-gray-300">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileComments;
