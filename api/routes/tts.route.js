import express from 'express';

import { tts } from '../controllers/tts.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/tts', verifyToken,tts);  

export default router