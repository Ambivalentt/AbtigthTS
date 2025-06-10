"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("./config/server"));
const user_1 = __importDefault(require("./routes/user"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("dotenv/config");
const friendShip_1 = __importDefault(require("./routes/friendShip"));
const message_1 = __importDefault(require("./routes/message"));
const conversation_1 = __importDefault(require("./routes/conversation"));
const http_1 = __importDefault(require("http"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ['https://abrigth.netlify.app/', 'https://abrigth.netlify.app'], // Adjust the origin as needed
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));
const PORT = process.env.PORT || 3000;
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ['https://abrigth.netlify.app', 'https://abrigth.netlify.app/'],
        credentials: true,
    },
});
(0, authMiddleware_1.socketAuthMiddleware)(io); // aplica middleware
(0, authMiddleware_1.setupSocket)(io);
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use('/user', user_1.default);
app.use('/friendship', friendShip_1.default);
app.use('/message', message_1.default);
app.use('/conversation', conversation_1.default);
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
(0, server_1.default)()
    .then(() => {
    console.log('MongoDB connected successfully');
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
});
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
