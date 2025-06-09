import { Server, Socket } from "socket.io";

// Extiende el tipo Socket para agregar la propiedad userId
export interface AuthenticatedSocket extends Socket {
  userId?: string; // o el tipo que uses para el id (string, ObjectId, etc)
}

// El middleware para Socket.IO recibe un Server
export type SocketIOAuthMiddleware = (io: Server) => void;
