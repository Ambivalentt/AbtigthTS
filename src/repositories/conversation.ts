import Conversation from "../models/Conversation";
import { ConversationType } from "../types/index";
import { Types } from "mongoose";


class ConversationRepo {
    static async findOrCreateConversation(my_user: Types.ObjectId, other_user: Types.ObjectId): Promise<ConversationType> {
        const existing = await Conversation.findOne({ members: { $all: [my_user, other_user] } });
        if (existing) return existing;
        const conversation = new Conversation({ members: [my_user, other_user] });
        await conversation.save();
        return conversation
    }

    static async getConversations(userId:Types.ObjectId): Promise<ConversationType[] | null> {
        const conversation = await Conversation.find({ members: userId }).populate('members', 'username full_name avatar_url');
        if (!conversation || conversation.length === 0) {
           return null
        }
        return conversation;
    }
}

export default ConversationRepo;