"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const posts_1 = __importDefault(require("../models/posts"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
class PostRepo {
    static async createPost({ userId, content, imageUrl }) {
        try {
            const post = new posts_1.default({ userId, content, imageUrl });
            await post.save();
            return post;
        }
        catch (error) {
            throw (0, errorHandler_1.default)(error);
        }
    }
    static async getAllPosts() {
        try {
            const getAllPosts = await posts_1.default.find().populate('userId', 'username full_name avatar_url').sort({ createdAt: -1 });
            const newResults = getAllPosts.map(value => ({
                idPost: value._id,
                userInfo: {
                    _id: value.userId._id,
                    username: value.userId.username,
                    full_name: value.userId.full_name,
                    avatar_url: value.userId.avatar_url,
                },
                content: value.content,
                imageUrl: value.imageUrl,
                createdAt: value.createdAt
            }));
            return newResults;
        }
        catch (error) {
            throw (0, errorHandler_1.default)(error);
        }
    }
}
exports.default = PostRepo;
