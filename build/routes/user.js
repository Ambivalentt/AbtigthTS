"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../controllers/user");
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const upload = (0, multer_1.default)();
const router = express_1.default.Router();
router.post('/register', upload.single('avatar_url'), user_1.createUser);
router.post('/login', user_1.loginUser);
router.get('/profile', authMiddleware_1.default, user_1.userDetails);
router.get('/logout', user_1.logOut);
router.get('/:username', user_1.getUserByUsername);
exports.default = router;
