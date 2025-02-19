import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createSkill,
  deleteSkills,
  editSkills,
  getSkills,
} from '../controllers/skills.controller.js';

const router = express.Router();

router.post('/skill/create',  createSkill);
router.put('/editSkill/:skillId', editSkills);
router.delete('/deleteSkill/:skillId', deleteSkills);
router.get('/getSkills', getSkills);

export default router ;