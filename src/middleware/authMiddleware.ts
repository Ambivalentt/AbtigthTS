import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {  Response, NextFunction } from 'express';
import { ProfileRequest } from '../types/user';
import { UserType } from '../types';

const authMiddleware = (req:ProfileRequest, res:Response, next:NextFunction) => {
    const token  = req.cookies.access_token;
    if (!token){
        res.status(401).json({ error: 'No token provided' })
        return
    }
    try{
        const data = jwt.verify(token, process.env.JWT_SECRET as string)
        req.user = data as UserType; // Cast to UserType
        next();
    }catch(err){
        res.status(401).json({error:'token expired or invalid'});
    }
}

export default authMiddleware;