import { Response } from 'express';
import { FriendRequestFn } from '../types/friendRequest';
import FriendRequestRepo from '../repositories/friendship';
import errorHandler from '../utils/errorHandler';

const createFriendShip = async (req: FriendRequestFn, res: Response): Promise<void> => {
    try {
        const id = req.user?._id
        if (!id) {
            res.status(401).json({ message: 'Unauthorized' })
            return;
        }

        const { receiver_id } = req.body;
        const FriendRequest = await FriendRequestRepo.create(id, receiver_id);
        res.status(201).json(FriendRequest);
    } catch (error) {
        res.status(400).json({ message: errorHandler(error).message });
    }
}

const getRelationShipById = async (req: FriendRequestFn, res: Response): Promise<void> => {
    try {
        const id = req.user?._id;
        if (!id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const results = await FriendRequestRepo.relationShipById(id);
        res.status(200).json(results);
    } catch (error) {
        res.status(400).json({ message: errorHandler(error).message });
    }
}

const friendShipRelation = async (req: FriendRequestFn, res: Response): Promise<void> => {
    try {
        const id = req.user?._id;
        if (!id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const results = await FriendRequestRepo.friendShipRequest(id)
        res.status(200).json(results);
    } catch (error) {
        res.status(400).json({ message: errorHandler(error).message });
    }
}

const acceptFriendRequest = async (req: FriendRequestFn, res: Response): Promise<void> => {
    try {
        const request_id = req.body.request_id
        if (!request_id) {
            res.status(400).json({ message: 'Request ID is required' });
            return;
        }
        const id = req.user?._id;
        if (!id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const friendship = await FriendRequestRepo.acceptFriendship(id, request_id);
        res.status(200).json(friendship);
    } catch (error) {
        res.status(400).json({ message: errorHandler(error).message });
    }
}

const getAllFriendByUserId = async (req :FriendRequestFn, res:Response) :Promise<void> =>{
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const friendships = await FriendRequestRepo.getFriendshipById(userId);
        res.status(200).json(friendships);
    } catch (error) {
        res.status(400).json({ message: errorHandler(error).message });
    }
}
export { createFriendShip, getRelationShipById, friendShipRelation, acceptFriendRequest, getAllFriendByUserId }