import mongoose from "mongoose";

const profileCommentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },      // Dueño del perfil
  commenter_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Quién comenta
  text: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('ProfileComment', profileCommentSchema);
