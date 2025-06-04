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
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'https://abrigth.netlify.app', // Adjust the origin as needed
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const PORT = process.env.PORT || 3000;
app.use('/user', user_1.default);
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
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
