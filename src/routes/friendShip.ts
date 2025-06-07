import {createFriendShip, friendShipRelation, getRelationShipById, acceptFriendRequest} from '../controllers/friendShip';
import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
const router = express.Router();


router.post('/request', authMiddleware, createFriendShip);
router.get('/notifyFriendShipReq', authMiddleware, friendShipRelation);
router.get('/relationShip', authMiddleware, getRelationShipById);
router.put('/accept', authMiddleware, acceptFriendRequest);
export default router;