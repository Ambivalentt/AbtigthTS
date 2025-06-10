import 'dotenv/config';
import { Request, Response } from 'express';
import User from '../repositories/user';
import errorHandler from '../utils/errorHandler';
import uploadToCloudinary from '../utils/cloudinary';
import { MulterRequest } from '../types/multer';
import { CreateUserBody, LoginBody, ProfileRequest } from '../types/user';
import jwt from 'jsonwebtoken';
import { UserType } from '../types';

const createUser = async (req: MulterRequest<CreateUserBody>, res: Response): Promise<void> => {
    try {
        const { username, full_name, email, password, birthdate, bio } = req.body;
        let avatar_url = "";
        if (req.file && req.file?.buffer) {
            avatar_url = await uploadToCloudinary(req.file.buffer);
        }
        const user = await User.create({ username, full_name, email, password, birthdate, bio, avatar_url });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: errorHandler(error).message });
    }
}

const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const user = await User.login({ username, password });

        const token = jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: '1h' })
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true, //cambiar true en producction
            sameSite: "none", //si el front y el back son de diferentes dominios
            path: '/'
        })
        res.status(201).json({ user, token: token });
    } catch (error) {
        res.status(400).json({ message: errorHandler(error).message });
    }
}

const userDetails = async (req: ProfileRequest, res: Response): Promise<void> => {
    try {
        const user = req.user as UserType // Assuming user is set by auth middleware
        if (!user) {
            res.status(401).json({ message: 'Unauthorized' });
            return
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: errorHandler(error).message });
    }
}

const logOut = async (_req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: true, //cambiar true en producction
            sameSite: "none", //si el front y el back son de diferentes dominios
            path: '/'
       
        });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(400).json({ message: errorHandler(error).message });
    }
}

const getUserByUsername = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        const results = await User.findByUsername(username);
        res.status(200).json(results);
    } catch (error) {
        res.status(400).json({ message: errorHandler(error).message });
    }

}

const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: errorHandler(error).message });
    }
}
export { createUser, loginUser, userDetails, logOut, getUserByUsername, getAllUsers };
