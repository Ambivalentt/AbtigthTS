import Message from '../models/Message';
import { Types } from 'mongoose';
import { MessageType } from '../types/index.js';

class MessageRepo {
    static async createMessage(conversation_id: Types.ObjectId, sender_id: Types.ObjectId, text: string): Promise<MessageType> {
        const message = new Message({ conversation_id, sender_id, text });
        await message.save();
        return message;
    }

    static async getMessagesByConversation(conversation_id: Types.ObjectId): Promise<MessageType[] | null> {
        if (!Types.ObjectId.isValid(conversation_id)) {
            throw new Error('Invalid ObjectId format');
        }
        const messageFind = await Message.find({ conversation_id }).populate('sender_id', 'username full_name avatar_url');
        if (!messageFind || messageFind.length === 0) {
            return null
        }
        return messageFind;
    }
}
export default MessageRepo;
