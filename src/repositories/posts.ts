import posts from "../models/posts";
import Types from "mongoose";
import { PostType, GetAllPost, User } from "../types/posts";
import handleError from "../utils/errorHandler";

class PostRepo {
    static async createPost({ userId, content, imageUrl }: Omit<PostType, 'createdAt'>): Promise<PostType> {
        try {
            const post = new posts({ userId, content, imageUrl });
            await post.save();
            return post;
        } catch (error) {
            throw handleError(error);
        }
    }

    static async getAllPosts(): Promise<GetAllPost[]> {
        try {
            const getAllPosts = await posts.find().populate<{userId:User}>('userId', 'username full_name avatar_url').sort({ createdAt: -1 });
            const newResults = getAllPosts.map(value => ({
                idPost: value._id,
                userInfo:{
                    _id: value.userId._id,
                    username: value.userId.username,
                    full_name: value.userId.full_name,
                    avatar_url: value.userId.avatar_url,
                },
                content: value.content,
                imageUrl: value.imageUrl,
                createdAt: value.createdAt
            }))
            return newResults
        } catch (error) {
            throw handleError(error);
        }
    }
}

export default PostRepo;