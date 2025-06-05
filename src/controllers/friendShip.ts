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

const friendShipRelation = async (req: FriendRequestFn, res: Response): Promise<void> => {
    try{
        const id = req.user?._id;
        if (!id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const results = await FriendRequestRepo.findByRelationId(id)
        res.status(200).json(results);
    }catch(error) {
        res.status(400).json({ message: errorHandler(error).message });
    }
}
export  {createFriendShip, friendShipRelation}