import { Types } from 'mongoose';
import { Request } from 'express';
import { UserType } from './user';
import { Interface } from 'readline';
import { MessageType } from './index';
import {ConversationType} from './index';
               

//Request<Params, ResponseBody, RequestBody, Query>
export interface RequestConversationBody extends Request<{}, {}, ConversationType , {}> {
  user?: UserType; // El usuario autenticado
}


export interface MessageRequest extends Request<{}, {}, MessageType, {}> {
  user?: UserType; // El usuario autenticado
}