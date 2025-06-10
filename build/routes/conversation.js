"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conversation_1 = require("../controllers/conversation");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/create', authMiddleware_1.authMiddleware, conversation_1.createConversation);
router.get('/getConversations', authMiddleware_1.authMiddleware, conversation_1.getConversations);
exports.default = router;
