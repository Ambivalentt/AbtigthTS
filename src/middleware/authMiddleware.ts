import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Response, NextFunction } from 'express';
import { ProfileRequest } from '../types/user';
import { UserType } from '../types';
import { AuthenticatedSocket, SocketIOAuthMiddleware } from '../types/socketio';
import { Server, Socket } from 'socket.io';

const authMiddleware = (req: ProfileRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    if (!token) {
        res.status(401).json({ error: 'No token provided' })
        return
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET as string)
        req.user = data as UserType; // Cast to UserType
        next();
    } catch (err) {
        res.status(401).json({ error: 'token expired or invalid' + err });
    }
}

const onlineUsers = new Map<string, string>(); // userId -> socketId

const socketAuthMiddleware: SocketIOAuthMiddleware = (io) => {
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error("No token IO provided"));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { _id: string };
            (socket as AuthenticatedSocket).userId = decoded._id;
            next();
        } catch (err) {
            next(new Error("Invalid token"));
        }
    });
}

const setupSocket = (io: Server) => {
    io.on("connection", (socket: Socket & { userId?: string }) => {
        const userId = socket.userId;
        if (!userId) {
            console.log("Conexión sin userId, desconectando socket:", socket.id);
            socket.disconnect();
            return;
        }

        onlineUsers.set(userId, socket.id);
        console.log("Usuario conectado:", userId, socket.id);

        // Notificar a otros usuarios que este usuario está online
        socket.broadcast.emit("user_online", userId);

        socket.on("send_message", async (data) => {
            const receiverSocketId = onlineUsers.get(data.receiverId);
              console.log("Mensaje para enviar a socket id:", receiverSocketId, "datos:", data);
  
            const senderSocketId = socket.id;

            if (receiverSocketId) {
                io.to(receiverSocketId).emit("receive_message", data);
            }
            // También emitir al emisor para que reciba el mensaje via socket
            io.to(senderSocketId).emit("receive_message", data);
        });


        socket.on("disconnect", () => {
            console.log("Usuario desconectado:", userId, socket.id);
            onlineUsers.delete(userId);

            // Notificar a otros usuarios que este usuario está offline
            socket.broadcast.emit("user_offline", userId);
        });
    });
};
export { authMiddleware, socketAuthMiddleware, setupSocket };