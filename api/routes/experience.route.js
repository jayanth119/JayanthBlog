import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createExperience,
  deleteExperience,
  editExperience,
  getExperiences,
} from '../controllers/experience.controller.js';

const router = express.Router();

router.post('/experience/create', createExperience);
router.put('/editExperience/:experienceId', editExperience);
router.delete('/deleteExperience/:experienceId', deleteExperience);
router.get('/getExperiences', getExperiences);

export default router;

