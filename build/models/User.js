"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    full_name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    bio: { type: String, default: '' },
    avatar_url: { type: String, default: 'https://res.cloudinary.com/stackover/image/upload/v1748493790/defaultUser_a0mokq.jpg' },
    created_at: { type: Date, default: Date.now },
    birthdate: { type: Date, required: false, default: null },
    is_active: { type: Boolean, default: true },
});
exports.default = mongoose_1.default.model('User', userSchema);
