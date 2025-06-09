import express from 'express';
import {createConversation, getConversations} from '../controllers/conversation';
import {authMiddleware} from '../middleware/authMiddleware';
const router = express.Router();

router.post('/create', authMiddleware, createConversation);
router.get('/getConversations', authMiddleware, getConversations);

export default router;