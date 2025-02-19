import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createProject,
  deleteProject,
  editProject,
  getProjects,
} from '../controllers/project.controller.js';

const router = express.Router();

router.post('/project/create', createProject);
router.put('/editProject/:projectId', editProject);
router.delete('/deleteProject/:projectId', deleteProject);
router.get('/getProjects', getProjects);

export default router;
