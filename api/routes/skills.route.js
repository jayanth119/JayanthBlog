import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createSkill,
  deleteSkill,
  editSkill,
  getSkills,
} from '../controllers/skills.controller.js';

const router = express.Router();

router.post('skill/create', verifyToken, createSkill);
router.put('/editSkill/:skillId', verifyToken, editSkill);
router.delete('/deleteSkill/:skillId', verifyToken, deleteSkill);
router.get('/getSkills', verifyToken, getSkills);
