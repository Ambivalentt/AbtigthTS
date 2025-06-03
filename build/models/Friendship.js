"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const friendshipSchema = new Schema({
    requester_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    created_at: { type: Date, default: Date.now }
});
exports.default = mongoose_1.default.model('Friendship', friendshipSchema);
