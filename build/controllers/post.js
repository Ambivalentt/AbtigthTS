"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPosts = exports.createPost = void 0;
const posts_1 = __importDefault(require("../repositories/posts"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const validate_1 = __importDefault(require("../repositories/validate"));
const createPost = async (req, res) => {
    try {
        const { content, imageUrl } = req.body;
        validate_1.default.string(content, 'Content');
        if (imageUrl) {
            validate_1.default.string(imageUrl, 'Image URL');
        }
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const newPost = await posts_1.default.createPost({ userId, content, imageUrl });
        res.status(201).json(newPost);
    }
    catch (error) {
        res.status(400).json({ message: (0, errorHandler_1.default)(error).message });
    }
};
exports.createPost = createPost;
const getAllPosts = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const data = await posts_1.default.getAllPosts();
        res.status(200).json(data);
    }
    catch (error) {
        res.status(400).json({ message: (0, errorHandler_1.default)(error).message });
    }
};
exports.getAllPosts = getAllPosts;
