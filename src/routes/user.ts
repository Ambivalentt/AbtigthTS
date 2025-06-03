import { createUser, loginUser, userDetails, logOut, getUserByUsername } from '../controllers/user';
import express from 'express';
import multer from 'multer';
import authMiddleware from '../middleware/authMiddleware';
const upload = multer()
const router = express.Router();

router.post('/register', upload.single('avatar_url'), createUser);
router.post('/login', loginUser)
router.get('/profile', authMiddleware, userDetails);
router.get('/logout', logOut);
router.get('/:username', getUserByUsername);
export default router;