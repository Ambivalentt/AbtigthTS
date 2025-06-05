import friendshipRequest from '../models/Friendship'
import Validate from './validate'
import errorHandler from '../utils/errorHandler'
import { FriendshipType } from '../types/index'
import { Types } from 'mongoose'

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
    static async findByRelationId(requester_id: Types.ObjectId): Promise<FriendshipType [] | null>  {
        try {
            if (!Types.ObjectId.isValid(requester_id) ) {
                throw new Error('Invalid ObjectId format');
            }

            const friendship = await friendshipRequest.find({
                requester_id: requester_id,
                status: 'pending'
            });
            if (!friendship) {
                return null; // No friendship found
            }
            return friendship;
        } catch (error) {
            throw errorHandler(error);
        }
    }

}

export default FriendshipRepo;