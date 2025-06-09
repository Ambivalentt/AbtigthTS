import MessageRepo from "../repositories/message";
import errorHandler from "../utils/errorHandler";
import { Request, Response } from "express";
import { MessageRequest } from "../types/chat";

const createMessage = async (req: MessageRequest, res: Response): Promise<void> => {
    try {
        const { conversation_id, text } = req.body;
        const sender_id = req.user?._id;
        if (!sender_id) {
            res.status(400).json({ message: 'Unauthorized' });
            return;
        }
        const message = await MessageRepo.createMessage(conversation_id, sender_id, text);
        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ message: errorHandler(error).message });
    }
}

const getMessages = async (req:MessageRequest, res:Response):Promise<void> => {
    try {
        const { conversation_id } = req.body;
        const messages = await MessageRepo.getMessagesByConversation(conversation_id);
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ message: errorHandler(err).message });
    }
};

export {createMessage, getMessages};