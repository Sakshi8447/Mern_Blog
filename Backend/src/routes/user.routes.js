import express from 'express';
import {deleteUser, getUser, getUsers, signout, test, updateUser} from '../controllers/user.controllers.js';
import verifyJWT from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyJWT, updateUser);
router.delete('/delete/:userId', verifyJWT, deleteUser);
router.post('/signout', signout);
router.get('/getusers', verifyJWT, getUsers);
router.get('/:userId', getUser);

export default router;