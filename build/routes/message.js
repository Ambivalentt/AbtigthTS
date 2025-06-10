"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messages_1 = require("../controllers/messages");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/send', authMiddleware_1.authMiddleware, messages_1.createMessage);
router.post('/getMessages', authMiddleware_1.authMiddleware, messages_1.getMessages);
exports.default = router;
