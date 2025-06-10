import express from 'express';
import mongoDB from './config/server';
import userRoutes from './routes/user';
import cors from 'cors';
import cookies from 'cookie-parser';
import 'dotenv/config';
import friendShip from './routes/friendShip';
import message from './routes/message';
import conversation from './routes/conversation';
import http from 'http';
import { socketAuthMiddleware, setupSocket } from './middleware/authMiddleware';

import { Server } from 'socket.io'

const app = express();

app.use(cors({
    origin: ['https://abrigth.netlify.app/', 'https://abrigth.netlify.app'], // Adjust the origin as needed
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}))

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['https://abrigth.netlify.app', 'https://abrigth.netlify.app/'],
        credentials: true,
    },
});

socketAuthMiddleware(io); // aplica middleware
setupSocket(io);

app.use(cookies());
app.use(express.json());


app.use('/user', userRoutes);
app.use('/friendship', friendShip);
app.use('/message', message);
app.use('/conversation', conversation);

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
})




mongoDB()
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})