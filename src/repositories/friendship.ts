import friendshipRequest from '../models/Friendship'
import User from '../models/User'
import Validate from './validate'
import errorHandler from '../utils/errorHandler'
import { FriendshipType, UserType } from '../types/index'
import { Types } from 'mongoose'
import { FriendShipWithUser } from '../types/friendRequest'

class FriendshipRepo {
    static async create(requester_id: Types.ObjectId, receiver_id: Types.ObjectId): Promise<FriendshipType> {
        try {
            if (!Types.ObjectId.isValid(requester_id) || !Types.ObjectId.isValid(receiver_id)) {
                throw new Error('Invalid ObjectId format');
            }

            const newFriendshipRequest = new friendshipRequest({
                requester_id: requester_id,
                receiver_id: receiver_id,
            })

            await newFriendshipRequest.save()
            return newFriendshipRequest;
        } catch (error) {
            throw errorHandler(error);
        }
    }

    //muestra solicitudes de amistad pendientes o aceptadas para componentes
    static async relationShipById(user_id: Types.ObjectId): Promise<FriendshipType[] | null> {
        try {
            if (!Types.ObjectId.isValid(user_id)) {
                throw new Error('Invalid ObjectId format');
            }

            const friendships = await friendshipRequest.find({
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
        } catch (error) {
            throw errorHandler(error);
        }
    }

    //muestra solicitudes de amistad pendientes para el usuario //componente notificaciones
    static async friendShipRequest(receiver_id: Types.ObjectId): Promise<FriendShipWithUser[] | null> {
        try {
            if (!Types.ObjectId.isValid(receiver_id)) {
                throw new Error('Invalid ObjectId format');
            }

            const friendship = await friendshipRequest.find({
                receiver_id: receiver_id,
                status: 'pending'
            });
            if (!friendship) {
                return null; // No friendship found
            }

            const results: FriendShipWithUser[] = []

            for (const f of friendship) {
                const data = await User.findOne({ _id: f.requester_id }, ('-password -__v -created_at'))
                results.push({
                    _id: f._id,
                    requester_id: f.requester_id,
                    receiver_id: f.receiver_id,
                    status: f.status,
                    created_at: f.created_at,
                    user: data as UserType
                })
            }
            return results;
        } catch (error) {
            throw errorHandler(error);
        }
    }

    static async acceptFriendship(receiver_id: Types.ObjectId, request_id: Types.ObjectId): Promise<FriendshipType> {
        try {
            if (!Types.ObjectId.isValid(receiver_id) || !Types.ObjectId.isValid(request_id)) {
                throw new Error('Invalid ObjectId format');
            }

            const friendship = await friendshipRequest.findOneAndUpdate(
                {
                    _id: request_id,
                    $or: [
                        { requester_id: receiver_id, },
                        { receiver_id: receiver_id }
                    ],
                    status: 'pending'
                }, { status: 'accepted' },
                {
                    new: true, // Return the updated document
                    runValidators: true // Ensure validation is applied
                }

            )

            if (!friendship) {
                throw new Error('Friendship request not found or already accepted/declined');
            }
            return friendship;
        } catch (error) {
            throw errorHandler(error);
        }
    }

    static async getFriendshipById(user_id: Types.ObjectId): Promise<UserType[] | null> {
        try {
            if (!Types.ObjectId.isValid(user_id)) {
                throw new Error('Invalid ObjectId format');
            }

            const friendship = await friendshipRequest.find({
                status: 'accepted',
                $or: [
                    { requester_id: user_id },
                    { receiver_id: user_id }
                ]
            });
            if (!friendship || friendship.length === 0) {
                return null; // No friendship found
            }

            const userIds = friendship.map(f => f.requester_id.equals(user_id) ? f.receiver_id : f.requester_id);
            const users = await User.find({ _id: userIds  }, ('-password -__v -created_at'));
            if (!users || users.length === 0) {
                return null; // No users found
            }
            return users
        } catch (error) {
            throw errorHandler(error);
        }
    }

}

export default FriendshipRepo;