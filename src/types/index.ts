import { Types } from 'mongoose';

export interface UserType {
  _id?: Types.ObjectId;        // ID generado por MongoDB
  username: string;
  full_name: string; // nombre completo del usuario
  email: string;
  password: string;            // contraseña hasheada
  bio?: string;
  avatar_url?: string;
  created_at?: Date;
  birthdate?:Date | null;
}

export interface ProfileCommentType {
  _id?: Types.ObjectId;
  user_id: Types.ObjectId;       // dueño del perfil
  commenter_id: Types.ObjectId;  // quien comenta
  text: string;
  created_at?: Date;
}

export interface FriendshipType {
  _id?: Types.ObjectId;
  requester_id: Types.ObjectId;
  receiver_id: Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected'; // estado de la solicitud
  created_at?: Date;
}

export interface ConversationType {
  _id?: Types.ObjectId;
  members: Types.ObjectId[];     // IDs de los usuarios
  created_at?: Date;
}

export interface MessageType {
  _id?: Types.ObjectId;
  conversation_id: Types.ObjectId;
  sender_id: Types.ObjectId;
  text: string;
  timestamp?: Date;
}

