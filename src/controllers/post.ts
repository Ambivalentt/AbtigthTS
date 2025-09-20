import PostRepo from "../repositories/posts";
import errorHandler from "../utils/errorHandler";
import { Request, Response } from "express";
import { RequestPostBody } from '../types/posts';
import Validate from "../repositories/validate";


const createPost = async (req: RequestPostBody, res: Response): Promise<void> => {
    try {

        const { content, imageUrl } = req.body;
        Validate.string(content, 'Content');

        if (imageUrl) {
            Validate.string(imageUrl, 'Image URL');
        }
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const newPost = await PostRepo.createPost({ userId, content, imageUrl })
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: errorHandler(error).message });
    }
}

const getAllPosts = async (req: RequestPostBody, res: Response): Promise<void> => {

    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const data = await PostRepo.getAllPosts();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: errorHandler(error).message });
    }
}

export { createPost, getAllPosts };