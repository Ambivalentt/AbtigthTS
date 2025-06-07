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
    static async relationShipById(user_id) {
        try {
            if (!mongoose_1.Types.ObjectId.isValid(user_id)) {
                throw new Error('Invalid ObjectId format');
            }
            const friendships = await Friendship_1.default.find({ requester_id: user_id, status: 'pending' });
            if (!friendships || friendships.length === 0) {
                throw new Error('No friendships found for this user');
            }
            return friendships;
        }
        catch (error) {
            throw (0, errorHandler_1.default)(error);
        }
    }
    static async friendShipRequest(requester_id) {
        try {
            if (!mongoose_1.Types.ObjectId.isValid(requester_id)) {
                throw new Error('Invalid ObjectId format');
            }
            const friendship = await Friendship_1.default.find({
                requester_id: requester_id,
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
}
exports.default = FriendshipRepo;
