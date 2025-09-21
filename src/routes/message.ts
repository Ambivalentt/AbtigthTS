import express from 'express';
import { createMessage, getMessages } from '../controllers/messages'
import { authMiddleware } from '../middleware/authMiddleware';
const router = express.Router();


router.post('/send', authMiddleware, createMessage);
router.post('/getMessages', authMiddleware, getMessages);

export default router;