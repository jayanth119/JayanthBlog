import express from 'express'
import { stt } from '../controllers/stt.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.post('/stt', verifyToken ,stt);

export default router

