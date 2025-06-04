import { Types } from 'mongoose';
import { Request } from 'express';
export interface UserType {
  _id?: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  bio?: string;
  avatar_url?: string;
  created_at?: Date;
}

export interface ProfileRequest extends Request {
  user?: UserType; // El usuario autenticado
}



export interface CreateUserBody {
  username: string;
  full_name: string;
  email: string;
  password: string;
  bio?: string;
  birthdate?: Date;
}

export interface LoginBody{
  user: string;
  password: string;
}


export interface PublicUserType {
  _id: Types.ObjectId;
  username: string;
  full_name: string;
  bio?: string;
  avatar_url?: string;
}