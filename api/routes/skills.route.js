import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createSkill,
  deleteSkills,
  editSkills,
  getSkills,
} from '../controllers/skills.controller.js';

const router = express.Router();

router.post('/skill/create',verifyToken , createSkill);
router.put('/editSkill/:id', verifyToken ,editSkills);
router.delete('/deleteSkill/:id', verifyToken , deleteSkills);
router.get('/getSkills', getSkills);

export default router ;