"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const authMiddleware = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        res.status(401).json({ error: 'No token provided' });
        return;
    }
    try {
        const data = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = data; // Cast to UserType
        next();
    }
    catch (err) {
        res.status(401).json({ error: 'token expired or invalid' + err });
    }
};
exports.default = authMiddleware;
