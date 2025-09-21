import {createFriendShip, friendShipRelation, getRelationShipById, acceptFriendRequest, getAllFriendByUserParam, getStatusFriendShipByParams, getFriendsByIdForChatBox } from '../controllers/friendShip';
import express from 'express';
import {authMiddleware} from '../middleware/authMiddleware';
const router = express.Router();


router.post('/request', authMiddleware, createFriendShip);
router.get('/notifyFriendShipReq', authMiddleware, friendShipRelation);
router.get('/relationShip', authMiddleware, getRelationShipById);
router.put('/accept', authMiddleware, acceptFriendRequest);
router.get('/:username', getAllFriendByUserParam);
router.get('/status/:username', authMiddleware, getStatusFriendShipByParams);
router.get('/chatbox/friends', authMiddleware, getFriendsByIdForChatBox);
export default router;