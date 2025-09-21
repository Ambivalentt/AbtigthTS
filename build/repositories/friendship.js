"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Friendship_1 = __importDefault(require("../models/Friendship"));
const User_1 = __importDefault(require("../models/User"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const mongoose_1 = require("mongoose");
class FriendshipRepo {
    static async create(requester_id, receiver_id) {
        try {
            if (!mongoose_1.Types.ObjectId.isValid(requester_id) || !mongoose_1.Types.ObjectId.isValid(receiver_id)) {
                throw new Error('Invalid ObjectId format');
            }
            const newFriendshipRequest = new Friendship_1.default({
                requester_id: requester_id,
                receiver_id: receiver_id,
            });
            await newFriendshipRequest.save();
            return newFriendshipRequest;
        }
        catch (error) {
            throw (0, errorHandler_1.default)(error);
        }
    }
    //muestra solicitudes de amistad pendientes o aceptadas para componentes
    static async relationShipById(user_id) {
        try {
            if (!mongoose_1.Types.ObjectId.isValid(user_id)) {
                throw new Error('Invalid ObjectId format');
            }
            const friendships = await Friendship_1.default.find({
                $or: [
                    { requester_id: user_id },
                    { receiver_id: user_id }
                ],
                status: { $in: ['pending', 'accepted'] }
            });
            if (!friendships || friendships.length === 0) {
                throw new Error('No friendships found for this user');
            }
            return friendships;
        }
        catch (error) {
            throw (0, errorHandler_1.default)(error);
        }
    }
    //muestra el estado de amistad entre dos usuarios (cookies id y parameters username)
    static async statusFriendshipByParams(requester_id, username_params) {
        try {
            const userIdByParams = await User_1.default.findOne({ username: username_params }, ('_id'));
            if (!userIdByParams) {
                throw new Error('User not found with the provided username');
            }
            const friendShipStatus = await Friendship_1.default.findOne({
                $or: [
                    { requester_id: requester_id, receiver_id: userIdByParams._id },
                    { requester_id: userIdByParams._id, receiver_id: requester_id }
                ]
            });
            if (!friendShipStatus) {
                return null; // No friendship found
            }
            return friendShipStatus;
        }
        catch (error) {
            throw (0, errorHandler_1.default)(error);
        }
    }
    //muestra solicitudes de amistad pendientes para el usuario //componente notificaciones
    static async friendShipRequest(receiver_id) {
        try {
            if (!mongoose_1.Types.ObjectId.isValid(receiver_id)) {
                throw new Error('Invalid ObjectId format');
            }
            const friendship = await Friendship_1.default.find({
                receiver_id: receiver_id,
                status: 'pending'
            });
            if (!friendship) {
                return null; // No friendship found
            }
            const results = [];
            for (const f of friendship) {
                const data = await User_1.default.findOne({ _id: f.requester_id }, ('-password -__v -created_at'));
                results.push({
                    _id: f._id,
                    requester_id: f.requester_id,
                    receiver_id: f.receiver_id,
                    status: f.status,
                    created_at: f.created_at,
                    user: data
                });
            }
            return results;
        }
        catch (error) {
            throw (0, errorHandler_1.default)(error);
        }
    }
    //acepta una solicitud de amistad
    static async acceptFriendship(receiver_id, request_id) {
        try {
            if (!mongoose_1.Types.ObjectId.isValid(receiver_id) || !mongoose_1.Types.ObjectId.isValid(request_id)) {
                throw new Error('Invalid ObjectId format');
            }
            const friendship = await Friendship_1.default.findOneAndUpdate({
                _id: request_id,
                $or: [
                    { requester_id: receiver_id, },
                    { receiver_id: receiver_id }
                ],
                status: 'pending'
            }, { status: 'accepted' }, {
                new: true, // Return the updated document
                runValidators: true // Ensure validation is applied
            });
            if (!friendship) {
                throw new Error('Friendship request not found or already accepted/declined');
            }
            return friendship;
        }
        catch (error) {
            throw (0, errorHandler_1.default)(error);
        }
    }
    static async getFriendshipByParams(username) {
        try {
            if (typeof username !== 'string' || username.trim() === '') {
                throw new Error('Invalid ObjectId format');
            }
            const userId = await User_1.default.findOne({ username: username }, ('_id'));
            if (!userId) {
                throw new Error('User not found');
            }
            const friendship = await Friendship_1.default.find({
                status: 'accepted',
                $or: [
                    { requester_id: userId._id },
                    { receiver_id: userId._id }
                ]
            });
            if (!friendship || friendship.length === 0) {
                return null; // No friendship found
            }
            const userIds = friendship.map(f => f.requester_id.equals(userId._id) ? f.receiver_id : f.requester_id);
            const users = await User_1.default.find({ _id: userIds }, ('-password -__v -created_at'));
            if (!users || users.length === 0) {
                return null; // No users found
            }
            return users;
        }
        catch (error) {
            throw (0, errorHandler_1.default)(error);
        }
    }
    //obtiene amigos dependiendo del username y devuelve informacion de los usuarios, foto, nombre, username, id
    static async getFriendsByIdforChatbox(userId) {
        try {
            if (!userId) {
                throw new Error('User not found');
            }
            const friendship = await Friendship_1.default.find({
                status: 'accepted',
                $or: [
                    { requester_id: userId },
                    { receiver_id: userId }
                ]
            });
            if (!friendship || friendship.length === 0) {
                return null; // No friendship found
            }
            const userIds = friendship.map(f => f.requester_id.equals(userId) ? f.receiver_id : f.requester_id);
            const users = await User_1.default.find({ _id: userIds }, ('-password -__v -created_at'));
            if (!users || users.length === 0) {
                return null; // No users found
            }
            return users;
        }
        catch (error) {
            throw (0, errorHandler_1.default)(error);
        }
    }
}
exports.default = FriendshipRepo;
