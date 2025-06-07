import { Request } from 'express';
import { UserType } from './user';
import { Types } from 'mongoose';
import { FriendshipType } from './index';

export interface FriendRequestBody {
    receiver_id: Types.ObjectId; // ID del usuario que recibe la solicitud
    request_id?: Types.ObjectId; // ID de la solicitud de amistad (opcional, para aceptar/rechazar)
}
                   
//Request<Params, ResponseBody, RequestBody, Query>
export interface FriendRequestFn extends Request<{}, {}, FriendRequestBody> {
    user?: UserType,
    
}

export type FriendShipWithUser = FriendshipType & {
    user: UserType; // Información del usuario asociado a la solicitud
}