"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocket = exports.socketAuthMiddleware = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const cookie = __importStar(require("cookie"));
// Middleware para rutas protegidas verificado 
const authMiddleware = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        res.status(401).json({ error: 'No token provided' });
        return;
    }
    try {
        const data = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = data;
        next();
    }
    catch (err) {
        res.status(401).json({ error: 'token expired or invalid' + err });
    }
};
exports.authMiddleware = authMiddleware;
///////////////////////////////////////////////////////
// Middleware para sockets.io
const onlineUsers = new Map();
const socketAuthMiddleware = (io) => {
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
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            socket.userId = decoded._id;
            next();
        }
        catch (err) {
            next(new Error("Invalid token"));
        }
    });
};
exports.socketAuthMiddleware = socketAuthMiddleware;
const setupSocket = (io) => {
    io.on("connection", (socket) => {
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
        onlineUsers.get(userId).add(socket.id);
        // Envía la lista de usuarios online al usuario que se acaba de conectar
        socket.on("get_online_users", () => {
            socket.emit("online_users", Array.from(onlineUsers.keys()));
        });
        socket.emit("online_users", Array.from(onlineUsers.keys()));
        if (onlineUsers.get(userId).size === 1) {
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
exports.setupSocket = setupSocket;
