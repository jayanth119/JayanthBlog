import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createEducation,
  deleteEducation,
  editEducation,
  getEducations,
} from '../controllers/education.controller.js';

const router = express.Router();

router.post('/education/create',verifyToken , createEducation);
router.put('/editEducation/:educationId', verifyToken , editEducation);
router.delete('/deleteEducation/:educationId', verifyToken , deleteEducation);
router.get('/getEducations', getEducations);

export default router;