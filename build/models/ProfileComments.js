"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const profileCommentSchema = new mongoose_1.default.Schema({
    user_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true }, // Dueño del perfil
    commenter_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true }, // Quién comenta
    text: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});
exports.default = mongoose_1.default.model('ProfileComment', profileCommentSchema);
