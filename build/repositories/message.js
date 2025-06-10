"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = __importDefault(require("../models/Message"));
const mongoose_1 = require("mongoose");
class MessageRepo {
    static async createMessage(conversation_id, sender_id, text) {
        const message = new Message_1.default({ conversation_id, sender_id, text });
        await message.save();
        return message;
    }
    static async getMessagesByConversation(conversation_id) {
        if (!mongoose_1.Types.ObjectId.isValid(conversation_id)) {
            throw new Error('Invalid ObjectId format');
        }
        const messageFind = await Message_1.default.find({ conversation_id }).populate('sender_id', 'username full_name avatar_url');
        if (!messageFind || messageFind.length === 0) {
            return null;
        }
        return messageFind;
    }
}
exports.default = MessageRepo;
