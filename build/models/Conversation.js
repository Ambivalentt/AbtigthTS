"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const conversationSchema = new mongoose_1.default.Schema({
    members: [
        { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }
    ],
    created_at: { type: Date, default: Date.now }
});
exports.default = mongoose_1.default.model('Conversation', conversationSchema);
