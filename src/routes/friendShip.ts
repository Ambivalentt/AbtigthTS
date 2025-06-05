import {createFriendShip, friendShipRelation} from '../controllers/friendShip';
import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
const router = express.Router();



router.post('/request', authMiddleware, createFriendShip);
router.get('/relation', authMiddleware, friendShipRelation);

export default router;