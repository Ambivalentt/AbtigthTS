"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = exports.createMessage = void 0;
const message_1 = __importDefault(require("../repositories/message"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const createMessage = async (req, res) => {
    try {
        const { conversation_id, text } = req.body;
        const sender_id = req.user?._id;
        if (!sender_id) {
            res.status(400).json({ message: 'Unauthorized' });
            return;
        }
        const message = await message_1.default.createMessage(conversation_id, sender_id, text);
        res.status(201).json(message);
    }
    catch (error) {
        res.status(400).json({ message: (0, errorHandler_1.default)(error).message });
    }
};
exports.createMessage = createMessage;
const getMessages = async (req, res) => {
    try {
        const { conversation_id } = req.body;
        const messages = await message_1.default.getMessagesByConversation(conversation_id);
        res.status(200).json(messages);
    }
    catch (err) {
        res.status(500).json({ message: (0, errorHandler_1.default)(err).message });
    }
};
exports.getMessages = getMessages;
