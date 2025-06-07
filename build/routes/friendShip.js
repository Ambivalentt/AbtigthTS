"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const friendShip_1 = require("../controllers/friendShip");
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.post('/request', authMiddleware_1.default, friendShip_1.createFriendShip);
router.get('/notifyFriendShipReq', authMiddleware_1.default, friendShip_1.friendShipRelation);
router.get('/relationShip', authMiddleware_1.default, friendShip_1.getRelationShipById);
exports.default = router;
