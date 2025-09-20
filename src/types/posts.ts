import {Types} from 'mongoose';
import { Request } from 'express';
import { UserType } from './user';

export interface PostType {
    userId: Types.ObjectId;
    content: string;
    imageUrl?: string;
    createdAt?: Date;
}

//Request<Params, ResponseBody, RequestBody, Query>
export interface RequestPostBody extends Request<{}, {}, PostType, {}> {
    user?: UserType; // El usuario autenticado
} 


export interface User {
  _id: Types.ObjectId;
  username: string;
  full_name: string;
  avatar_url: string;
}

export interface GetAllPost{
    idPost: Types.ObjectId;
    userInfo: User;
    content: string;
    imageUrl?: string;
    createdAt?: Date;
}