import { Request } from 'express';
import { UserType } from './user';
import { Types } from 'mongoose';

export interface FriendRequestBody {
    receiver_id: Types.ObjectId; // ID del usuario que recibe la solicitud
}

export interface FriendRequestFn extends Request<{}, {}, FriendRequestBody> {
    user?: UserType;
}

