"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByUsername = exports.logOut = exports.userDetails = exports.loginUser = exports.createUser = void 0;
require("dotenv/config");
const user_1 = __importDefault(require("../repositories/user"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = async (req, res) => {
    try {
        const { username, full_name, email, password, birthdate, bio } = req.body;
        let avatar_url = "";
        if (req.file && req.file?.buffer) {
            avatar_url = await (0, cloudinary_1.default)(req.file.buffer);
        }
        const user = await user_1.default.create({ username, full_name, email, password, birthdate, bio, avatar_url });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ message: (0, errorHandler_1.default)(error).message });
    }
};
exports.createUser = createUser;
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await user_1.default.login({ username, password });
        const token = jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true, //cambiar true en producction
            sameSite: "none", //si el front y el back son de diferentes dominios
            path: '/'
        });
        res.status(201).json({ user, token: token });
    }
    catch (error) {
        res.status(400).json({ message: (0, errorHandler_1.default)(error).message });
    }
};
exports.loginUser = loginUser;
const userDetails = async (req, res) => {
    try {
        const user = req.user; // Assuming user is set by auth middleware
        if (!user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ message: (0, errorHandler_1.default)(error).message });
    }
};
exports.userDetails = userDetails;
const logOut = async (_req, res) => {
    try {
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: true, //cambiar true en producction
            sameSite: "none", //si el front y el back son de diferentes dominios
            path: '/'
        });
        res.status(200).json({ message: 'Logged out successfully' });
    }
    catch (error) {
        res.status(400).json({ message: (0, errorHandler_1.default)(error).message });
    }
};
exports.logOut = logOut;
const getUserByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        const results = await user_1.default.findByUsername(username);
        res.status(200).json(results);
    }
    catch (error) {
        res.status(400).json({ message: (0, errorHandler_1.default)(error).message });
    }
};
exports.getUserByUsername = getUserByUsername;
