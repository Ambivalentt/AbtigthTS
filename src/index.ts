import express from 'express';
import mongoDB from './config/server';
import userRoutes from './routes/user';
import cors from 'cors';
import cookies from 'cookie-parser';
import 'dotenv/config';

const app = express();
app.use(cors({
    origin: ['https://abrigth.netlify.app', 'https://abrigth.netlify.app/'], // Adjust the origin as needed
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}))

const PORT = process.env.PORT || 3000;
app.use(cookies());
app.use(express.json());


app.use('/user', userRoutes);

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


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})