"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Conversation_1 = __importDefault(require("../models/Conversation"));
class ConversationRepo {
    static async findOrCreateConversation(my_user, other_user) {
        const existing = await Conversation_1.default.findOne({ members: { $all: [my_user, other_user] } });
        if (existing)
            return existing;
        const conversation = new Conversation_1.default({ members: [my_user, other_user] });
        await conversation.save();
        return conversation;
    }
    static async getConversations(userId) {
        const conversation = await Conversation_1.default.find({ members: userId }).populate('members', 'username full_name avatar_url');
        if (!conversation || conversation.length === 0) {
            return null;
        }
        return conversation;
    }
}
exports.default = ConversationRepo;
