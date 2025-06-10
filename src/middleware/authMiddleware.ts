import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Response, NextFunction } from 'express';
import { ProfileRequest } from '../types/user';
import { UserType } from '../types';
import { AuthenticatedSocket, SocketIOAuthMiddleware } from '../types/socketio';
import { Server, Socket } from 'socket.io';
import * as cookie from 'cookie';
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

const onlineUsers = new Map<string, Set<string>>();
const socketAuthMiddleware: SocketIOAuthMiddleware = (io) => {
    io.use((socket, next) => {
        // 1. Intenta leer el token del handshake.auth (por compatibilidad)
        let token = socket.handshake.auth?.token;
        // 2. Si no viene en auth, intenta leerlo de las cookies
        if (!token && socket.handshake.headers.cookie) {
            const cookies = cookie.parse(socket.handshake.headers.cookie);
            token = cookies.access_token;
        }

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
};
const setupSocket = (io: Server) => {
    io.on("connection", (socket: Socket & { userId?: string }) => {
        const userId = socket.userId;

        if (!userId) {
            console.log("Conexión sin userId, desconectando socket:", socket.id);
            socket.disconnect();
            return;
        }
        // Añadir socketId al set del usuario
        if (!onlineUsers.has(userId)) {
            onlineUsers.set(userId, new Set());
        }
        onlineUsers.get(userId)!.add(socket.id);
        // Envía la lista de usuarios online al usuario que se acaba de conectar

        socket.on("get_online_users", () => {
            socket.emit("online_users", Array.from(onlineUsers.keys()));
        });
        socket.emit("online_users", Array.from(onlineUsers.keys()));
        if (onlineUsers.get(userId)!.size === 1) {
            socket.broadcast.emit("user_online", userId);
        }

        socket.on("send_message", async (data) => {
            const receiverSockets = onlineUsers.get(data.receiverId);
            const senderSocketId = socket.id;

            // Enviar a todos los sockets del receptor
            if (receiverSockets) {
                receiverSockets.forEach(sid => {
                    io.to(sid).emit("receive_message", data);
                });
            }
            // También emitir al emisor para que reciba el mensaje via socket
            io.to(senderSocketId).emit("receive_message", data);
        });

        socket.on("disconnect", () => {
            const userSockets = onlineUsers.get(userId);
            if (userSockets) {
                userSockets.delete(socket.id);
                if (userSockets.size === 0) {
                    onlineUsers.delete(userId);
                    // Notificar a otros usuarios que este usuario está offline
                    socket.broadcast.emit("user_offline", userId);
                }
            }
        });
    });
};
export { authMiddleware, socketAuthMiddleware, setupSocket };