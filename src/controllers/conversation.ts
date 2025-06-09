import Conversation from '../repositories/conversation';
import {  Response } from 'express';
import errorHandler from '../utils/errorHandler';
import { RequestConversationBody } from '../types/chat';

const createConversation = async (req: RequestConversationBody, res: Response): Promise<void> => {
    try {
        const my_user = req.user?._id
        if (!my_user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const { other_user_id } = req.body 
        if (!other_user_id) {
            res.status(400).json({ message: 'User IDs are required' });
            return;
        }
        const conversation = await Conversation.findOrCreateConversation(my_user, other_user_id);
        res.status(201).json(conversation);
    } catch (error) {
        res.status(400).json({ message: errorHandler(error).message });
    }
};

const getConversations = async (req: RequestConversationBody, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const conversations = await Conversation.getConversations(userId);
        if (!conversations) {
            res.status(404).json({ message: 'No conversations found' });
            return;
        }
        res.status(200).json(conversations);
    } catch (error) {
        res.status(400).json({ message: errorHandler(error).message });
    }
};

export { createConversation, getConversations };