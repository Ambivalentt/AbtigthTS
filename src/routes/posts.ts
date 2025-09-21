import express from 'express';
import { createPost, getAllPosts } from '../controllers/post';
import { authMiddleware } from '../middleware/authMiddleware';
const router = express.Router();

router.post('/create', authMiddleware, createPost);
router.get('/all', authMiddleware, getAllPosts);
console.log("✅ Posts router loaded");

export default router;