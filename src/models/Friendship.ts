import mongoose from "mongoose";

const Schema = mongoose.Schema;
const friendshipSchema = new Schema({
  requester_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('Friendship', friendshipSchema);
