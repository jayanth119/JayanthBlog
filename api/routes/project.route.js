import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createProject,
  deleteProject,
  editProject,
  getProjects,
} from '../controllers/project.controller.js';

const router = express.Router();

router.post('project/create', verifyToken, createProject);
router.put('/editProject/:projectId', verifyToken, editProject);
router.delete('/deleteProject/:projectId', verifyToken, deleteProject);
router.get('/getProjects', verifyToken, getProjects);
