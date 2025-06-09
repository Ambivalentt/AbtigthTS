import {createFriendShip, friendShipRelation, getRelationShipById, acceptFriendRequest, getAllFriendByUserId } from '../controllers/friendShip';
import express from 'express';
import {authMiddleware} from '../middleware/authMiddleware';
const router = express.Router();


router.post('/request', authMiddleware, createFriendShip);
router.get('/notifyFriendShipReq', authMiddleware, friendShipRelation);
router.get('/relationShip', authMiddleware, getRelationShipById);
router.put('/accept', authMiddleware, acceptFriendRequest);
router.get('/allFriendsByUser', authMiddleware, getAllFriendByUserId);
export default router;