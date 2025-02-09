import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createExperience,
  deleteExperience,
  editExperience,
  getExperiences,
} from '../controllers/experience.controller.js';

const router = express.Router();

router.post('experience/create', verifyToken, createExperience);
router.put('/editExperience/:experienceId', verifyToken, editExperience);
router.delete('/deleteExperience/:experienceId', verifyToken, deleteExperience);
router.get('/getExperiences', verifyToken, getExperiences);
