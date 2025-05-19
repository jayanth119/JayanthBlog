import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { complete } from '../controllers/complete.contoller.js';

const router = express.Router();

router.post('/complete', verifyToken, complete);


export default router;
