import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletepost, getposts, updatepost } from '../controllers/post.controllers.js';
import verifyJWT from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create', verifyJWT, create)
router.get('/getposts', getposts)
router.delete('/deletepost/:postId/:userId', verifyJWT, deletepost)
router.put('/updatepost/:postId/:userId', verifyJWT, updatepost)


export default router;