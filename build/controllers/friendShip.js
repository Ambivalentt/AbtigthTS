"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFriendByUserId = exports.acceptFriendRequest = exports.friendShipRelation = exports.getRelationShipById = exports.createFriendShip = void 0;
const friendship_1 = __importDefault(require("../repositories/friendship"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const createFriendShip = async (req, res) => {
    try {
        const id = req.user?._id;
        if (!id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const { receiver_id } = req.body;
        const FriendRequest = await friendship_1.default.create(id, receiver_id);
        res.status(201).json(FriendRequest);
    }
    catch (error) {
        res.status(400).json({ message: (0, errorHandler_1.default)(error).message });
    }
};
exports.createFriendShip = createFriendShip;
const getRelationShipById = async (req, res) => {
    try {
        const id = req.user?._id;
        if (!id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const results = await friendship_1.default.relationShipById(id);
        res.status(200).json(results);
    }
    catch (error) {
        res.status(400).json({ message: (0, errorHandler_1.default)(error).message });
    }
};
exports.getRelationShipById = getRelationShipById;
const friendShipRelation = async (req, res) => {
    try {
        const id = req.user?._id;
        if (!id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const results = await friendship_1.default.friendShipRequest(id);
        res.status(200).json(results);
    }
    catch (error) {
        res.status(400).json({ message: (0, errorHandler_1.default)(error).message });
    }
};
exports.friendShipRelation = friendShipRelation;
const acceptFriendRequest = async (req, res) => {
    try {
        const request_id = req.body.request_id;
        if (!request_id) {
            res.status(400).json({ message: 'Request ID is required' });
            return;
        }
        const id = req.user?._id;
        if (!id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const friendship = await friendship_1.default.acceptFriendship(id, request_id);
        res.status(200).json(friendship);
    }
    catch (error) {
        res.status(400).json({ message: (0, errorHandler_1.default)(error).message });
    }
};
exports.acceptFriendRequest = acceptFriendRequest;
const getAllFriendByUserId = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const friendships = await friendship_1.default.getFriendshipById(userId);
        res.status(200).json(friendships);
    }
    catch (error) {
        res.status(400).json({ message: (0, errorHandler_1.default)(error).message });
    }
};
exports.getAllFriendByUserId = getAllFriendByUserId;
