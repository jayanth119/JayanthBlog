import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createEducation,
  deleteEducation,
  editEducation,
  getEducations,
} from '../controllers/education.controller.js';

const router = express.Router();

router.post('/education/create', createEducation);
router.put('/editEducation/:educationId', editEducation);
router.delete('/deleteEducation/:educationId', deleteEducation);
router.get('/getEducations', getEducations);

export default router;