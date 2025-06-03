import { Types } from 'mongoose';

export interface ConversationType {
  _id?: Types.ObjectId;
  members: Types.ObjectId[];
  created_at?: Date;
}

export interface MessageType {
  _id?: Types.ObjectId;
  conversation_id: Types.ObjectId;
  sender_id: Types.ObjectId;
  text: string;
  timestamp?: Date;
}
