"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConversations = exports.createConversation = void 0;
const conversation_1 = __importDefault(require("../repositories/conversation"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const createConversation = async (req, res) => {
    try {
        const my_user = req.user?._id;
        if (!my_user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const { other_user_id } = req.body;
        if (!other_user_id) {
            res.status(400).json({ message: 'User IDs are required' });
            return;
        }
        const conversation = await conversation_1.default.findOrCreateConversation(my_user, other_user_id);
        res.status(201).json(conversation);
    }
    catch (error) {
        res.status(400).json({ message: (0, errorHandler_1.default)(error).message });
    }
};
exports.createConversation = createConversation;
const getConversations = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const conversations = await conversation_1.default.getConversations(userId);
        if (!conversations) {
            res.status(404).json({ message: 'No conversations found' });
            return;
        }
        res.status(200).json(conversations);
    }
    catch (error) {
        res.status(400).json({ message: (0, errorHandler_1.default)(error).message });
    }
};
exports.getConversations = getConversations;
